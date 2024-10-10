"use client";

import { ReactNode } from "react";
import ProjectCardProvider from "./ProjectCardContext";
import UserProvider from "./UserContext";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <ProjectCardProvider>
      <UserProvider>
        	{children}
      </UserProvider>
    </ProjectCardProvider>
  );
}
