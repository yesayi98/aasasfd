import axios from 'axios'
import vueAxios from 'vue-axios'
import vue from 'vue'
axios.defaults.baseURL = process.env.API_URL
axios.interceptors.request.use(
    config => {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        // config.headers.locale = localStorage.getItem('locale');
        return config;
    },
    error => Promise.reject(error)
);
axios.interceptors.response.use(
  response => {
    // Do something with response
    return response;
  },
  error => {
    const unAuthorized = error.response.data.error === "Unauthorized"
    if (unAuthorized){
      localStorage.removeItem('token');
    }
    return Promise.reject(error)

  }
)
vue.use(vueAxios, axios)
