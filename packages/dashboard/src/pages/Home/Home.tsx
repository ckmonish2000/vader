import PageHeading from "@/components/common/PageHeading";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getScripts } from "@/services/scriptService";
import ScriptCard from "@/components/common/ScriptCard";
import CreateScriptDialog from "@/components/common/CreateScriptDialog";

const Home: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    data: scripts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["scripts"],
    queryFn: getScripts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading scripts</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <PageHeading title="Home Page" />
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create new script
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scripts &&
          scripts.map((script) => (
            <ScriptCard key={script.id} script={script} />
          ))}
      </div>
      <CreateScriptDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Home;
