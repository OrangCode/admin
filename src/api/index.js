/**
 * 包含n个借口请求函数的模块
 * 对ajax进行进一步封装，让发请求的代码更加简洁
 */

import  ajax from './ajax'

//登录
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add',{user},'POST')