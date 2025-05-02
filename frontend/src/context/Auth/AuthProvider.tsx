import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../../constants/baseUrl";

const USER_NAME_KEY = "userName";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem(USER_NAME_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  const [myOrders, setMyOrders] = useState([]);

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

  const getMyOrders = async () => {
    const response = await fetch(`${BASE_URL}/users/my-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();

    setMyOrders(data);

    console.log(data);
  };

  return (
    <AuthContext.Provider
      value={{
        userName,
        token,
        isAuthenticated,
        login,
        logout,
        getMyOrders,
        myOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
