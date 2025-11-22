import { Skeleton } from "../ui/skeleton";

const TaskSkeleton = () => {
  return (
    <table className="w-full divide-y divide-border">
      <thead>
        <tr>
          {Array.from({ length: 6 }).map((_, i) => (
            <th
              key={i}
              className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              <Skeleton className="h-4 w-20 rounded-md" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }).map((_, i) => (
          <tr key={i}>
            {Array.from({ length: 6 }).map((_, j) => (
              <td key={j} className="px-6 py-4">
                <Skeleton className="h-4 w-full rounded-md" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskSkeleton;
