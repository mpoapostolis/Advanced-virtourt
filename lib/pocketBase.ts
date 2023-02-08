import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090");

export async function getPocketBase() {
  if (pb.authStore.isValid) return pb;
  else {
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EMAIL ?? "",
      process.env.PB_ADMIN_PASSWORD ?? ""
    );
    // console.log({
    //   usr: process.env.PB_ADMIN_EMAIL,
    //   psw: process.env.PB_ADMIN_PASSWORD,
    // });
    return pb;
  }
}
