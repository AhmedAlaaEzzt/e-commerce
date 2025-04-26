import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("userName")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const isAuthenticated = !!token;

  const login = (userName: string, token: string) => {
    setUserName(userName);
    setToken(token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUserName(null);
    setToken(null);
    localStorage.setItem("userName", "");
    localStorage.setItem("token", "");
  };

  return (
    <AuthContext.Provider
      value={{ userName, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
