import { Button } from "../ui/button";
import { Modal } from "../modal";
import CForm from "../form/CForm";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CInput from "../form/CInput";
import CTextarea from "../form/CTextarea";
import CSelect from "../form/CSelect";

const ProjectModal = ({ open, onClose, teams }) => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("logging in...");
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
          fieldName="projectName"
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
          options={teams.map((t) => ({
            label: t.name,
            value: t.id,
          }))}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </div>
      </CForm>
    </Modal>
  );
};

export default ProjectModal;
