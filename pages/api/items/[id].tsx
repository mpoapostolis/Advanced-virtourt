// nextjs api route
import { getItemByid, updateItem } from "@/lib/items/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getItemByid(req, res);
    case "PUT":
      return updateItem(req, res);
    default:
      break;
  }
}
