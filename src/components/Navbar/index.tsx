"use client";

import React from "react";
import styles from "./styles.module.css";
import { UserInfo } from "@/components/UserInfo";
import { useUser } from "@/contexts/UserContext";

export function Navbar() {
  const { user } = useUser();

  return (
    <div className={styles.navbar}>
      <h1>Meus projetos</h1>
      {user && (
        <UserInfo name={user.name} email={user.email} photo={user.photo} />
      )}
    </div>
  );
}
