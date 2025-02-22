import PageHeading from "@/components/common/PageHeading";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CommandCard from "@/components/common/CommandCard";
import CommandSelectionDialog from "@/components/common/CommandSelectionDialog";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { updateScript } from "@/services/scriptService";
import { toast } from "react-toastify";

interface Command {
  id: string;
  title: string;
  cmd: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

function ScriptBuilder() {
  const { scriptID } = useParams();
  const [commands, setCommands] = useState<Command[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: saveScriptMutation, isPending } = useMutation({
    mutationFn: async () => {
      if (!scriptID) throw new Error("No script ID provided");
      const commandIds = commands.map((cmd) => cmd.id);
      return updateScript(scriptID, commandIds);
    },
    onSuccess: () => {
      toast.success("Script saved successfully");
    },
    onError: (error) => {
      console.error("Error saving script:", error);
      toast.error("Failed to save script");
    },
  });

  const handleAddCommand = (command: Command) => {
    setCommands([...commands, command]);
  };

  const handleDeleteCommand = (index: number) => {
    setCommands(commands.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 p-4">
        <div>
          <div className="flex items-center justify-between mb-4">
            <PageHeading title="Script Builder" />
            <Button onClick={() => setDialogOpen(true)}>Add Command</Button>
          </div>

          <div className="space-y-4">
            {commands.map((command, index) => (
              <CommandCard
                key={command.id}
                command={command.title}
                onDelete={() => handleDeleteCommand(index)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              onClick={() => saveScriptMutation()}
              disabled={isPending || commands.length === 0}
            >
              {isPending ? "Saving..." : "Save Script"}
            </Button>
          </div>
        </div>
      </div>

      <CommandSelectionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCommandSelect={handleAddCommand}
      />
    </div>
  );
}

export default ScriptBuilder;
