import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button,
    Table,
    Card,
    Icon,
    Modal,
    Select,
    Input,
    Form,
    message
} from 'antd'


import {reqGetCategorys,reqAddCategorys} from '../../api'


const Item = Form.Item
const Option = Select.Option


/*
分类管理路由组件
 */
export default class Category extends Component {
  state = {
      categorys:[],
      visible : false,
  }

  //获取一级分类列表
    getCategorys = async () => {
        const result = await reqGetCategorys('0')
        if(result.status === 0){
          const categorys = result.data
            this.setState({
                categorys
            })
        }
}
    //添加分类
    addCategoryList  = async () => {
        //获取到输入框value
        console.log(this.form.getFieldsValue());
       const {parentId,categoryName} = this.form.getFieldsValue()
      //提交添加分类的请求
         const result = await reqAddCategorys(parentId,categoryName)
         if(result.status === 0){
              message.success('添加成功')
             this.getCategorys()
          }
        this.setState({
            visible:false
        })
    }


  componentWillMount(){
      this.columns = [{
          title: '分类名称',
          dataIndex: 'name',
          // render: text => <a href="javascript:;">{text}</a>,
      }, {
          title: '操作',
          width:300,
          render:(category) => {
              return (
                  <span>
                  <a href="javaScript:">修改分类</a>
                    &nbsp;&nbsp;
                    <a href="javaScript:">查看子分类</a>
                </span>
              )
          }
      }]
  }
  componentDidMount(){
    this.getCategorys()
  }

  render() {
      const columns = this.columns
      const {categorys,visible} = this.state
    return (
      <div>
        <Card>
          <span style={{fontSize:20}}>一级分类列表</span>
          <Button style={{float:'right'}} type="primary" onClick={()=>this.setState({visible:true})}>
             <Icon type="plus"/>
               添加分类
          </Button>
        </Card>
        <Table
            columns={columns}
            dataSource={categorys}
            bordered
            rowKey='_id'
            pagination={{defaultPageSize:10,showQuickJumper:true,showSizeChanger:true}}
        />,
          <Modal
              title="添加分类"
              visible={visible}
              onCancel={()=>this.setState({ visible:false})}
              keyboard="true"
              centered
              onOk={this.addCategoryList}
          >
              <AddForm categorys={categorys} setForm={(form)=>this.form=form}/>
          </Modal>
      </div>
    )
  }
}

//添加分类的组件
class AddForm extends Component{
    static propTypes = {
        categorys:PropTypes.array.isRequired,
        setForm:PropTypes.func.isRequired
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render(){
        const {getFieldDecorator} = this.props.form
        const {categorys} = this.props
        return (
            <Form>
                <Item label="所属分类">
                    {
                        getFieldDecorator('parentId',{
                            initialValue: '0'
                        })(
                            <Select>
                                <Option key='0' value='0'>一级分类</Option>
                                {
                                    categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>
                <Item label="分类列表">
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: ''
                        })(
                            <Input placeholder='输入分类名称'/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
AddForm = Form.create()(AddForm)



