
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

interface LogEntry {
  id: string;
  type: string;
  message: string;
  timestamp: number;
}

const RecentActivity = ({ activity }: { activity: LogEntry[] }) => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest automated actions and updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activity.slice(0, 5).map((log) => (
            <div key={log.id} className="flex gap-3">
              <div
                className={`h-2 w-2 rounded-full mt-2 ${
                  log.type === "warning"
                    ? "bg-yellow-500"
                    : log.type === "reassignment"
                    ? "bg-blue-500"
                    : "bg-gray-500"
                }`}
              />
              <div>
                <p className="text-sm font-medium">{log.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {activity.length === 0 && (
            <p className="text-sm text-gray-500">No activity yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
