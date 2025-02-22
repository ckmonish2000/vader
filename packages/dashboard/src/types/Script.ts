export interface Script {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  commands: ScriptCommand[];
}

export interface Command {
  id: string;
  title: string;
  cmd: string;
  type: "USER_DEFINED" | "DEFAULT";
  isInputAllowed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ScriptCommand {
  id: string;
  commandId: string;
  scriptId: string;
  order: number;
  args: null;
  createdAt: string;
  updatedAt: string;
  command: Command;
}
