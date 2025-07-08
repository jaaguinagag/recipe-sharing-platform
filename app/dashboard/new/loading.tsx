import { Skeleton } from "../../../components/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 py-10 px-4">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg">
        <Skeleton className="h-8 w-2/3 mb-6" />
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-full mb-4" />
        ))}
        <Skeleton className="h-10 w-full mt-6" />
      </div>
    </div>
  );
} 