/**
 *发送ajax请求的函数模块
 * 内部封装axios
 * 函数的返回对象必须为promise对象
 * 目标：
 *    1.请求错误统一处理
 *    2.异步返回的是data，而不是response
 *    解决： 自定义promise对象
 */
import axios from 'axios'
import {message} from 'antd'


export default function ajax(url,data={},type='GET') {
    //自定义promise对象
    return new Promise((resolve,reject) => {
        let promise
        //使用axios解决异步ajax请求
        if(type === 'GET'){
            promise = axios.get(url,{params:data})
        }else{
            promise = axios.post(url,data)
        }
        promise.then(response => {
            //请求成功调用resolve
            resolve(response.data)//后面异步得到的就是data数据了
        }).catch(error => {
            //请求失败,显示提示出错
            console.log(url,error)
            message.error('请求出错了')
        })
    })
}
