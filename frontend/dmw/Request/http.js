// 全局的变量
// export const Define = {
//     name: 'lpp',
//     age: 18
// }
const BaseUrl = 'https://dmw.cougogo.com'

//全局的方法
export default class Api {
    //静态方法
   get(url){
    return  fetch(BaseUrl + url,{method:'GET'}).then(res => res.json())
   }

   post(url,data){
   return  fetch(BaseUrl + url,{method:'POST',body:data}).then(res => res.json())
   }

   formData(data){
    let formData = new FormData();
    for(let key in data){
        formData.append(key,data[key]);
    }
    return   formData
   }
}