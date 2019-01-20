import React, {Component} from 'react'
import {Select,Input,Icon,Card,Button,Table} from 'antd'

import {reqProducts,reqSearchProducts} from '../../api'

const Option = Select.Option
/*
 商品管理的主路由界面
 */
class ProductIndex extends Component {
  state = {
    total:0,//商品的总数量
    products:[],//当前页的列表数据
    searchType:'productName',//搜索类型
    searchName:''//搜索关键字
  }

  //初始化生成所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title:'商品名称',
        dataIndex:'name'
      },
      {
        title:'商品描述',
        dataIndex:'desc'
      },
      {
        title:'价格',
        dataIndex:'price',
        render:(price)=> <span>￥{price}</span>
      },
      {
        title:'状态',
        dataIndex:'status',
        render:(status) => (
          <span>
            <Button>下架</Button>
            &nbsp;&nbsp;
            <span>在售</span>
          </span>
        )
      },
      {
        title:'操作',
        render:(product)=> (
          <span>
            <a href="javaScript:">详情</a>
            &nbsp;&nbsp;&nbsp;
            <a href="javaScript:" onClick={()=> this.props.history.push('/product/saveproduct',product)}>修改</a>
          </span>
        )
      }
    ]
  }

  //异步获取指定页的数据
  getProducts = async (pageNum) => {
    const {searchName,searchType} = this.state
    let result
    if(searchName){
      result = await reqSearchProducts({pageNum,pageSize:3,searchType,searchName})
    }else {
      result = await reqProducts(pageNum,3)
    }
    console.log('aaaaaaaaaa',result)
    if(result.status === 0){
      const {total,list} = result.data
      this.setState({
        total,
        products:list
      })
    }
  }

  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getProducts(1)
  }
  render() {
    const {products,total,searchType} = this.state
    return (
      <div>
        <Card>
          <Select value={searchType} onChange={value => this.setState({searchType:value})}>
            <Option key="productName" value='productName'>按名称搜索</Option>
            <Option key="productDesc" value='productDesc'>按描述搜索</Option>
          </Select>
          <Input placeholder="请输入关键字" style={{width:150,marginLeft:10,marginRight:10}}
              onChange={(e)=>this.setState({searchName:e.target.value})}/>
          <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
          <Button type="primary" style={{float:'right'}} onClick={()=> this.props.history.push('/product/saveproduct')}>
            <Icon type="plus"/>
            添加商品
          </Button>
        </Card>
        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          rowKey='_id'
          pagination = {{
            defaultPageSize:3,
            showQuickJumper:true,
            total,
            onChange:this.getProducts
          }}
        >
        </Table>
      </div>
    )
  }
}
export default ProductIndex