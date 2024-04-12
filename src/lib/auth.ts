import { auth } from "../../auth";

export async function getUserId(): Promise<number> {
  const user = await auth();

  if (!user?.user?.sub) {
    throw new Error("User not found");
  }

  return parseInt(user?.user?.sub);
}
