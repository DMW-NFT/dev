import React, { useEffect, useMemo, useState } from "react";
import DmwLoginContext from "./DmwLoginContext";
import { useTranslation } from 'react-i18next'
const DmwLoginProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [isLogin, setIsLogin] = useState(true); //登录状态
  const [username, setUsername] = useState(t("用户昵称")); //用户名
  const [avatarUrl, setAvatarUrl] = useState(); //用户名
  const [WalletInUse,setWalletInUse] = useState(1)
  const [language,setlanguage] = useState('zh')
  const login = () => {
    setIsLogin(true);
  };

  const logOut = () => {
    setIsLogin(false);
  };

  useEffect(() => {
    console.log("using dmwlogin provider");
  }, []);

  useEffect(() => {
    console.log("someone call login");
  }, [isLogin]);

  return (
    <DmwLoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        login,
        logOut,
        username,
        setUsername,
        avatarUrl,
        setAvatarUrl,
        WalletInUse,
        setWalletInUse,
        setlanguage,
        language
      }}
    >
      {children}
    </DmwLoginContext.Provider>
  );
};

function useDmwLogin() {
  const context = React.useContext(DmwLoginContext);
  if (context === undefined) {
    throw new Error("useDmwLogin must be used within a DmwLoginProvider");
  }
  return context;
}

export { DmwLoginProvider, useDmwLogin };
