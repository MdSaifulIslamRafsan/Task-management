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

export const statsData = {
  memberStats: [
    {
      memberId: "m1",
      name: "Md Saiful Islam",
      teamName: "Frontend",
      role: "Frontend Developer",
      currentTasks: 8,
      capacity: 10,
      isOverloaded: false,
    },
    {
      memberId: "m2",
      name: "Ayesha Rahman",
      teamName: "Frontend",
      role: "UI/UX",
      currentTasks: 10,
      capacity: 10,
      isOverloaded: false,
    },
    {
      memberId: "m3",
      name: "Rashed Khan",
      teamName: "Backend",
      role: "Backend Developer",
      currentTasks: 14,
      capacity: 12,
      isOverloaded: true,
    },
    {
      memberId: "m4",
      name: "Fatima Noor",
      teamName: "QA",
      role: "QA Engineer",
      currentTasks: 3,
      capacity: 8,
      isOverloaded: false,
    },
  ],
};

export default function TeamWorkloadSummary({ initialStats } = {}) {
  const [stats, setStats] = useState(initialStats ?? statsData);
  const [isReassigning, setIsReassigning] = useState(false);
  const [reassignmentResult, setReassignmentResult] = useState(null);

  const handleReassignTasks = () => {
    setIsReassigning(true);
    setTimeout(() => {
      const overloaded = stats.memberStats.filter((m) => m.isOverloaded);
      if (overloaded.length === 0) {
        setReassignmentResult({
          message: "No overloaded members found.",
          reassignments: [],
        });
        setIsReassigning(false);
        return;
      }

      // pick the most overloaded (highest currentTasks - capacity)
      const from = overloaded.reduce((a, b) =>
        a.currentTasks - a.capacity > b.currentTasks - b.capacity ? a : b
      );
      // pick the most available: lowest load percentage and not "from"
      const candidates = stats.memberStats.filter(
        (m) => m.memberId !== from.memberId
      );
      const to = candidates.reduce((a, b) =>
        a.currentTasks / a.capacity < b.currentTasks / b.capacity ? a : b
      );

      if (!to) {
        setReassignmentResult({
          message: "No candidate to receive tasks.",
          reassignments: [],
        });
        setIsReassigning(false);
        return;
      }

      const updated = stats.memberStats.map((m) => {
        if (m.memberId === from.memberId)
          return { ...m, currentTasks: Math.max(m.currentTasks - 1, 0) };
        if (m.memberId === to.memberId)
          return { ...m, currentTasks: m.currentTasks + 1 };
        return m;
      });

      // recompute isOverloaded flags
      const normalized = updated.map((m) => ({
        ...m,
        isOverloaded: m.currentTasks > m.capacity,
      }));

      setStats({ memberStats: normalized });
      setReassignmentResult({
        message: `Moved 1 task from ${from.name} to ${to.name}`,
        reassignments: [
          { taskTitle: "Auto-reassigned task", from: from.name, to: to.name },
        ],
      });

      setIsReassigning(false);
    }, 600);
  };

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
              {reassignmentResult.message}
            </p>
            {reassignmentResult.reassignments.length > 0 && (
              <ul className="mt-2 text-sm text-green-700">
                {reassignmentResult.reassignments.map((r, idx) => (
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
              {stats.memberStats.map((member) => {
                const pct = Math.min(
                  (member.currentTasks / member.capacity) * 100,
                  100
                );
                return (
                  <TableRow key={member.memberId}>
                    <TableCell>
                      <div className="text-sm font-medium">{member.name}</div>
                    </TableCell>
                    <TableCell className="text-sm">{member.teamName}</TableCell>
                    <TableCell className="text-sm">{member.role}</TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        {member.currentTasks} / {member.capacity}
                      </div>
                      <div className="mt-2">
                        <Progress
                          value={Math.round(pct)}
                          className="h-2 rounded-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {member.isOverloaded ? (
                        <Badge variant="destructive">Overloaded</Badge>
                      ) : member.currentTasks === member.capacity ? (
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
