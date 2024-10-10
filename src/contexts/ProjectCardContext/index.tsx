"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import type { ProjectCardContextType, ProjectCardProviderProps } from "./types";
import type { ICardProps } from "@/components/ProjectCard/types";

export const ProjectCardContext = createContext<ProjectCardContextType>(
  {} as ProjectCardContextType
);

export default function ProjectCardProvider({
  children,
}: ProjectCardProviderProps) {
  const [projectCards, setProjectCards] = useState<ICardProps[]>([]);

  function createRandomProjectCard() {
    return {
      url: faker.internet.url(),
      title: faker.company.name().slice(0, 20),
      description: faker.lorem.sentence({ min: 8, max: 20 }),
      percentage: faker.number.int({ min: 0, max: 100 }),
    };
  }

  useEffect(() => {
      setProjectCards(
        faker.helpers.multiple(createRandomProjectCard, {
          count: 9,
        })
      );
  }, []);

  return (
    <ProjectCardContext.Provider value={{ projectCards }}>
      {children}
    </ProjectCardContext.Provider>
  );
}

export const useCard = () => {
  const context = useContext(ProjectCardContext);
  
  return context;
};
