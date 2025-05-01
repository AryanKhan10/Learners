import axios from 'axios'
import store from '../store/store'
import { setToken } from '../slices/auth';
import { authEndpoints } from './apis';

const instance = axios.create({
    withCredentials: true, // 💥 very important to enable cookies
  })

    // separate instance to avoid infinite interceptor loop
const refreshInstance = axios.create({ withCredentials: true });

    // Add response interceptor for handling 401 errors globally
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid — handle it globally here
        try {
            const res =  await refreshInstance.get(authEndpoints.REFRESH_API);
            console.log("res", res)
            if (res.data.success) {
              // Token refreshed successfully
              // You can also update the token in your store or state management here
                console.log("Token refreshed successfully:", res.data.accessToken);
                store.dispatch(setToken(res.data.accessToken));
                console.log(".....................");
                localStorage.setItem("token", res.data.accessToken);

            } else {
              // Token refresh failed — redirect to login or show a message
              console.log("Token refresh failed:", res.data.message);
              store.dispatch(setToken(null));
              localStorage.removeItem("token");

            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            // Handle error (e.g., redirect to login page)
            store.dispatch(setToken(null));
              localStorage.removeItem("token");
        }

      }
      return Promise.reject(error);
    }
  )
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