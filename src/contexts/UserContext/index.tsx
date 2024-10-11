"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import type {
  IUserInfoProps,
  UserContextType,
  UserProviderProps,
} from "./types";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<IUserInfoProps | null>(null);

  function createRandomUser(): IUserInfoProps {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      photo: faker.image.avatar(),
    };
  }

  useEffect(() => {
    setUser(createRandomUser());
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
