interface CommandCardProps {
  command: string;
  onDelete: () => void;
}

function CommandCard({ command, onDelete }: CommandCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <div className="flex justify-between items-center">
        <span>{command}</span>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          Delete
        </button>
      </div>
    </div>
  );
}

export default CommandCard;
