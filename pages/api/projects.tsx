import { getProjects } from "@/lib/projects/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return getProjects(req, res);
}
