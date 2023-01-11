import React, { useEffect, useMemo, useState } from "react";
import DmwLoginContext from "./DmwLoginContext";
import { useTranslation } from 'react-i18next'
import { useDmwWeb3 } from '../../DmwWeb3/DmwWeb3Provider'
import { useDmwWallet } from "../../DmwWallet/DmwWalletProvider";
const DmwLoginProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [isLogin, setIsLogin] = useState(true); //登录状态
  const [username, setUsername] = useState(t("用户昵称")); //用户名
  const [avatarUrl, setAvatarUrl] = useState(); //用户名
  const [WalletInUse, setWalletInUse] = useState(null)
  const [language, setlanguage] = useState('jp')
  const { connected,currentWallet } = useDmwWeb3()
  const { dmwWalletList } = useDmwWallet()
  
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

  
  useEffect(() => {
    console.log("current wallet in use :",WalletInUse)
  }, [WalletInUse])




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
