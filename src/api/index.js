/**
 * 包含n个借口请求函数的模块
 * 对ajax进行进一步封装，让发请求的代码更加简洁
 */

import  ajax from './ajax'
import jsonp from 'jsonp'

//登录
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user) => ajax('http://localhost:5000/manage/category/list',{user},'POST')
//根据分类ID，获取分类对象
export const reqCategoryId = (categoryId) => ajax('/manage/category/info',{categoryId})
//获取一级，二级的分类列表
export const reqGetCategorys = (parentId) => ajax('/manage/category/list',{parentId})
//添加分类
export const reqAddCategorys = (parentId,categoryName) => ajax('/manage/category/add',{parentId,categoryName},'POST')
//更新分类
export const reqUpdateCategorys = ({categoryId,categoryName}) => ajax('/manage/category/update',{categoryId,categoryName},'POST')
//获取指定页的商品列表
export const reqProducts = (pageNum,pageSize) => ajax('/manage/product/list',{pageNum,pageSize})
//添加或者更新商品
export const reqAddOrUpdateCategorys = (product) => ajax('/manage/product/' + (product._id ? 'update' : 'add'),product,'POST')
//搜索商品分页列表
export const reqSearchProducts = ({pageNum,pageSize,searchType,searchName}) => ajax('/manage/product/search',{
  pageNum,
  pageSize,
  [searchType]:searchName
})
//请求获取天气的信息
export function reqWeather(city) {
    return new Promise(function (resolve,reject) {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,(error,data) => {
            if(!error){
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            }else {
                alert('天气请求出错了')
            }
        })
    })
}
//删除图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete',{name},'POST')
//上架下架(更新商品管理）
export const reqUpdataproduct = (productId,status) => ajax('/manage/product/updateStatus',{productId,status},'POST')