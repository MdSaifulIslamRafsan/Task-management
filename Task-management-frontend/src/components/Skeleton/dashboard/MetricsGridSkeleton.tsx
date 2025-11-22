import { Card, CardContent, CardHeader } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

const MetricsGridSkeleton = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="text-center gap-2 border border-gray-200">
          <CardHeader className="space-y-4">
            <Skeleton className="h-10 w-10 mx-auto rounded-md" />
            <Skeleton className="h-5 w-32 mx-auto" />
          </CardHeader>

          <CardContent className="space-y-3">
            <Skeleton className="h-8 w-20 mx-auto" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGridSkeleton;
