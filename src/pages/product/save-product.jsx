import React, {Component} from 'react'
import {Icon,Form,Button,Input,Select} from 'antd'

import {reqGetCategorys} from '../../api'

const Option = Select.Option
const Item = Form.Item
/*
商品管理的更新/添加路由组件
 */
class SaveUpdateProduct extends Component {
  state = {
    categorys:[],//一级分类列表
    subCategorys:[]//二级分类列表
  }

  //获取一级分类列表
  getCategorys = async (parentId) => {
    const result = await reqGetCategorys(parentId)
    const categorys = result.data
    if(parentId === '0'){
      this.setState({
        categorys
      })
    }else {
      this.setState({
        subCategorys:categorys
      })
    }
  }

  //根据状态中的列表数组动态获取option
  renderOption = () => {
    const {categorys,subCategorys} = this.state
    const options = categorys.map( c => (
      <Option key={c._id} value={c._id}>{c.name}</Option>
    ))
    const subOptions = subCategorys.map( c => (
      <Option key={c._id} value={c._id}>{c.name}</Option>
    ))
    return {options,subOptions}
  }

  //重新获取显示二级列表
  showSubCategory = (parentId) => {
    const product = this.props.location.state || {}
    product.categoryId = ''
    this.getCategorys(parentId)
  }

  //
  submit = () => {
    const values = this.props.form.getFieldsValue()
  }

  componentDidMount(){
    this.getCategorys('0')
    //如果当前是更新，且商品所属分类是二级列表（parentId不为0），就需要去获取二级列表
    const product = this.props.location.state
    if(product && product.pCategoryId !== '0'){
      this.getCategorys(product.pCategoryId)
    }
  }

  render() {
    const {options,subOptions} = this.renderOption()
    const product = this.props.location.state || {}
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {labelCol: { span: 2 }, wrapperCol: { span: 8 },}
    let initValue1 = '未选择'
    let initValue2 = '未选择'
    if(product.pCategoryId === '0'){
      initValue1 = product.categoryId
    }else if(product.pCategoryId){
      initValue1 = product.pCategoryId
      initValue2 = product.categoryId || '未选择'
    }

    return (
        <div>
            <h2>
                <a href="javaScript:" onClick={()=>this.props.history.goBack()}>
                  <Icon type="arrow-left"/></a>
                &nbsp; &nbsp; &nbsp;
                {product._id ? '编辑商品' : '添加商品'}
            </h2>
            <Form >
                <Item label="商品名称" {...formItemLayout}>
                  {
                    getFieldDecorator('name',{
                        initialValue:product.name
                    })(
                      <Input placeholder="请输入商品名称"/>
                    )
                  }
                </Item>
                <Item label="商品描述" {...formItemLayout}>
                  {
                    getFieldDecorator('desc',{
                        initialValue:product.desc
                    })(
                      <Input placeholder="请输入商品描述"/>
                    )
                  }
                </Item>
                <Item label="商品价格" {...formItemLayout} wrapperCol={{span:4}}>
                  {
                    getFieldDecorator('price',{
                        initialValue:product.price
                  })(
                      <Input addonAfter="英磅"/>
                    )
                  }
                </Item>
                <Item label="商品分类" {...formItemLayout}>
                  {
                    options.length > 0 ?
                    getFieldDecorator('category1',{
                        initialValue:initValue1
                  })(
                      <Select style={{width:150}} onChange={value => this.showSubCategory(value)}>
                        {options}
                      </Select>
                    ) : null
                  }
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {
                    subOptions.length > 0 ?
                    getFieldDecorator('category2',{
                        initialValue:initValue2
                  })(
                      <Select style={{width:150}}>
                        {subOptions}
                      </Select>
                    ) : null
                  }
                </Item>
              <Item label="商品图片" {...formItemLayout}>
                图片
              </Item>
              <Item label="商品详情" {...formItemLayout}>
                富文本编辑器
              </Item>
                <Button type="primary" onClick={this.submit}>提交</Button>
            </Form>
        </div>
    )
  }
}
export default Form.create()(SaveUpdateProduct)