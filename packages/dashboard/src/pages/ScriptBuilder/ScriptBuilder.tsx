import React from "react";
import { useParams } from "react-router-dom";

function ScriptBuilder() {
  const { scriptID } = useParams();
  return <div>ScriptBuilder - Script ID: {scriptID}</div>;
}

export default ScriptBuilder;
