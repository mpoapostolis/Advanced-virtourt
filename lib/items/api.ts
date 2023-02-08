import { NextApiRequest, NextApiResponse } from "next";

export async function getItems(req: NextApiRequest, res: NextApiResponse) {
  // await pb.admins.authWithPassword(
  //   process.env.PB_ADMIN_EMAIL ?? "",
  //   process.env.PB_ADMIN_PASSWORD ?? ""
  // );

  // const records = await pb
  //   .collection("items")
  //   .getFullList(200 /* batch size */, {
  //     sort: "-created",
  //   });
  // res.statusCode = 200;
  res.json([]);
}
