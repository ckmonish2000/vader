class CreateScriptDto {
  name: string;
  commands: {
    id: string;
    args?: string;
  }[];
  args?: string;
}

export default CreateScriptDto;
