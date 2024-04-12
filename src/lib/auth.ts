import { auth } from "../../auth";

export async function getUserId(): Promise<number | null> {
  const user = await auth();

  if (!user?.user?.sub) {
    return null;
  }

  return parseInt(user?.user?.sub);
}
