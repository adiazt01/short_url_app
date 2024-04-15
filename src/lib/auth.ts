import { auth } from "../../auth";

export async function getUserId(): Promise<number | null> {
  const user = await auth();

  // @ts-ignore
  if (!user?.user?.sub) {
    return null;
  }

  // @ts-ignore
  return parseInt(user?.user?.sub);
}
