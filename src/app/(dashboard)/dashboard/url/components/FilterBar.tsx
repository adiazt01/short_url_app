import { Suspense } from "react";
import { FilterSelect } from "./FilterSelect";

export function FilterBar() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <FilterSelect />
        </Suspense>
      </div>
    </div>
  );
}
