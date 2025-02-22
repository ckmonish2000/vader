import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Command {
  id: string;
  title: string;
  cmd: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface CommandSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCommandSelect: (command: Command) => void;
}

const mockCommands: Command[] = [
  {
    id: "102ca71b-1eed-44c2-9161-6cd3e53b7663",
    title: "get node version",
    cmd: "node -v",
    type: "DEFAULT",
    createdAt: "2025-02-22T13:02:16.647Z",
    updatedAt: "2025-02-22T13:02:16.647Z",
  },
  {
    id: "43513278-973a-4565-81ef-3d668a1265ed",
    title: "get docker version",
    cmd: "docker -v",
    type: "DEFAULT",
    createdAt: "2025-02-22T13:02:22.007Z",
    updatedAt: "2025-02-22T13:02:22.007Z",
  },
  {
    id: "5692e0c6-5e5f-41ca-86be-5c4f1c46bd7c",
    title: "ping google",
    cmd: "ping https://www.google.com",
    type: "DEFAULT",
    createdAt: "2025-02-22T13:02:49.870Z",
    updatedAt: "2025-02-22T13:02:49.870Z",
  },
  {
    id: "907d5eb1-a959-4ded-8cdd-beec54691f3d",
    title: "get npm version",
    cmd: "npm -v",
    type: "DEFAULT",
    createdAt: "2025-02-22T13:01:57.929Z",
    updatedAt: "2025-02-22T13:01:57.929Z",
  },
  {
    id: "cm7ggxti90000oyzaz8sm6ye4",
    title: "Get OS Information",
    cmd: "uname -s && uname -r && uname -m",
    type: "DEFAULT",
    createdAt: "2025-02-22T17:23:17.025Z",
    updatedAt: "2025-02-22T17:23:17.025Z",
  },
  {
    id: "cm7ggxti90001oyzamfpik78y",
    title: "Get CPU Information",
    cmd: 'lscpu | grep "Model name"',
    type: "DEFAULT",
    createdAt: "2025-02-22T17:23:17.025Z",
    updatedAt: "2025-02-22T17:23:17.025Z",
  },
  {
    id: "cm7ggxti90002oyzab1pymbrq",
    title: "Get Memory Usage",
    cmd: "free -h | grep Mem | awk '{print $3 \"/\" $2}'",
    type: "DEFAULT",
    createdAt: "2025-02-22T17:23:17.025Z",
    updatedAt: "2025-02-22T17:23:17.025Z",
  },
  {
    id: "cm7ggxti90003oyzalcs9i4xc",
    title: "Get Disk Usage",
    cmd: 'df -h / | grep / | awk \'{print $3 "/" $2 " (" $5 " used)"}\'',
    type: "DEFAULT",
    createdAt: "2025-02-22T17:23:17.025Z",
    updatedAt: "2025-02-22T17:23:17.025Z",
  },
  {
    id: "cm7ggxti90004oyzahnvicr1s",
    title: "Get Node.js Version",
    cmd: "node -v",
    type: "DEFAULT",
    createdAt: "2025-02-22T17:23:17.025Z",
    updatedAt: "2025-02-22T17:23:17.025Z",
  },
  {
    id: "cm7ggxti90005oyzajftiqc7o",
    title: "Get NPM Version",
    cmd: "npm -v",
    type: "DEFAULT",
    createdAt: "2025-02-22T17:23:17.025Z",
    updatedAt: "2025-02-22T17:23:17.025Z",
  },
];

function CommandSelectionDialog({
  open,
  onOpenChange,
  onCommandSelect,
}: CommandSelectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a Command</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {mockCommands.map((command) => (
              <button
                key={command.id}
                className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => {
                  onCommandSelect(command);
                  onOpenChange(false);
                }}
              >
                <div className="font-medium">{command.title}</div>
                <div className="text-sm text-gray-500">{command.cmd}</div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default CommandSelectionDialog;
