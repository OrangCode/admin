import React, {Component} from 'react';
import {Menu,Icon} from 'antd'
import {NavLink,withRouter} from 'react-router-dom'

import menuList from '../../config/menuConfig'

import './left-nav.less'
import logo from '../../assets/image/logo.png'

const {SubMenu,Item} = Menu
class LeftNav extends Component {
    //递归遍历menuList
    getNodes = (list) => {
        return list.reduce((pre,item) => {
            if(item.children){
                const subMenu = (
                    <SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
                        {
                            this.getNodes(item.children)
                        }
                    </SubMenu>
                )
                pre.push(subMenu)
                const path = this.props.location.pathname
                const oItem = item.children.find((child => child.key === path))
                if(oItem){this.openKey = item.key}
            }else {
                const menuItem = (
                    <Item key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon}/> {item.title}
                        </NavLink>
                    </Item>
                )
                pre.push(menuItem)
            }
            return pre
        },[])
    }

    //在第一次render之前调用
    componentWillMount() {
        this.menuNodes = this.getNodes(menuList)
    }
    render() {
        //当前请求的路径
        const path = this.props.location.pathname
        return (
            <div className="left-nav">
                <NavLink to="/home" className='logo'>
                    <img src={logo} alt="logo"/>
                    <h1>大马猴后台应用</h1>
                </NavLink>
                <Menu mode="inline" theme="dark" defaultSelectedKeys={[path]} defaultOpenKeys={[this.openKey]}>
                    {this.menuNodes}
                </Menu>
            </div>
        );
    }
}
//将一个非路由组件包装成一个路由组件，向非路由组件传递路由组件才有的三个属性
//history：实现路由跳转的
//location : 可以从中获取到请求路径
//match： 可以获取到请求参数
export default withRouter(LeftNav);


