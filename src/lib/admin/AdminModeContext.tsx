"use client";

import React, { createContext, useContext } from "react";

const AdminModeContext = createContext(false);

export function AdminModeProvider({
  isAdmin,
  children,
}: {
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  return (
    <AdminModeContext.Provider value={isAdmin}>
      {children}
    </AdminModeContext.Provider>
  );
}

export function useAdminMode() {
  return useContext(AdminModeContext);
}
