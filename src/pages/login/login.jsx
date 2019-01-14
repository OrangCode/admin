/*
* 用户登录的路由组件
* */
import React, { Component } from 'react';
import {Button,Icon,Input,Form} from 'antd'

import './login.less'
import logo from '../../assets/image/logo.png'



export class Login extends Component {
  render () {
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="大马猴后台管理"/>
          React大马猴项目: 后台管理系统
        </div>
        <div className="login-content">
          <div className="login-box">
            <div className="title">用户登录</div>
            <LoginForm/>
          </div>
        </div>
      </div>
    );
  }
}
class LoginForm extends Component{
  checkPassword = (rule,value,callback) => {
    if(!value){
      callback('请输入密码')
    }else if(value.length < 4 || value.length > 8){
      callback('密码必须是4到8位')
    }else {
      callback()//如果不传入参数就代表成功
    }
}
  clickLogin = () => {
    //只有当验证没有错误时才输出输入的数据
    this.props.form.validateFields((error,values) => {
      if(!error){
        console.log('收集表单数据',values)
      }else {
        this.props.form.resetFields()//重置所有输入框
      }
    })
    const username = this.props.form.getFieldValue('username')
  }
  render(){
    const Item = Form.Item
    const {getFieldDecorator} = this.props.form
    // this.props.form.getFieldValue('username')
    return (
      <Form className="login-form">
        <Item>
          {
            getFieldDecorator('username',{
              rules: [
                //声明式验证配置
                { type:'string', required: true, message: '请输入用户名!' },
                {min:4 , message: '长度不能小于4位!' }
                ]
            })(
              <Input placeholder="请输入用户名" prefix={<Icon type="user"/>}/>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator('password',{
              rules: [
                //半编程式验证
                {validator:this.checkPassword}
              ]
            })(
              <Input type="password" placeholder="请输入密码" prefix={<Icon type="lock"/>}/>
            )
          }
        </Item>
        <Item>
          <Button type='primary' className='login-form-button' onClick={this.clickLogin}>登录</Button>
        </Item>
      </Form>
    )
  }
}
//包装包含<Form>的组件，生成一个新的组件（包装组件）
//包装组件会向被包装组件传递一个属性
LoginForm = Form.create()(LoginForm)
export default Login;