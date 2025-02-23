interface Command {
  title: string;
  command: string;
  output: string;
  args: string | null;
}

interface OutputCardProps {
  command: Command;
}

function OutputCard({ command }: OutputCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h2 className="text-white font-semibold mb-4">{command.title}</h2>
      <div className="space-y-3">
        <div>
          <span className="text-gray-400 mb-2 block">Command:</span>
          <div className="bg-gray-800 p-3 rounded">
            <code className="text-white">{command.command}</code>
          </div>
        </div>
        {command.args && (
          <div>
            <span className="text-gray-400 mb-2 block">Arguments:</span>
            <div className="bg-gray-800 p-3 rounded">
              <code className="text-white">
                {JSON.stringify(JSON.parse(command.args), null, 2)}
              </code>
            </div>
          </div>
        )}
        <div>
          <span className="text-gray-400 mb-2 block">Output:</span>
          <div className="bg-gray-800 text-white p-3 rounded">
            <pre>{command.output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputCard;
