// components/ui/ConfirmModal.tsx

import { toast } from "sonner";
import { useDeleteTaskMutation } from "../../redux/features/task/taskApi";
import { Modal } from "../modal";
import { Button } from "../ui/button";
import type { TErrorMessage } from "../../Types/errorMessageTypes";

interface ConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  selectedTaskId: string | null;
}

const ConfirmModal = ({
  isOpen,
  onCancel,
  selectedTaskId,
}: ConfirmModalProps) => {
  const [deleteTask] = useDeleteTaskMutation();
  const handleConfirmDelete = async () => {
    if (!selectedTaskId) return;
    const toastId = toast.loading("Deleting Task...");
    try {
      const res = await deleteTask(selectedTaskId).unwrap();
      toast.success(res?.message || `Task deleted successfully`, {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error(`something went wrong ${(error as TErrorMessage).message}`, {
        id: toastId,
        duration: 2000,
      });
    }

    onCancel();
  };
  return (
    <Modal open={isOpen} onOpenChange={onCancel} title={"Are you sure?"}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {
            "Are you sure you want to delete this task? This action cannot be undone."
          }
        </p>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
