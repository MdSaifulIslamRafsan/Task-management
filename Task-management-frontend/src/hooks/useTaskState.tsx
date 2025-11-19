import { useState } from "react";
import {
  projects as rawProjects,
  tasks as rawTasks,
  members as rawMembers,
  activityLog as rawActivity,
} from "../lib/rawData";

export const useTaskState = () => {
  const [projects, setProjects] = useState(rawProjects);
  const [tasks, setTasks] = useState(rawTasks);
  const [members, setMembers] = useState(rawMembers);
  const [activityLog, setActivityLog] = useState(rawActivity);

  const addProject = (data: {
    name: string;
    description?: string;
    teamId: string;
  }) => {
    const newProject = { id: crypto.randomUUID(), ...data };
    setProjects([...projects, newProject]);
  };

  const addTask = (data: any) => {
    const newTask = { id: crypto.randomUUID(), ...data };
    setTasks([...tasks, newTask]);
  };

  return { projects, tasks, members, activityLog, addProject, addTask };
};
