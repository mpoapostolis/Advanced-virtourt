import { NextApiRequest, NextApiResponse } from "next";
import { getPocketBase } from "../pocketBase";
import { ItemType } from "./types";

export async function getItems(req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase();
  const records = await pb
    .collection("items")
    .getFullList<ItemType>(200 /* batch size */, {
      sort: "-created",
      filter: `scene_id='${req.query.sId}'`,
      expand: "image,painter",
    });

  const data = records.map((record) => {
    return {
      ...record,
      src: `${process.env.PB_URL}/api/files/${record.expand.image?.collectionId}/${record.expand.image?.id}/${record.expand.image?.image}`,
      sound: `${process.env.PB_URL}/api/files/${record.collectionId}/${record?.id}/${record.sound}`,
      popup_image:
        record.popup_image &&
        `${process.env.PB_URL}/api/files/${record.collectionId}/${record?.id}/${record.popup_image}`,
    };
  });

  res.status(200).json(data);
}

export async function getItemByid(req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase();
  const record = await pb
    .collection("items")
    .getOne<ItemType>(req.query.id as string, {
      expand: "image,painter",
    });
  const src = `${process.env.PB_URL}/api/files/${record.expand.image?.collectionId}/${record.expand.image?.id}/${record.expand.image?.image}`;

  res.status(200).json({
    ...record,
    src,

    popup_image:
      record.popup_image &&
      `${process.env.PB_URL}/api/files/${record.collectionId}/${record?.id}/${record.popup_image}`,
  });
}

export async function updateItem(req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase();
  const records = await pb.collection("items").update(req.query.id as string, {
    ...req.body,
    updated: new Date(),
  });

  res.status(200).json(records);
}
