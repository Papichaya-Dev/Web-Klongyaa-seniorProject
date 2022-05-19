import React, { useContext, useEffect, useState } from "react";
import { IAuth } from "./interface/User.interface";
import axios from "../../../../config/axiosInstance";

const AuthContext = React.createContext<any>(null);
interface IAuthProps {
  children: any;
}

const AuthProvider = ({ children }: IAuthProps) => {
  const [accessToken, setAccessToken] = useState<any | null>();
  const [refreshToken, setRefreshToken] = useState<any | null>();
  const [user, setUser] = useState("");

  async function login({ email_or_username, password }: IAuth) {
    return await axios
      .post("/auth/signin", { email_or_username, password })
      .then((response) => {
        if (response.data.access_token) localStorage.setItem("accessToken", response.data.access_token);
        if (response.data.refresh_token) localStorage.setItem("refreshToken", response.data.refresh_token);
        setAccessToken(localStorage.getItem("accessToken"));
        setRefreshToken(localStorage.getItem("refreshToken"));
        setUser(response.data);
        console.log(accessToken);
        return user;
      })
      .catch((err) => {
        console.error("ERROR CANNOT LOGIN", err);
      });
  }

  const logout = () => {
    return axios
      .post("/auth/logout", {}, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        console.log("[Response Logout]", response.data);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
        return response.data;
      })
      .catch((err) => {
        console.error("ERROR CANNOT LOGIN", err);
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        accessToken,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(" error AuthContext");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuthContext };
