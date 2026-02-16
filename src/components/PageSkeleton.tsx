import { Skeleton } from "@/components/ui/skeleton";

function PageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Page title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Grid de cards skeleton — espelha o grid real de 2/3/4/5 cols */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[2/3] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageSkeleton;
