import { Message,Loading } from 'element-ui'
import axios from 'axios'
const Axios = axios.create({
  // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
  baseURL: '/api',
  // 定义统一的请求头部
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  },
  // 配置请求超时时间
  // timeout: 10000,
  // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
  withCredentials: true
})
// 请求拦截
Axios.interceptors.request.use(config => {
  // 自定义header，可添加项目token
  // config.headers.token = 'token';
  // if(localStorage.getItem("loginToken")){
  //   config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("loginToken")
  // }
  return config;
});
Axios.interceptors.response.use(
  response => {
    // return response.data
    // 获取接口返回结果
    // const res = response.data;
    // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data.
    // if(res.code === 0){
    //   return res;
    // }else if(res.code === 10000){
    //   // 10000假设是未登录状态码
    //   Message.warning(res.message);
    //   // 也可使用router进行跳转
    //   window.location.href = '/#/login';
    //   return res;
    // }else{
    //   // 错误显示可在service中控制，因为某些场景我们不想要展示错误
    //   // Message.error(res.message);
    //   return res;
    // }
    return response
  },()=>{
    Message.error('网络请求异常，请稍后重试!');
  })
export default Axios
