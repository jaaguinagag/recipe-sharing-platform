import { Skeleton } from "../../../components/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 py-10 px-4">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg">
        <Skeleton className="h-8 w-2/3 mb-6" />
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-4 w-1/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
} 