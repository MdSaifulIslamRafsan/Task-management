import type { FieldValues, SubmitHandler } from "react-hook-form";
import CForm from "../form/CForm";
import CInput from "../form/CInput";
import { Modal } from "../modal";
import { Button } from "../ui/button";
import { toast } from "sonner";
import type { TErrorMessage } from "../../Types/errorMessageTypes";
import { useCreateTeamMutation } from "../../redux/features/team/teamApi";
import type { FC } from "react";
import React from "react";
interface TeamModalProps {
  isTeamModalOpen: boolean;
  setIsTeamModalOpen: (v: boolean) => void;
}

const TeamModal: FC<TeamModalProps> = ({
  isTeamModalOpen,
  setIsTeamModalOpen,
}) => {
  const [CreateTeam] = useCreateTeamMutation();
  const handleAddTeam: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Team Creating...");
    try {
      const res = await CreateTeam(data).unwrap();
      toast.success(res?.message || `Team create successfully`, {
        id: toastId,
        duration: 2000,
      });
    } catch (error: unknown) {
      toast.error(`something went wrong ${(error as TErrorMessage).message}`, {
        id: toastId,
        duration: 2000,
      });
    }

    setIsTeamModalOpen(false);
  };


  return (
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
  );
};

export default React.memo(TeamModal);
