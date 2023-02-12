import { NextApiRequest, NextApiResponse } from "next";
import { getPocketBase } from "../pocketBase";

export async function getProjects(req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase();
  const records = await pb
    .collection("projects")
    .getFullList(200 /* batch size */, {
      sort: "-created",
      filters: `id=${req.query.pId}`,
    });

  res.status(200).json(records);
}
