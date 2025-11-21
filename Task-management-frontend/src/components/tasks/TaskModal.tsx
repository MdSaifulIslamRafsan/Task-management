import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
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
import { useCreateTaskMutation } from "../../redux/features/task/taskApi";
import type { TErrorMessage } from "../../Types/errorMessageTypes";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskModal({ isOpen, onClose }: TaskModalProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [createTask] = useCreateTaskMutation();
  const { data: project } = useGetProjectsQuery(undefined);
  const { data: teamData } = useGetTeamsByProjectIdQuery(selectedProjectId, {
    skip: !selectedProjectId,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Task...");
    try {
      const res = await createTask(data).unwrap();
      toast.success(res?.message || `Task created successfully`, {
        id: toastId,
        duration: 2000,
      });
    } catch (error: unknown) {
      toast.error(`something went wrong ${(error as TErrorMessage).message}`, {
        id: toastId,
        duration: 2000,
      });
    }

    onClose();
  };
  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleAutoAssign = (form: UseFormReturn<FieldValues>) => {
    if (!teamData?.data?.length) return;

    const sortedMembers = [...teamData.data].sort(
      (a, b) => a.currentLoad - b.currentLoad
    );

    const selected = sortedMembers[0];

    if (selected) {
      form.setValue("assigneeId", selected._id);
      console.log(selected);

      toast.success(`Task will be assigned to ${selected.name}`);
    }
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
        defaultValues={{
          title: "",
          projectId: "",
          priority: "",
          assigneeId: "",
          status: "",
          description: "",
        }}
        styles="space-y-4"
      >
        {({ form }) => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <CInput
                fieldName="title"
                label="Task Title"
                placeholder="Enter task title"
                required
              />

              <CSelect
                name="projectId"
                label="Project"
                onValueChange={handleProjectChange}
                placeholder="Select Project"
                required
                options={(project?.data || []).map((p: TProject) => ({
                  label: p.name,
                  value: p._id,
                }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CSelect
                name="assigneeId"
                label="Assignee"
                placeholder="Select Member"
                options={(teamData?.data || []).map((m: TMember) => ({
                  label: `${m.name} (${m.currentLoad}/${m.capacity})`,
                  value: m._id,
                }))}
              />
              <Button
                type="button"
                className="sm:mt-6"
                onClick={() => handleAutoAssign(form)}
              >
                Auto Assign
              </Button>
            </div>

            <CTextarea
              fieldName="description"
              label="Description"
              required
              placeholder="Enter description"
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create Task</Button>
            </div>
          </>
        )}
      </CForm>
    </Modal>
  );
}
