"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import type { ProjectCardContextType, ProjectCardProviderProps } from "./types";
import type { ICardProps } from "@/components/ProjectCard/types";
import { toast } from "react-toastify";

export const ProjectCardContext = createContext<ProjectCardContextType>(
  {} as ProjectCardContextType
);

export default function ProjectCardProvider({
  children,
}: ProjectCardProviderProps) {
  const [projectCards, setProjectCards] = useState<ICardProps[]>([]);
  const [fixedCards, setFixedCards] = useState<string[]>([]);
  const [originalPositions, setOriginalPositions] = useState<
    Map<string, number>
  >(new Map());
  const [deletedCount, setDeletedCount] = useState<number>(0);

  function createRandomProjectCard() {
    return {
      id: faker.string.uuid(),
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

  const handleFixCard = (id: string) => {
    setProjectCards((prevCards) => {
      const cardIndex = prevCards.findIndex((card) => card.id === id);
      const cardToHighlight = prevCards[cardIndex];
      let newCards;

      if (fixedCards.includes(id)) {
        const originalIndex = originalPositions.get(id) ?? cardIndex;
        newCards = prevCards.filter((_, i) => i !== cardIndex);
        newCards.splice(originalIndex, 0, cardToHighlight);

        setOriginalPositions((prev) => {
          const newMap = new Map(prev);
          newMap.delete(id);
          return newMap;
        });
      } else {
        newCards = prevCards.filter((_, i) => i !== cardIndex);
        newCards.unshift(cardToHighlight);
        setOriginalPositions((prev) => new Map(prev).set(id, cardIndex));
      }

      return newCards;
    });

    setFixedCards((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [id, ...prev].slice(0, 3);
      }
    });
  };

  const handleDeleteCard = (id: string) => {
    if (deletedCount >= 6) {
      toast.error("Você só pode deletar no máximo 6 cards.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setProjectCards((prevCards) => prevCards.filter((card) => card.id !== id));
    setFixedCards((prev) => prev.filter((i) => i !== id));
    setOriginalPositions((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
    setDeletedCount((prev) => prev + 1);
  };

  return (
    <ProjectCardContext.Provider
      value={{
        projectCards,
        handleFixCard,
        handleDeleteCard,
        fixedCards,
      }}
    >
      {children}
    </ProjectCardContext.Provider>
  );
}

export const useCard = () => {
  const context = useContext(ProjectCardContext);

  return context;
};