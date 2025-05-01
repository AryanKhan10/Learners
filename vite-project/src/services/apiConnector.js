import axios from 'axios'
const instance = axios.create({
    withCredentials: true, // 💥 very important to enable cookies
  })
const apiConnector = (method, url, bodyData, headers, params)=>{
    // console.log(params)
    return instance({
        method:`${method}`,
        baseURL:`${url}`,
        headers:headers ? headers : null,
        data:bodyData ? bodyData : null,
        params:params ? params : null
    });
    // return instance.request();
}

export default apiConnector;