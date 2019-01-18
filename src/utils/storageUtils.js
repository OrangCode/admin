/**
 * 封装一些用于保存数据的工具函数
 * 保存
 * 读取
 * 删除
 */
import store from 'store'
import {message} from "antd"
//保存数据
function setItem(name,value) {
    if( value && typeof value !== 'function'){
        store.set(name,value)
    }else {
        message.error('不支持此数据类型的储存')
    }
}
//读取数据
function getItem(name) {
    return store.get(name)
}
//删除数据
function removeItem(name) {
    store.remove(name)
}
export default {
    saveUser(user){
        setItem('user-key',user)
    },
    getUser(){
        return getItem('user-key')
    },
    removeUser(){
        removeItem('user-key')
    }
}