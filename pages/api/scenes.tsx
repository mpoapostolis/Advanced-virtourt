import { getScenes } from "@/lib/scenes/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return getScenes(req, res);
}
