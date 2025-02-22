interface CommandCardProps {
  command: string;
  args: string | null;
  onDelete: () => void;
}

function CommandCard({ command, args, onDelete }: CommandCardProps) {
  return (
    <div className="p-4 bg-[#1C1C1E] rounded-xl text-white">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-medium">{command}</h3>
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            Delete
          </button>
        </div>

        {args && (
          <div className="bg-[#2C2C2E] p-2 rounded-md text-sm text-gray-400">
            {args}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommandCard;
