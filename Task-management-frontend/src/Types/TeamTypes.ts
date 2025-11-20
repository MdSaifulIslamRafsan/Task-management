export interface TTeam {
  _id: string;
  teamName: string;
  memberCount: number;
}

export interface TMember {
  capacity: number;
  _id: string;
  name: string;
}
