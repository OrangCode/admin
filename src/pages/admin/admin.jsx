/**
 * 后台管理主路由组件
 * */
import React, { Component } from 'react';
import {Col,Row} from 'antd'
import {Redirect,Switch,Route} from 'react-router-dom'

import MemoryUtils from '../../utils/MemoryUtils'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import LeftNav from '../../components/left-nav/leftNav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


import './admin.less'

class Admin extends Component {

    render () {
        //检查用户是否已经登录，如果还没有，自动切换到登录页面
        const user = MemoryUtils.user
        if(!user || !user._id) {
            // this.props.history.replace('/login')  // 用在事件回调函数中
            // return <Redirect to='/login'/>
        }
        return (
            <Row className='container'>
              <Col span={4}>
                <LeftNav/>
              </Col>
              <Col span={20} className='main'>
                <Header/>
                <div className='content'>
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/product' component={Product}/>
                        <Route path='/user' component={User}/>
                        <Route path='/role' component={Role}/>
                        <Route path='/bar' component={Bar}/>
                        <Route path='/line' component={Line}/>
                        <Route path='/pie' component={Pie}/>
                        <Redirect to='/home'/>
                    </Switch>
                </div>
                <Footer/>
              </Col>
            </Row>
        )
    }
}
export default Admin