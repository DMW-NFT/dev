import React, { useEffect, useMemo, useState } from "react";

import DmwApiContext from "./DmwApiContext";
import { useDmwLogin } from "../loginProvider/constans/DmwLoginProvider";

import storage from "../dmw/Storage/storage";
const DmwApiProvider = ({ children }) => {

  const [BaseUrl, setBaseUrl] = useState("https://dmw.cougogo.com");
  const { logOut } = useDmwLogin();
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(2000);
  const [toastVal, setToastVal] = useState("温馨提示");
  const [MoneyRouteState, setMoneyRouteState] = useState('createMoney')

  // 地址切割
  const shortenAddress = (address) => {
    console.log(address,'*****************');
    
    let addressNew = address.slice(0,7) + '...' + address.slice(-4)
    return addressNew
  }


  const get = async (url) => {
    let token = await GetStorage();

    return fetch(BaseUrl + url, {
      method: "GET",
      headers: {
        'token': token,
        'accept-language': 'zh'
      },
    }).then((res) => res.json());
  };


  const post = async (url, data) => {
    // console.log(url,'url');
    
    let token = await GetStorage();
    // console.log(token, "----------------");
    return fetch(BaseUrl + url, {
      method: "POST",
      body: data,
      headers: {
        token: token,
        'accept-language': 'zh'
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code == 204) {
          setTimeout(() => {
            Toast('登录失效，重新登录')
            logOut();
          }, 2000);
        } else {
          return res;
        }
      });
  };

  const formData = (data) => {
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };

  const GetStorage = () => {
    return new Promise((resolve) => {
      storage
        .load({
          key: "loginState",

          // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
          autoSync: true, // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。

          // syncInBackground(默认为true)意味着如果数据过期，
          // 在调用sync方法的同时先返回已经过期的数据。
          syncInBackground: true,
          // 你还可以给sync方法传递额外的参数
          syncParams: {
            extraFetchOptions: {
              // 各种参数
            },
            someFlag: true,
          },
        })
        .then((ret) => {
          console.log(ret.token, "----------------------");
          resolve(ret.token);
        })
        .catch((err) => {
          console.warn(err.message, "---+++");
          resolve("");
        });
    });
  };

  const Toast = (msg) => {
    setShow(true);
    setToastVal(msg);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  useEffect(() => {
    console.log("using dmwlogin provider");
  }, []);


  return (
    <DmwApiContext.Provider
      value={{
        GetStorage,
        formData,
        post,
        get,
        BaseUrl,
        show,
        toastVal,
        Toast,
        MoneyRouteState,
        setMoneyRouteState,
        shortenAddress
      }}
    >
      {children}
    </DmwApiContext.Provider>
  );
};

function useDmwApi() {
  const context = React.useContext(DmwApiContext);
  if (context === undefined) {
    throw new Error("useDmwLogin must be used within a DmwLoginProvider");
  }
  return context;
}

export { DmwApiProvider, useDmwApi };
