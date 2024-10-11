import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import type { IProjectCardProps } from "./types";
import { FaExternalLinkAlt } from "react-icons/fa";

export function ProjectCard({
  url,
  title,
  description,
  isActive,
  onToggle,
}: IProjectCardProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (event: React.MouseEvent) => {
    if (isActive) {
      event.preventDefault();
    }
  };

  const handleDropdownClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onToggle();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      onToggle();
    }
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  return (
    <a href={url} className={styles.container} onClick={handleLinkClick}>
      <div className={styles.info_section}>
        <div className={styles.card_circle_section}>
          <span className={styles.title}>{title}</span>
          <div className={styles.menu_container} ref={dropdownRef}>
            <button
              className={styles.menu_button}
              onClick={handleDropdownClick}
            >
              &#x22EE;
            </button>
            {isActive && (
              <div className={styles.dropdown_menu}>
                <a href="#">Editar</a>
                <a className={styles.remove_button} href="#">
                  Excluir
                </a>
              </div>
            )}
          </div>
        </div>
        <span className={styles.description}>{description}</span>
        <FaExternalLinkAlt className={styles.icon} />
      </div>
    </a>
  );
}