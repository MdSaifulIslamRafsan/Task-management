import { useState } from "react";
import {
  members as rawMembers,
  teams as rawTeams,
  tasks as rawTasks,
} from "../lib/rawData";

export const useTeamState = () => {
  const [members, setMembers] = useState(rawMembers);
  const [teams, setTeams] = useState(rawTeams);
  const [tasks, setTasks] = useState(rawTasks);

  const addTeam = (data: { name: string; members?: string[] }) => {
    setTeams([...teams, { id: crypto.randomUUID(), members: [], ...data }]);
  };

  const addMember = (data: {
    name: string;
    role: string;
    capacity: number;
    avatar?: string;
  }) => {
    setMembers([...members, { id: crypto.randomUUID(), ...data }]);
  };

  return { members, teams, tasks, addTeam, addMember };
};

// Helper function to calculate load
export const getMemberLoad = (memberId: string, tasks: any[]) => {
  return tasks.filter((t) => t.assignedTo === memberId).length;
};
