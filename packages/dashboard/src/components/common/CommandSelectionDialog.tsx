import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { Command } from "@/types/Script";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getCommands } from "@/services/cmdService";

interface CommandSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCommandSelect: (command: Command, args?: string) => void;
}

function CommandSelectionDialog({
  open,
  onOpenChange,
  onCommandSelect,
}: CommandSelectionDialogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["commands"],
      queryFn: ({ pageParam = null }) =>
        getCommands({ cursor: pageParam, take: 15 }),
      getNextPageParam: (lastPage) => {
        if (lastPage.length < 15) return undefined;
        return lastPage[lastPage.length - 1]?.id;
      },
      initialPageParam: null,
    });

  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [commandInput, setCommandInput] = useState<string>("");

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollContainer = target.firstElementChild as HTMLDivElement;

    if (!scrollContainer) return;

    const isNearBottom =
      scrollContainer.scrollHeight - target.scrollTop <=
      target.clientHeight + 100;

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleCommandSelect = () => {
    if (selectedCommand) {
      onCommandSelect(
        selectedCommand,
        selectedCommand.isInputAllowed ? commandInput : null
      );
      setCommandInput("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Select a Command</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 h-[500px]">
          {/* Left side - Command List */}
          <Card className="w-1/2">
            <ScrollArea className="h-full" onScrollCapture={handleScroll}>
              <CardContent className="space-y-2 p-4">
                {data?.pages.map((page) =>
                  page.map((command) => (
                    <Button
                      key={command.id}
                      variant={
                        selectedCommand?.id === command.id
                          ? "secondary"
                          : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedCommand(command)}
                    >
                      <div className="font-medium">{command.title}</div>
                    </Button>
                  ))
                )}
                {isFetchingNextPage && (
                  <div className="py-2 text-center text-sm text-muted-foreground">
                    Loading more commands...
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>

          {/* Right side - Command Textarea */}
          <Card className="w-1/2">
            <CardContent className="p-4 h-full flex flex-col">
              {selectedCommand ? (
                <>
                  <Textarea
                    readOnly
                    value={selectedCommand.cmd}
                    className="flex-1 font-mono resize-none"
                  />
                  {selectedCommand.isInputAllowed && (
                    <Input
                      placeholder="Enter command arguments..."
                      className="mt-4"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                    />
                  )}
                  <Button className="mt-4 w-full" onClick={handleCommandSelect}>
                    Select Command
                  </Button>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Select a command to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CommandSelectionDialog;
