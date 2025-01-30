import React, { createContext, useContext, useEffect, useState } from "react";
import { updateAxiosInstance } from "../services/axiosInstance";

interface IUser {
  role: string;
  name: string;
  email: string;
  token?: string;
}

interface AuthContextType {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (user: IUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    updateAxiosInstance(user.token || null);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
