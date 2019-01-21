import React, {Component} from 'react'
import {Icon,List} from 'antd'

import {BASE_IMG_PATH} from '../../utils/constant'
import {reqCategoryId} from '../../api'
/*
 商品管理的详情路由组件
 */

const Item = List.Item

class Detail extends Component {
  state = {
    cName1 :'',
    cName2 :''
  }
  getCategoryName = async () => {
    const {categoryId, pCategoryId} = this.props.location.state
    if(pCategoryId === '0'){
      const result = await reqCategoryId(categoryId)
      const cName1 = result.data.name
      this.setState({
        cName1
      })
    }else {
      const result1 = await reqCategoryId(pCategoryId)
      const cName1 = result1.data.name
      const result2 = await reqCategoryId(categoryId)
      const cName2 = result2.data.name
      this.setState({
        cName1,
        cName2
      })
    }
  }
  componentDidMount (){
    this.getCategoryName()
  }
  render() {
    const {name, desc, price, imgs, detail} = this.props.location.state
    const {cName1,cName2} = this.state
    return (
      <div>
        <h2>
          <a href="javaScript:" onClick={()=>this.props.history.goBack()}>
            <Icon type="arrow-left"/>
          </a>
          &nbsp; &nbsp; &nbsp;
          商品详情
        </h2>
        <List bordered>
          <Item>
            <span>商品名称 ：</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span>商品描述 ：</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span>商品价格 ：</span>
            <span>{price + '英镑'}</span>
          </Item>
          <Item>
            <span>商品分类 ：</span>
            <span>{cName1 + '-->' + cName2}</span>
          </Item>
          <Item>
            <span>商品图片 ：</span>
            <span>
              {
                imgs.map(img => (
                  <img src={BASE_IMG_PATH + img} alt="img" key={img}
                  style={{width:150,height:150,marginRight:10}}/>
                ))
              }
            </span>
          </Item>
          <Item>
            <span>商品详情 ：</span>
            <div dangerouslySetInnerHTML={{__html:detail}}></div>
          </Item>
        </List>
      </div>
    )
  }
}
export default Detail