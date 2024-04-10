import prisma from "@/lib/db";
import { auth } from "../../../../auth";


export default async function DashboardPage() {
  const session = await auth()

  const data = await prisma.url.findMany({
    where: {
      userId: parseInt(session.user.sub)
    }
  })

  

  return (
    <div>
      <ul>
       {
         session && JSON.stringify(session.user.sub)
       }
       {
         data && JSON.stringify(data)
       }
      </ul>
    </div>
  );
}