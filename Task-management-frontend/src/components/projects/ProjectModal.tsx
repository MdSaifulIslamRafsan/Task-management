import { Button } from "../ui/button";
import { Modal } from "../modal";
import CForm from "../form/CForm";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CInput from "../form/CInput";
import CTextarea from "../form/CTextarea";
import CSelect from "../form/CSelect";

import type { TErrorMessage } from "../../Types/errorMessageTypes";

import type { FC } from "react";
import { useGetTeamsQuery } from "../../redux/features/team/teamApi";
import type { TTeam } from "../../Types/TeamTypes";
import { useCreateProjectMutation } from "../../redux/features/Projects/projectApi";

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const ProjectModal: FC<ProjectModalProps> = ({ open, onClose }) => {
  const [createProject] = useCreateProjectMutation();
  const { data } = useGetTeamsQuery(undefined);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("logging in...");

    try {
      const res = await createProject(data).unwrap();
      toast.success(res?.message || `Project create successfully`, {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error(`something went wrong ${(error as TErrorMessage).message}`, {
        id: toastId,
        duration: 2000,
      });
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onOpenChange={(v: boolean) => {
        if (!v) onClose();
      }}
      title="Create Project"
    >
      <CForm
        styles="space-y-4"
        onSubmit={onSubmit}
        defaultValues={{ projectName: "", teamId: "", description: "" }}
        // resolver={loginSchema}
      >
        <CInput
          fieldName="name"
          label="Project Name"
          placeholder="Enter Project Name"
          type="text"
          required
        ></CInput>
        <CTextarea
          fieldName="description"
          label="Description"
          placeholder="Enter your Description"
          required
        ></CTextarea>
        <CSelect
          name="teamId"
          label="Assign Team"
          placeholder="Select a team"
          required
          options={data?.data?.map((t: TTeam) => ({
            label: t?.teamName,
            value: t?._id,
          }))}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="">
            Create
          </Button>
        </div>
      </CForm>
    </Modal>
  );
};

export default ProjectModal;
