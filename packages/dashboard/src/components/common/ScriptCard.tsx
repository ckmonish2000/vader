import React from "react";
import { Script } from "@/types/Script";
import { useNavigate } from "react-router";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScriptCardProps {
  script: Script;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ script }) => {
  const navigate = useNavigate();

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(script.id);
  };

  return (
    <div
      className="p-4 border rounded-lg shadow cursor-pointer relative"
      onClick={() => navigate(`/script/${script.id}`)}
    >
      <Button
        onClick={handleCopy}
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        title="Copy Script ID"
      >
        <Copy className="h-4 w-4" />
      </Button>
      <h3 className="text-lg font-semibold">{script.name}</h3>
      <p className="text-gray-600">{script.commands.length} commands</p>
    </div>
  );
};

export default ScriptCard;
