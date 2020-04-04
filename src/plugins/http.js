
import Vue from  "vue"
import axios from "axios"

const MyHttpServer={};

MyHttpServer.install=function(Vue)
{
    axios.defaults.baseURL="http://libo2020.oicp.io"
    Vue.prototype.$http=axios;
}

export default MyHttpServer;
