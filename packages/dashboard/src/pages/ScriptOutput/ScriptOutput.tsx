import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOutput } from "../../services/outputService";
import OutputCard from "../../components/common/OutputCard";

interface Command {
  title: string;
  command: string;
  output: string;
}

interface OutputData {
  scriptName: string;
  createAt: string;
  commands: Command[];
}

function ScriptOutput() {
  const { id } = useParams();

  const { data: outputData, isLoading } = useQuery({
    queryKey: ["output", id],
    queryFn: () => getOutput(id!),
    enabled: !!id,
  });

  console.log(outputData);

  if (isLoading || !outputData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Output Preview</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {outputData.scriptName}
        </h2>
        <span className="text-gray-500 mt-2 inline-block">
          Executed On: {new Date(outputData.createAt).toLocaleString()}
        </span>
      </div>

      <div className="space-y-6">
        {outputData.commands.map((command, index) => (
          <OutputCard key={index} command={command} />
        ))}
      </div>
    </div>
  );
}

export default ScriptOutput;
