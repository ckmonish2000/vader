import React from "react";
import { Script } from "@/types/Script";
import { useNavigate } from "react-router";

interface ScriptCardProps {
  script: Script;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ script }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 border rounded-lg shadow cursor-pointer"
      onClick={() => navigate(`/script/${script.id}`)}
    >
      <h3 className="text-lg font-semibold">{script.name}</h3>
      {/* <p className="text-gray-600">{script.commands.length} commands</p> */}
    </div>
  );
};

export default ScriptCard;
