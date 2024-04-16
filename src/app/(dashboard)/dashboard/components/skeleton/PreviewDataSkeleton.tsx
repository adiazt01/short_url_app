import { Skeleton } from "@/components/ui/skeleton";

export default function PreviewDataSkeleton() {
  return (
    <>
      <Skeleton className="min-h-28" />
      <Skeleton className="min-h-24" />
    </>
  );
}
