import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";

const USER_NAME_KEY = "userName";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem(USER_NAME_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  const isAuthenticated = !!token;

  const login = (userName: string, token: string) => {
    setUserName(userName);
    setToken(token);
    localStorage.setItem(USER_NAME_KEY, userName);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    setUserName(null);
    setToken(null);
    localStorage.setItem(USER_NAME_KEY, "");
    localStorage.setItem(TOKEN_KEY, "");
  };

  return (
    <AuthContext.Provider
      value={{ userName, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
