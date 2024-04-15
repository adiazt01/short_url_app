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
import { Fragment } from "react";

export default function BreadcrumbDashboard() {
  const pathname = usePathname();

  const path = pathname.split("/").slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
      {path.length > 1 &&
  path.map((item, index) => {
    const url = `/${path.slice(0, index + 1).join("/")}`;

    if (index === path.length - 1) {
      return (
        <BreadcrumbItem key={index}>
          <BreadcrumbPage>{item}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    }
    return (
      <Fragment key={index}>
        <BreadcrumbItem>
          <BreadcrumbLink href={url}>{item}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </Fragment>
    );
  })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}