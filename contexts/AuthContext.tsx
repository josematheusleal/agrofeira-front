"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ecofeira_token");
    }
    return null;
  });
  const [username, setUsername] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ecofeira_username");
    }
    return null;
  });
  const [isInitialized] = useState(typeof window !== "undefined");

  function login(token: string, username: string) {
    localStorage.setItem("ecofeira_token", token);
    localStorage.setItem("ecofeira_username", username);
    setToken(token);
    setUsername(username);
  }

  function logout() {
    localStorage.removeItem("ecofeira_token");
    localStorage.removeItem("ecofeira_username");
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        login,
        logout,
        isAuthenticated: !!token,
        isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
