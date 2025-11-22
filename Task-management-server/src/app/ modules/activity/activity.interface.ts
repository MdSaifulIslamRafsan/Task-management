export interface TActivityLog {
  type: "reassignment" | "warning" | "completion" | "creation";
  message: string;
  timestamp: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}
