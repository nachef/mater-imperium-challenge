"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className={styles.searchBar_container}>
      <input
        type="text"
        placeholder="Pesquisar projeto..."
        value={query}
        onChange={handleInputChange}
        className={styles.input}
      />
    </div>
  );
}
