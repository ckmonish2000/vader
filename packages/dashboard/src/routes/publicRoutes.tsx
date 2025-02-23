import ScriptOutput from "@/pages/ScriptOutput/ScriptOutput";
import type { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
  { path: "preview/:id", element: <ScriptOutput /> },
];
