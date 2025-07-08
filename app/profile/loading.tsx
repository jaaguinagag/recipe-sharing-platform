import { Skeleton } from "../../components/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">
        <Skeleton className="h-8 w-1/2 mb-6" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-full mb-4" />
        ))}
        <Skeleton className="h-10 w-full mt-6" />
      </div>
    </div>
  );
} 