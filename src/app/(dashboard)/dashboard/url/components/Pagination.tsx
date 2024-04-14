"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <nav className="flex flex-row flex-wrap gap-4 w-full justify-center ">
      {Array.from({ length: totalPages }, (_, i) => (
        <button className="flex items-center border px-3 py-1.5" key={i} onClick={() => handlePageChange(i + 1)}>
          {i + 1}
        </button>
      ))}
    </nav>
  );
}
