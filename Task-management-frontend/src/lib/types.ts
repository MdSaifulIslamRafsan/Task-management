export type Priority = "Low" | "Medium" | "High";
export type Status = "To Do" | "In Progress" | "Completed";

export interface Member {
  id: string;
  name: string;
  role: string;
  capacity: number; // Max tasks they can handle
  avatar?: string;
}

export type TeamMember = Member;

export interface Team {
  id: string;
  name: string;
  members: string[]; // Member IDs
}

export interface Project {
  id: string;
  name: string;
  teamId: string;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string; // Member ID
  priority: Priority;
  status: Status;
  dueDate?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  message: string;
  type: "assignment" | "reassignment" | "completion" | "creation" | "warning";
}

export interface AppState {
  members: Member[];
  teams: Team[];
  projects: Project[];
  tasks: Task[];
  activityLog: ActivityLog[];
}
