import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";


import { Plus, Users, UserPlus } from "lucide-react";
import { Modal } from "../components/modal";
import { useTeamState } from "../hooks/useTeamState";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import CForm from "../components/form/CForm";
import CInput from "../components/form/CInput";

const TeamsPage = () => {
  const { teams, addTeam, addMember } = useTeamState();

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);



  const handleAddTeam: SubmitHandler<FieldValues> = (data) => {
    addTeam({ name: data.teamName });
    setIsTeamModalOpen(false);
  };

  const handleAddMember: SubmitHandler<FieldValues> = (data) => {
    addMember({
      name: data.memberName,
      role: data.memberRole,
      capacity: Number(data.memberCapacity),
    });

    setIsMemberModalOpen(false);
  };

  return (
    <main className="p-6 space-y-8">
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
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader className="text-center space-y-2">
              <Users className="h-10 w-10 mx-auto text-gray-500" />
              <CardTitle className="">{team.name}</CardTitle>
              <CardDescription>{team.members.length} Members</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Team Modal */}
      <Modal
        open={isTeamModalOpen}
        onOpenChange={(v: boolean) => {
          if (!v) setIsTeamModalOpen(false);
        }}
        title="Create Team"
      >
        <CForm
          styles="space-y-4"
          onSubmit={handleAddTeam}
          defaultValues={{ teamName: "" }}
        >
          <CInput
            fieldName="teamName"
            label="Team Name"
            placeholder="Enter team name"
            type="text"
            required
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsTeamModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </CForm>
      </Modal>

      {/* Member Modal */}
      <Modal
        open={isMemberModalOpen}
        onOpenChange={(v: boolean) => {
          if (!v) setIsMemberModalOpen(false);
        }}
        title="Add Member"
      >
        <CForm
          styles="space-y-4"
          onSubmit={handleAddMember}
          defaultValues={{
            memberName: "",
            memberRole: "",
            memberCapacity: "",
          }}
        >
          <CInput
            fieldName="memberName"
            label="Full Name"
            placeholder="Enter full name"
            required
          />

          <CInput
            fieldName="memberRole"
            label="Role"
            placeholder="Enter role"
            required
          />

          <CInput
            fieldName="memberCapacity"
            label="Max Tasks"
            type="number"
            placeholder="Enter Task Capacity"
            required
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsMemberModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </CForm>
      </Modal>
    </main>
  );
};
export default TeamsPage;
