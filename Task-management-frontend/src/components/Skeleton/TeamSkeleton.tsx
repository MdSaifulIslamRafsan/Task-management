import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const TeamSkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="text-center space-y-2">
            <Skeleton className="h-10 w-10 mx-auto rounded-full" />
            <Skeleton className="h-5 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default TeamSkeleton;
