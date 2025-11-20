import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { Modal } from "../modal";
import { Button } from "../ui/button";
import CForm from "../form/CForm";
import CInput from "../form/CInput";
import CSelect from "../form/CSelect";
import { toast } from "sonner";
import CTextarea from "../form/CTextarea";
import type { TProject } from "../../Types/ProjectTypes";
import { useGetProjectsQuery } from "../../redux/features/Projects/projectApi";
import { useState } from "react";
import { useGetTeamsByProjectIdQuery } from "../../redux/features/team/teamApi";
import type { TMember } from "../../Types/TeamTypes";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskModal({ isOpen, onClose }: TaskModalProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  console.log(selectedProjectId);
  const { data: project } = useGetProjectsQuery(undefined);
  const { data: teamData } = useGetTeamsByProjectIdQuery(selectedProjectId, {
    skip: !selectedProjectId,
  });

  console.log(teamData);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Final Submitted Task Data:", data);

    toast.success("Task Created Successfully!");

    onClose();
  };
  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={(v: boolean) => {
        if (!v) {
          onClose();
          setSelectedProjectId("");
        }
      }}
      title="Create New Task"
    >
      <CForm
        onSubmit={onSubmit}
        styles="space-y-4"
        defaultValues={{
          title: "",
          projectId: "",
          priority: "",
          assigneeId: "",
          status: "",
          description: "",
        }}
      >
        {/* Task Title */}
        <CInput
          fieldName="title"
          label="Task Title"
          placeholder="Enter task title"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <CSelect
            name="projectId"
            label="Project"
            onValueChange={handleProjectChange}
            placeholder="Select Project"
            required
            options={(project?.data || [])?.map((p: TProject) => ({
              label: p?.name,
              value: p?._id,
            }))}
          />

          <CSelect
            name="priority"
            label="Priority"
            placeholder="Select Priority"
            required
            options={[
              { label: "Low", value: "Low" },
              { label: "Medium", value: "Medium" },
              { label: "High", value: "High" },
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CSelect
            name="status"
            label="Status"
            placeholder="Select Status"
            required
            options={[
              { label: "Pending", value: "Pending" },
              { label: "In Progress", value: "In Progress" },
              { label: "Done", value: "Done" },
            ]}
          />
          <CSelect
            name="assigneeId"
            label="Assignee (Optional)"
            placeholder="Select Member"
            options={[
              { label: "Unassigned", value: "unassigned" },
              ...(teamData?.data || []).map((m : TMember) => ({
                label: `${m?.name} (Cap: ${m?.capacity})`,
                value: m?._id,
              })),
            ]}
          />
        </div>

        <CTextarea
          fieldName="description"
          label="Description"
          placeholder="Enter your Description"
          required
        ></CTextarea>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create Task</Button>
        </div>
      </CForm>
    </Modal>
  );
}
