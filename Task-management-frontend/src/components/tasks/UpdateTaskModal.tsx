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
import { useEffect, useState } from "react";
import { useGetTeamsByProjectIdQuery } from "../../redux/features/team/teamApi";
import type { TMember } from "../../Types/TeamTypes";
import type { TErrorMessage } from "../../Types/errorMessageTypes";
import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "../../redux/features/task/taskApi";
import { updateTaskSchema } from "../../Schema/updateTaskSchema";

interface TaskModalProps {
  isOpen: boolean;
  selectedTaskId: string | null;
  onClose: () => void;
}

export default function UpdateTaskModal({
  isOpen,
  onClose,
  selectedTaskId,
}: TaskModalProps) {
  const { data, isLoading } = useGetTaskByIdQuery(selectedTaskId);

  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [formRef, setFormRef] = useState<UseFormReturn<FieldValues> | null>(
    null
  );

  const [warningInfo, setWarningInfo] = useState<{
    name: string;
    currentLoad: number;
    capacity: number;
    memberId: string;
  } | null>(null);

  useEffect(() => {
    if (data?.data?.project?._id) {
      setSelectedProjectId(data.data.project._id);
    }
  }, [data]);

  const [updateTask] = useUpdateTaskMutation();
  const { data: project } = useGetProjectsQuery(undefined);
  const { data: teamData } = useGetTeamsByProjectIdQuery(selectedProjectId, {
    skip: !selectedProjectId,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Task...");
    try {
      const res = await updateTask({
        taskId: selectedTaskId,
        updateInfo: data,
      }).unwrap();
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
  const handleAssigneeSelect = (
    memberId: string,
    form: UseFormReturn<FieldValues>
  ) => {
    const member = teamData?.data?.find((m: TMember) => m._id === memberId);

    if (!member) return;

    if (member.currentLoad >= member.capacity) {
      setWarningInfo({
        name: member.name,
        currentLoad: member.currentLoad,
        capacity: member.capacity,
        memberId: member._id,
      });
      return;
    }

    form.setValue("assigneeId", member._id);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Modal
        open={isOpen}
        onOpenChange={(v: boolean) => {
          if (!v) {
            onClose();
            setSelectedProjectId("");
          }
        }}
        title="Update Task"
      >
        <CForm
          onSubmit={onSubmit}
          resolver={updateTaskSchema}
          defaultValues={{
            title: data?.data?.title || "",
            projectId: data?.data?.project?._id || "",
            priority: data?.data?.priority || "",
            assigneeId: data?.data?.assigneeMember?._id || null,
            status: data?.data?.status || "",
            description: data?.data?.description || "",
          }}
          styles="space-y-4"
        >
          {({ form }) => {
            setFormRef(form);
            return (
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
                    onValueChange={(memberId) =>
                      handleAssigneeSelect(memberId, form)
                    }
                  />
                  <Button
                    type="button"
                    className="sm:mt-6"
                    variant={"outline"}
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
                  <Button type="submit">Update Task</Button>
                </div>
              </>
            );
          }}
        </CForm>
      </Modal>
      {warningInfo && (
        <Modal
          open={true}
          onOpenChange={() => setWarningInfo(null)}
          title="Warning"
        >
          <div className="space-y-3">
            <p>
              <strong>{warningInfo.name}</strong> has{" "}
              <strong>{warningInfo.currentLoad}</strong> tasks but capacity is{" "}
              <strong>{warningInfo.capacity}</strong>. Assign anyway?
            </p>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (formRef)
                    formRef.setValue("assigneeId", warningInfo.memberId);
                  setWarningInfo(null);
                }}
              >
                Assign Anyway
              </Button>

              <Button
                variant="destructive"
                onClick={() => {
                  if (formRef) formRef.setValue("assigneeId", "");
                  setWarningInfo(null);
                }}
              >
                Choose Another
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
