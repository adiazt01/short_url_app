"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = parseInt(searchParams.get('page') || '1');

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
      <button 
      className={clsx("flex font-medium text-neutral-500 hover:text-neutral-700 hover:border-primary border-2 rounded shadow-sm items-center px-3 py-1.5 transition ease-in-out", { 'bg-primary text-neutral-100 hover:text-neutral-100 border-transparent hover:bg-violet-400 hover:border-transparent': currentPage === i + 1 })} 
      key={i} 
      disabled={currentPage === i + 1}
      onClick={() => handlePageChange(i + 1)}
    >
      {i + 1}
    </button>
      ))}
    </nav>
  );
}
