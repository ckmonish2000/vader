export interface Command {
  id: string;
  title: string;
  cmd: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScriptCommand {
  id: string;
  commandId: string;
  scriptId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  command: Command;
}

export interface Script {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  commands: ScriptCommand[];
}
