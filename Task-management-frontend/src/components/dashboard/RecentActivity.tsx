import { useGetActivityQuery } from "../../redux/features/activity/activityApi";
import type { TLogEntry } from "../../Types/ActivityTypes";
import RecentActivitySkeleton from "../Skeleton/dashboard/RecentActivitySkeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

const RecentActivity = () => {
  const { data, isLoading } = useGetActivityQuery(undefined);
  if (isLoading) {
    return <RecentActivitySkeleton></RecentActivitySkeleton>;
  }
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest automated actions and updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {data?.data?.map((log: TLogEntry) => (
            <div key={log?._id} className="flex gap-3">
              <div
                className={`h-2 w-2 rounded-full mt-2 ${
                  log?.type === "warning"
                    ? "bg-yellow-500"
                    : log?.type === "reassignment"
                    ? "bg-blue-500"
                    : "bg-gray-500"
                }`}
              />
              <div>
                <p className="text-sm font-medium">{log?.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(log?.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {data?.data?.length === 0 && (
            <p className="text-sm text-gray-500">No activity yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
