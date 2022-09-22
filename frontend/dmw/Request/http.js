// 全局的变量
// export const Define = {
//     name: 'lpp',
//     age: 18
// }
const BaseUrl = 'http://192.168.1.25'

//全局的方法
export default class Api {
    //静态方法
   get(url){
    return  fetch(BaseUrl + url,{method:'GET'}).then(res => res.json())
   }

   post(url,data){
    fetch(BaseUrl + url,{method:'POST',body:JSON.stringify(data)}).then(res => res.json())
   }
}