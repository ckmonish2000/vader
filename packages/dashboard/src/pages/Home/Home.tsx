import PageHeading from "@/components/common/PageHeading";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getScripts } from "@/services/scriptService";
import ScriptCard from "@/components/common/ScriptCard";

const Home: React.FC = () => {
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
      <PageHeading title="Home Page" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scripts &&
          scripts.map((script) => (
            <ScriptCard key={script.id} script={script} />
          ))}
      </div>
    </div>
  );
};

export default Home;
