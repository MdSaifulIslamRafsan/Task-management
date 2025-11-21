import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

import { Plus, Users, UserPlus } from "lucide-react";

import TeamModal from "../components/team/TeamModal";
import MemberModal from "../components/team/MemberModal";
import { useGetTeamsQuery } from "../redux/features/team/teamApi";
import type { TTeam } from "../Types/TeamTypes";

const TeamsPage = () => {
  const { data } = useGetTeamsQuery(undefined);

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  return (
    <main className="py-6 lg:p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Teams & Members</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsMemberModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Add Member
          </Button>
          <Button onClick={() => setIsTeamModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Team
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data?.data?.map((team: TTeam) => (
          <Card key={team?._id}>
            <CardHeader className="text-center space-y-2">
              <Users className="h-10 w-10 mx-auto text-gray-500" />
              <CardTitle className="">{team?.teamName}</CardTitle>
              <CardDescription>{team?.memberCount} Members</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <TeamModal
        isTeamModalOpen={isTeamModalOpen}
        setIsTeamModalOpen={setIsTeamModalOpen}
      ></TeamModal>

      <MemberModal
        isMemberModalOpen={isMemberModalOpen}
        setIsMemberModalOpen={setIsMemberModalOpen}
        teams={data?.data}
      ></MemberModal>
    </main>
  );
};
export default TeamsPage;
