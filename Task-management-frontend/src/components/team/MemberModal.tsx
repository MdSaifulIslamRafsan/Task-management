import type { FC } from "react";
import { Modal } from "../modal";
import CForm from "../form/CForm";
import CInput from "../form/CInput";
import { Button } from "../ui/button";
import { toast } from "sonner";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import type { TErrorMessage } from "../../Types/errorMessageTypes";
import { useAddTeamMemberMutation } from "../../redux/features/team/teamApi";
import CSelect from "../form/CSelect";

import React from "react";
import type { TTeam } from "../../Types/TeamTypes";
interface TeamModalProps {
  isMemberModalOpen: boolean;
  setIsMemberModalOpen: (v: boolean) => void;
  teams: TTeam[];
}

const MemberModal: FC<TeamModalProps> = ({
  isMemberModalOpen,
  setIsMemberModalOpen,
  teams,
}) => {
  const [addTeamMember] = useAddTeamMemberMutation();
  const handleAddMember: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Team Creating...");
    try {
      const res = await addTeamMember(data).unwrap();
      toast.success(res?.message || `Team member add successfully`, {
        id: toastId,
        duration: 2000,
      });
    } catch (error: unknown) {
      toast.error(`something went wrong ${(error as TErrorMessage).message}`, {
        id: toastId,
        duration: 2000,
      });
    }

    setIsMemberModalOpen(false);
  };
  return (
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
          teamId: "",
          name: "",
          role: "",
          capacity: "",
        }}
      >
        <CInput
          fieldName="name"
          label="Full Name"
          placeholder="Enter full name"
          required
        />

        <CInput
          fieldName="role"
          label="Role"
          placeholder="Enter role"
          required
        />

        <CInput
          fieldName="capacity"
          label="Max Tasks"
          type="number"
          placeholder="Enter Task Capacity"
          required
        />
        <CSelect
          name="teamId"
          label="Team"
          placeholder="Select a team"
          required
          options={teams?.map((t) => ({
            label: t?.teamName,
            value: t?._id,
          }))}
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
  );
};

export default React.memo(MemberModal);
