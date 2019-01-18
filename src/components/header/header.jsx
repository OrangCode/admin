import React, {Component} from 'react';
import {Row,Col,Modal} from 'antd'
import {withRouter} from 'react-router-dom'

import {reqWeather} from '../../api'
import {formateDate} from  '../../utils/utils'
import MemoryUtils from '../../utils/MemoryUtils'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'

import './header.less'

class Header extends Component {
    state = {
        sysTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }
    //读取更新当前的时间，并更新到界面上
    getDate = () => {
        this.IntervalId = setInterval(() => {
            this.setState({
                sysTime:formateDate(Date.now())
            })
        },1000)
    }
    //获取天气信息
    getWeather = async () => {
        const {dayPictureUrl,weather} =await reqWeather('绛县')
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    //根据请求的path得到相应的标题
    getTitle = (path) => {
        let title
        menuList.forEach(menu => {
            if(menu.key === path){
                title = menu.title
            }else if(menu.children){
                menu.children.forEach(item => {
                    if(item.key === path){
                        title = item.title
                    }
                })
            }
        })
        return title
    }
    //退出登录
    exitLogin = () => {
        Modal.confirm({
                content: '您确定要退出吗???',
                onOk: () => {
                    console.log('OK');
                    //移出保存的用户数据
                    MemoryUtils.user = {}
                    storageUtils.removeUser()
                    //跳转到login
                    this.props.history.replace('/login')
                 },
                 onCancel(){
                    console.log('Cancel');
                  },
        })
    }


    componentDidMount(){
        this.getDate()
        this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.IntervalId)
    }
    render() {
        const {sysTime,weather,dayPictureUrl} = this.state
        //得到当前的用户
        const user = MemoryUtils.user
        // console.log(user);
        //得到path请求的路径
        const path = this.props.location.pathname
        //得到对应的标题
        const title = this.getTitle(path)
        return (
            <div className="header">
                <Row className='header-top'>
                    <span>欢迎：{user.username}</span>
                    <a href="javaScript:" onClick={this.exitLogin}>退出</a>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>{title}</Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{sysTime}</span>
                        <span className='weather-img'>
                            <img src={dayPictureUrl} alt="weather"/>
                        </span>
                        <span className='weather-detail'>{weather}</span>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default withRouter(Header)