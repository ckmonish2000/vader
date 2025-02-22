import PageHeading from "@/components/common/PageHeading";
import { useParams } from "react-router-dom";
import CommandList from "@/components/common/CommandList";

const MOCK_COMMANDS = [
  {
    id: "907d5eb1-a959-4ded-8cdd-beec54691f3d",
    title: "get npm version",
    cmd: "npm -v",
    type: "DEFAULT",
    createdAt: "2025-02-22T13:01:57.929Z",
    updatedAt: "2025-02-22T13:01:57.929Z",
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
    id: "907d5eb1-a959-4ded-8cdd-beec54691f3d",
    title: "get npm version",
    cmd: "npm -v",
    type: "DEFAULT",
    createdAt: "2025-02-22T13:01:57.929Z",
    updatedAt: "2025-02-22T13:01:57.929Z",
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
    id: "907d5eb1-a959-4ded-8cdd-beec54691f3d",
    title: "get npm version",
    cmd: "npm -v",
    type: "DEFAULT",
    createdAt: "2025-02-22T13:01:57.929Z",
    updatedAt: "2025-02-22T13:01:57.929Z",
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
    id: "907d5eb1-a959-4ded-8cdd-beec54691f3d",
    title: "get npm version",
    cmd: "npm -v",
    type: "DEFAULT",
    createdAt: "2025-02-22T13:01:57.929Z",
    updatedAt: "2025-02-22T13:01:57.929Z",
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
    id: "907d5eb1-a959-4ded-8cdd-beec54691f3d",
    title: "get npm version",
    cmd: "npm -v",
    type: "DEFAULT",
    createdAt: "2025-02-22T13:01:57.929Z",
    updatedAt: "2025-02-22T13:01:57.929Z",
  },
  {
    id: "907d5eb1-a959-4ded-8cdd-beec54691f3d",
    title: "get npm version",
    cmd: "npm -v",
    type: "DEFAULT",
    createdAt: "2025-02-22T13:01:57.929Z",
    updatedAt: "2025-02-22T13:01:57.929Z",
  },
  // ... existing mock data ...
];

function ScriptBuilder() {
  const { scriptID } = useParams();

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 p-4">
        <PageHeading title="Script Builder" />
        <div>
          <h1>Command List</h1>
        </div>
      </div>

      {/* Command list moved to right side */}
      <CommandList commands={MOCK_COMMANDS} />
    </div>
  );
}

export default ScriptBuilder;
