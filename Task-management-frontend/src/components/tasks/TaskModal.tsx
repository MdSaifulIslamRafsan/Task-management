import type { FieldValues, SubmitHandler } from "react-hook-form";
import { Modal } from "../modal";
import { Button } from "../ui/button";
import CForm from "../form/CForm";
import CInput from "../form/CInput";
import CSelect from "../form/CSelect";
import type { Priority } from "../../lib/types";
import { members, projects } from "../../lib/rawData";
import { toast } from "sonner";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskModal({ isOpen, onClose }: TaskModalProps) {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Final Submitted Task Data:", data);

    toast.success("Task Created Successfully!");

    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={(v: boolean) => {
        if (!v) onClose();
      }}
      title="Create New Task"
    >
      <CForm
        onSubmit={onSubmit}
        styles="space-y-4"
        defaultValues={{
          title: "",
          projectId: "",
          priority: "Medium" as Priority,
          assigneeId: "",
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
          {/* Project */}
          <CSelect
            name="projectId"
            label="Project"
            placeholder="Select Project"
            required
            options={projects.map((p) => ({
              label: p.name,
              value: p.id,
            }))}
          />

          {/* Priority */}
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

        {/* Assignee */}
        <CSelect
          name="assigneeId"
          label="Assignee (Optional)"
          placeholder="Auto Assign"
          options={[
            { label: "Auto Assign", value: "auto" },
            ...members.map((m) => ({
              label: `${m.name} (Cap: ${m.capacity})`,
              value: m.id,
            })),
          ]}
        />

        <p className="text-[10px] text-muted-foreground -mt-2">
          Leave empty for auto-assignment.
        </p>

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
