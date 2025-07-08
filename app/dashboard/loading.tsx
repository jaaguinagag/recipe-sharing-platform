import { Skeleton } from "../../components/skeleton";

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="mb-8">
        <Skeleton className="h-10 w-1/2 mb-4" />
        <Skeleton className="h-8 w-1/3 mb-6" />
      </div>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-12 w-full mb-4" />
      ))}
    </div>
  );
} 