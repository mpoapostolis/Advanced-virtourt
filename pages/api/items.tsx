// nextjs api route
import { getItems } from "@/lib/items/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  getItems(req, res);
}
