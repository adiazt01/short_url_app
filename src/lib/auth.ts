import { auth } from "../../auth";

export async function getUserId(): Promise<number> {
  const user = await auth();
console.log(user);
  if (!user?.user?.sub) {
    throw new Error("User not found");
  }

  return parseInt(user?.user?.sub);
}
