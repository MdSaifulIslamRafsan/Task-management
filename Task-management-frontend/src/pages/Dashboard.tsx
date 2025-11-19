import MemberCapacity from "../components/dashboard/MemberCapacity";
import MetricsGrid from "../components/dashboard/MetricsGrid";
import RecentActivity from "../components/dashboard/RecentActivity";
import { activityLog, members, projects, tasks } from "../lib/rawData";

const Dashboard = () => {
  const totalTasks = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const progress = tasks.filter((t) => t.status === "In Progress").length;

  const completionRate = totalTasks
    ? Math.round((completed / totalTasks) * 100)
    : 0;

  // Overloaded members
  const overloaded = members.filter((m) => {
    const load = tasks.filter((t) => t.assignedTo === m.id).length;
    return load > m.capacity;
  });

  
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Overview of team performance.</p>
      </div>

      <MetricsGrid
        totalTasks={totalTasks}
        completedTasks={completed}
        inProgressTasks={progress}
        completionRate={completionRate}
        projectsCount={projects.length}
        membersCount={members.length}
        overloadedCount={overloaded.length}
      />

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-7">
        <MemberCapacity />
        <RecentActivity activity={activityLog} />
      </div>
    </div>
  );
};

export default Dashboard;
