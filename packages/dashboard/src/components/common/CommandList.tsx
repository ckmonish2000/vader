import React from "react";
import CommandCard from "@/components/common/CommandCard";
import { Command } from "@/types/Script";

interface CommandListProps {
  commands: Command[];
}

function CommandList({ commands }: CommandListProps) {
  return (
    <div className="w-80 border-l flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Available Commands</h2>
      </div>
      <div className="overflow-y-auto p-4" style={{ height: "600px" }}>
        {commands.map((command) => (
          <CommandCard
            key={command.id}
            id={command.id}
            title={command.title}
            cmd={command.cmd}
            type={command.type}
          />
        ))}
      </div>
    </div>
  );
}

export default CommandList;
