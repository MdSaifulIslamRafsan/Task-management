// PROJECT MEMBERS (TEAM)
export const members = [
  { id: "m1", name: "Riya", role: "Designer", capacity: 3 },
  { id: "m2", name: "Farhan", role: "Developer", capacity: 4 },
  { id: "m3", name: "Jahid", role: "QA Engineer", capacity: 2 },
  { id: "m4", name: "Sara", role: "Project Manager", capacity: 5 },
];

// PROJECT LIST
export const projects = [
  { id: "p1", name: "Smart Dashboard", teamId: "t1" },
  { id: "p2", name: "Website Revamp", teamId: "t1" },
  { id: "p3", name: "Mobile App UI", teamId: "t1" },
];

// TASK LIST
export const tasks = [
  {
    id: "t1",
    title: "UI Design",
    description: "Create dashboard mockups",
    projectId: "p1",
    assignedTo: "m1",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "t2",
    title: "API Integration",
    description: "Connect dashboard with API",
    projectId: "p1",
    assignedTo: "m2",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: "t3",
    title: "Fix Login Bug",
    description: "Resolve redirect issue",
    projectId: "p2",
    assignedTo: "m2",
    priority: "Low",
    status: "Completed",
  },
  {
    id: "t4",
    title: "Testing Dashboard",
    description: "Functional test + load test",
    projectId: "p1",
    assignedTo: "m3",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: "t5",
    title: "Wireframe Update",
    description: "Fix spacing + colors",
    projectId: "p3",
    assignedTo: "m1",
    priority: "Low",
    status: "In Progress",
  },
];

// ACTIVITY LOG
export const activityLog = [
  {
    id: "a1",
    message: "Task 'UI Design' reassigned from Riya to Farhan.",
    type: "reassignment",
    timestamp: Date.now() - 600000,
  },
  {
    id: "a2",
    message: "Task 'Fix Login Bug' marked as Completed.",
    type: "completion",
    timestamp: Date.now() - 400000,
  },
  {
    id: "a3",
    message: "Riya is overloaded (4/3 capacity).",
    type: "warning",
    timestamp: Date.now() - 200000,
  },
];

export const teams = [
  { id: "t1", name: "Frontend Team", members: ["m1", "m2"] },
  { id: "t2", name: "Backend Team", members: ["m3"] },
];
