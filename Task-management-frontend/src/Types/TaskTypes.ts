export type TTask = {
  _id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Done";
  createdAt: string;
  updatedAt: string;

  project: {
    _id: string;
    name: string;
  };

  assigneeMember: {
    _id: string;
    name: string;
  };
};
