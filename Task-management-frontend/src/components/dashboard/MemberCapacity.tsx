import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useAutoReassignTasksMutation } from "../../redux/features/reassignment/reassignmentApi";
import { toast } from "sonner";
import type { TErrorMessage } from "../../Types/errorMessageTypes";
import { useGetMembersQuery } from "../../redux/features/team/teamApi";
import type { TMember, TReassignmentResult } from "../../Types/TeamTypes";
import MemberCapacitySkeleton from "../Skeleton/dashboard/MemberCapacitySkeleton";

export default function TeamWorkloadSummary() {
  const { data, isLoading } = useGetMembersQuery(undefined);

  const [reassignmentResult, setReassignmentResult] =
    useState<TReassignmentResult | null>(null);

  const [autoReassignTasks, { isLoading: isReassigning }] =
    useAutoReassignTasksMutation();

  const handleReassignTasks = async () => {
    const toastId = toast.loading("Reassigning tasks...");
    try {
      const res = await autoReassignTasks(undefined).unwrap();
      toast.success(res?.message || `Tasks reassigned successfully`, {
        id: toastId,
        duration: 2000,
      });
      setReassignmentResult(res?.data || null);
    } catch (error) {
      toast.error(`something went wrong ${(error as TErrorMessage).message}`, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isLoading) {
    return <MemberCapacitySkeleton />;
  }

  return (
    <Card className="lg:col-span-4">
      <CardHeader className="flex flex-col gap-5 md:flex-row items-center justify-between">
        <CardTitle>Team Workload Summary</CardTitle>
        <Button onClick={handleReassignTasks} disabled={isReassigning}>
          <Plus className="mr-2 h-4 w-4" />
          {isReassigning ? "Reassigning..." : "Reassign Tasks"}
        </Button>
      </CardHeader>
      <CardContent>
        {reassignmentResult && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 font-medium">
              {reassignmentResult?.message}
            </p>
            {reassignmentResult?.reassignments.length > 0 && (
              <ul className="mt-2 text-sm text-green-700">
                {reassignmentResult?.reassignments?.map((r, idx) => (
                  <li key={idx}>
                    "{r.taskTitle}" moved from {r.from} to {r.to}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((member: TMember) => {
                const pct = Math.min(
                  (member?.currentLoad / member?.capacity) * 100,
                  100
                );
                return (
                  <TableRow key={member?._id}>
                    <TableCell>
                      <div className="text-sm font-medium">{member?.name}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {member?.teamId?.teamName}
                    </TableCell>
                    <TableCell className="text-sm">{member?.role}</TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        {member?.currentLoad} / {member?.capacity}
                      </div>
                      <div className="mt-2">
                        <Progress
                          value={Math.round(pct)}
                          className="h-2 rounded-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {member?.currentLoad > member?.capacity ? (
                        <Badge variant="destructive">Overloaded</Badge>
                      ) : member?.currentLoad === member?.capacity ? (
                        <Badge variant="secondary">At Capacity</Badge>
                      ) : (
                        <Badge variant="outline">Available</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
