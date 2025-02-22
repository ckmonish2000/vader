

interface CommandCardProps {
  title: string;
  cmd: string;
  type: string;
  id: string;
}

function CommandCard({ title, cmd, type, id }: CommandCardProps) {
  return (
    <div className="p-4 border rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
      <h3 className="font-medium text-gray-900">{title}</h3>
      <code className="text-sm text-gray-600 block mt-1">{cmd}</code>
      <span className="text-xs text-gray-500 mt-2 inline-block">{type}</span>
    </div>
  );
}

export default CommandCard;
