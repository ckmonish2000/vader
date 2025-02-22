import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScript } from "@/services/scriptService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateScriptDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateScriptDialog: React.FC<CreateScriptDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState("");

  const createScriptMutation = useMutation({
    mutationFn: createScript,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scripts"] });
      onClose();
      setName("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createScriptMutation.mutate(name);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Script</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createScriptMutation.isPending}>
              {createScriptMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateScriptDialog;
