import { NextApiRequest, NextApiResponse } from "next";
import { getPocketBase } from "../pocketBase";

export async function getItems(req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase();
  const records = await pb
    .collection("items")
    .getFullList(200 /* batch size */, {
      sort: "-created",
      filter: `scene_id='${req.query.sId}'`,
    });

  const data = records.map((record) => {
    return {
      ...record,
      src: `${process.env.PB_URL}/api/files/${record.collectionId}/${record.id}/${record.image}`,
    };
  });

  res.status(200).json(data);
}

export async function getItemByid(req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase();
  const records = await pb.collection("items").getOne(req.query.id as string);

  res.status(200).json(records);
}

export async function updateItem(req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase();
  const records = await pb.collection("items").update(req.query.id as string, {
    ...req.body,
    updated: new Date(),
  });

  res.status(200).json(records);
}
