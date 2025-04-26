import { createContext, useContext } from "react";

interface AuthContextType {
  userName: string | null;
  token: string | null;
  login: (userName: string, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  userName: null,
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
