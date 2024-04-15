import { Skeleton } from "@/components/ui/skeleton"


export default function CardContainerSkeleton() {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-hidden">
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index}>
          <Skeleton className="min-h-24" />
        </li>
      ))}
    </ul>
  );
}
