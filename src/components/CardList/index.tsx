"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useCard } from "@/contexts/ProjectCardContext";
import { ProjectCard } from "@/components/ProjectCard";
import { SearchBar } from "@/components/SearchBar";

export function CardList() {
  const { projectCards } = useCard();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredCards = projectCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleDropdown = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      <div className={styles.wrapper}>
        {isLoading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <div key={index}>
              <ProjectCard
                url={card.url}
                title={card.title}
                description={card.description}
                percentage={card.percentage}
                isActive={activeCard === index}
                onToggle={() => handleToggleDropdown(index)}
              />
            </div>
          ))
        ) : (
          <div className={styles.noFilter_message}>
            Não existem projetos com o nome{" "}
            <strong>&quot;{searchQuery}&quot;</strong>
          </div>
        )}
      </div>
    </div>
  );
}