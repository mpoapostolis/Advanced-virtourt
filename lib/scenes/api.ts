import { NextApiRequest, NextApiResponse } from "next";
import { getPocketBase } from "../pocketBase";

export async function getScenes(req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase();
  const records = await pb.collection("scenes").getFullList(200, {
    filter: `project_id = '${req.query.pId}'`,
  });

  const data = records.map((record) => {
    return {
      ...record,
      src: `${process.env.PB_URL}/api/files/${record.collectionId}/${record.id}/${record.image}`,
    };
  });
  res.status(200).json(data);
}
