import MemberCapacity from "../components/dashboard/MemberCapacity";
import MetricsGrid from "../components/dashboard/MetricsGrid";
import RecentActivity from "../components/dashboard/RecentActivity";

const Dashboard = () => {
  return (
    <div className="py-6 lg:p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Overview of team performance.</p>
      </div>

      <MetricsGrid />

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <MemberCapacity />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
