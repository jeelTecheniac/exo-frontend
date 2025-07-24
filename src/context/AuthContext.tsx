import React, { createContext, useContext, useState, ReactNode } from "react";
import localStorageService from "../services/local.service";

export interface User {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  type?: "project_manager" | "user";
  token?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorageService.getLogin()
  );

  const [user, setUser] = useState<User | null>(() => {
    try {
      const userData = localStorageService.getUser();
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      return null;
    }
  });

  const login = (token: string, userData: User) => {
    localStorage.setItem("isLogin", token);
    localStorageService.setUser(JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("isLogin");
    localStorageService.removeUser();
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorageService.setUser(JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
