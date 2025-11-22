export type TTeam = {
  _id: string;
  teamName: string;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
};

export type TMember = {
  _id: string;
  name: string;
  role: string;
  capacity: number;
  currentLoad: number;
  teamId: TTeam;
  createdAt: string;
  updatedAt: string;
};

export type TReassignmentResult = {
  message: string;
  reassignments: {
    taskTitle: string;
    from: string;
    to: string;
  }[];
};