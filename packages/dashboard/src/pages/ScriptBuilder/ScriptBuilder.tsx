import PageHeading from "@/components/common/PageHeading";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommandCard from "@/components/common/CommandCard";
import CommandSelectionDialog from "@/components/common/CommandSelectionDialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { updateScript, getScript } from "@/services/scriptService";
import { toast } from "react-toastify";
import { Command, ScriptCommand } from "@/types/Script";

interface CommandWithArgs {
  id: string;
  args?: string;
}

function ScriptBuilder() {
  const { scriptID } = useParams();
  const [commands, setCommands] = useState<Command[]>([]);
  const [commandsWithArgs, setCommandsWithArgs] = useState<CommandWithArgs[]>(
    []
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: scriptData } = useQuery({
    queryKey: ["script", scriptID],
    queryFn: () => {
      if (!scriptID) throw new Error("No script ID provided");
      return getScript(scriptID);
    },
  });

  useEffect(() => {
    if (scriptData?.commands) {
      const scriptCommands = scriptData.commands.map(
        (sc: ScriptCommand) => sc.command
      );
      setCommands(scriptCommands);
      // Initialize commandsWithArgs with existing commands and their args
      setCommandsWithArgs(
        scriptData.commands.map((sc: ScriptCommand) => ({
          id: sc.command.id,
          args: sc.args || undefined,
        }))
      );
    }
  }, [scriptData]);

  const { mutate: saveScriptMutation, isPending } = useMutation({
    mutationFn: async () => {
      if (!scriptID) throw new Error("No script ID provided");
      return updateScript(scriptID, commandsWithArgs);
    },
    onSuccess: () => {
      toast.success("Script saved successfully");
    },
    onError: (error) => {
      console.error("Error saving script:", error);
      toast.error("Failed to save script");
    },
  });

  const handleAddCommand = (command: Command, args?: string) => {
    setCommands([...commands, command]);
    setCommandsWithArgs([
      ...commandsWithArgs,
      {
        id: command.id,
        args: args,
      },
    ]);
  };

  const handleDeleteCommand = (index: number) => {
    setCommands(commands.filter((_, i) => i !== index));
    setCommandsWithArgs(commandsWithArgs.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-full flex-col">
        <div className="flex-1 p-4">
          <div>
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="mb-4"
            >
              ← Back
            </Button>
            <div className="flex items-center justify-between mb-4">
              <PageHeading title={scriptData?.name || "Script Builder"} />
              <Button onClick={() => setDialogOpen(true)}>Add Command</Button>
            </div>

            <div className="space-y-4 mt-4">
              {commands.map((command, index) => (
                <CommandCard
                  key={index}
                  command={command.title}
                  args={commandsWithArgs[index].args}
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
    </div>
  );
}

export default ScriptBuilder;
