// 全局的变量
// export const Define = {
//     name: 'lpp',
//     age: 18
// }

// import { useDmwLogin } from "../../loginProvider/constans/DmwLoginProvider";
import storage from "../Storage/storage";
const BaseUrl = "https://dmw.cougogo.com";

//全局的方法
const Api = () => {
//   const { logOut } = useDmwLogin();
  //静态方法
  const get = async (url) => {
    let token = await GetStorage();

    return fetch(BaseUrl + url, {
      method: "GET",
      headers: {
        'token': token,
      },
    }).then((res) => res.json());
  };

  const post = async (url, data) => {
    let token = await GetStorage();
    return fetch(BaseUrl + url, {
      method: "POST",
      body: data,
      headers: {
        token: token,
      },
    }).then((res) => res.json());
  };

  const formData = (data) => {
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };

  const GetStorage = () => {
    console.log(123);
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
          // 如果找到数据，则在then方法中返回
          // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
          // 你只能在then这个方法内继续处理ret数据
          // 而不能在then以外处理
          // 也没有办法“变成”同步返回
          // 你也可以使用“看似”同步的async/await语法
          // console.log(ret.token, "----------------------");
          resolve(ret.token);
        })
        .catch((err) => {
          //如果没有找到数据且没有sync方法，
          //或者有其他异常，则在catch中返回
          console.warn(err.message, "---+++");
        //   logOut()
          // switch (err.name) {
          //     case 'NotFoundError':
          //         // TODO;
          //         break;
          //     case 'ExpiredError':
          //         // TODO
          //         break;
          // }
        });
    });
  };
};

export default Api;
