import { NextApiRequest, NextApiResponse } from "next";
import { getPocketBase } from "../pocketBase";

export async function getItems(req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase();
  const records = await pb
    .collection("items")
    .getFullList(200 /* batch size */, {
      sort: "-created",
    });

  res.status(200).json(records);
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
