/*
* 入口文件
* */
import React from 'react'
import {render} from 'react-dom'


import storageUtils from './utils/storageUtils'
import MemoryUtils from './utils/MemoryUtils'


import App from './App'

//读取local中的user，如果存在，就保存在内存中
const user = storageUtils.getUser()
if(user && user._id){
    MemoryUtils.user = user
}

render(<App/>,document.getElementById('root'))