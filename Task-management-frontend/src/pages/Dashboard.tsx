import MemberCapacity from "../components/dashboard/MemberCapacity";
import MetricsGrid from "../components/dashboard/MetricsGrid";
import RecentActivity from "../components/dashboard/RecentActivity";
import { activityLog } from "../lib/rawData";

const Dashboard = () => {
  // Overloaded members
  // const overloaded = members.filter((m) => {
  //   const load = tasks.filter((t) => t.assignedTo === m.id).length;
  //   return load > m.capacity;
  // });

  return (
    <div className="py-6 lg:p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Overview of team performance.</p>
      </div>

      <MetricsGrid />

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <MemberCapacity />
        <RecentActivity activity={activityLog} />
      </div>
    </div>
  );
};

export default Dashboard;
