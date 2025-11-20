import { CheckCircle2, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  completionRate: number;
  projectsCount: number;
  membersCount: number;
  overloadedCount: number;
}

const MetricsGrid = ({ totalTasks, completionRate, projectsCount }: Props) => {
  const metrics = [
    {
      title: "Total Projects",
      icon: <Clock className="h-10 w-10 mx-auto text-primary" />,
      value: projectsCount,
    },
    {
      title: "Total Tasks",
      icon: <CheckCircle2 className="h-10 w-10 mx-auto text-primary" />,
      value: totalTasks,
    },
    {
      title: "Total Teams",
      icon: <Users className="h-10 w-10 mx-auto text-primary" />,
      value: `${completionRate}%`,
    },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((m, i) => (
        <Card
          key={i}
          className="group text-center gap-2 transition-all border border-gray-200 hover:shadow-md hover:border-gray-300"
        >
          <CardHeader className="space-y-2">
            <div className={`group-hover:scale-105 transition`}>{m?.icon}</div>
            <CardTitle className=" font-medium text-gray-600">
              {m?.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">
              {m?.value}
            </div>
            {/* <p className="text-xs text-gray-500 mt-1">{m?.subtitle}</p> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGrid;
