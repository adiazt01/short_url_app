"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadcrumbDashboard() {
  const pathname = usePathname();

  const path = pathname.split("/").slice(1);

  console.log(path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.length > 1 &&
          path.map((item, index) => {
            if (index === path.length - 1) {
              return (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              );
            }
            return (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink href={`/${item}`}>{item}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
