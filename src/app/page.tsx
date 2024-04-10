import { prisma } from "@/lib/db";

export default async function Home() {
  const data = await prisma.user.findMany();

  return <div>{data && JSON.stringify(data)}</div>;
}
