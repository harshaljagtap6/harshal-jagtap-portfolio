"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Role = "game" | "ai";

interface RoleContextProps {
  role: Role;
  setRole: (role: Role) => void;
  toggleRole: () => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>("game");

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-role", newRole);
      // Synchronize body attribute for CSS selector styling
      document.body.setAttribute("data-role", newRole);
    }
  };

  const toggleRole = () => {
    setRole(role === "game" ? "ai" : "game");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-role") as Role;
      if (saved === "game" || saved === "ai") {
        setRoleState(saved);
        document.body.setAttribute("data-role", saved);
      } else {
        document.body.setAttribute("data-role", "game");
      }
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
