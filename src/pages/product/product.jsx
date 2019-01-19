import React, {Component} from 'react'
import {Switch,Redirect,Route} from 'react-router-dom'

import Detail from './detail'
import SaveUpdateProduct from './save-product'
import ProductIndex from './productindex'
/*
管理的商品管理路由组件
 */
export default class Product extends Component {
  render() {
    return (
        <Switch>
          <Route path='/product/detail' component={Detail}/>
          <Route path='/product/saveproduct' component={SaveUpdateProduct}/>
          <Route path='/product/productindex' component={ProductIndex}/>
          <Redirect to='/product/productindex'/>
        </Switch>
    )
  }
}