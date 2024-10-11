"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useCard } from "@/contexts/ProjectCardContext";
import { ProjectCard } from "@/components/ProjectCard";
import { SearchBar } from "@/components/SearchBar";

export function CardList() {
  const { projectCards, handleFixCard, handleDeleteCard, fixedCards } = useCard();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCard, setActiveCard] = useState<string | null>(null);
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

  const handleToggleDropdown = (id: string) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      <div className={styles.wrapper}>
        {isLoading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div key={card.id}>
              <ProjectCard
                id={card.id}
                url={card.url}
                title={card.title}
                description={card.description}
                percentage={card.percentage}
                isActive={activeCard === card.id}
                isFixed={fixedCards.includes(card.id)}
                onToggle={() => handleToggleDropdown(card.id)}
                onFix={() => handleFixCard(card.id)}
                onDelete={() => handleDeleteCard(card.id)}
                disableFix={
                  fixedCards.length >= 3 && !fixedCards.includes(card.id)
                }
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