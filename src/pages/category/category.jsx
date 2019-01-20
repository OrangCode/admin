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


import {reqGetCategorys,reqAddCategorys,reqUpdateCategorys} from '../../api'


const Item = Form.Item
const Option = Select.Option


/*
分类管理路由组件
 */
export default class Category extends Component {
  state = {
      parentName:'',//父分类的名称
      parentId:'0',//显示当前分类的parentID
      categorys:[],//一级分类列表
      subCategorys : [],//某个二级分类列表
      visible : false,//是否显示添加框
      isShowUpdata:false//是否显示更新框
  }

     //获取一级/二级分类列表
    getCategorys = async (pId) => {
      const parentId = pId || this.state.parentId
        const result = await reqGetCategorys(parentId)
        if(result.status === 0){
          const categorys = result.data
            if(parentId === '0'){
                this.setState({//更新一级分类数组
                    categorys
                })
            }else {
                this.setState({//更新二级分类数组
                    subCategorys:categorys
                })
            }
        }
}

    //显示二级分类列表
    showSubCategorys = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name
        },()=>{//回调函数在状态更新之后立即执行
            this.getCategorys()
        })
    }

    //添加分类
    addCategoryList  = async () => {
        //获取到输入框value
       const {parentId,categoryName} = this.form.getFieldsValue()
      //提交添加分类的请求
         const result = await reqAddCategorys(parentId,categoryName)
         if(result.status === 0){
              message.success('添加成功')
             if(parentId === this.state.parentId || parentId === '0'){
                 this.getCategorys(parentId)
             }
          }
        this.setState({
            visible:false
        })
        this.form.resetFields()
    }

    //显示修改分类框
    ShowUpdataCategory = (category) => {
      this.category = category
        this.setState({
            isShowUpdata:true
        })
    }

    //更新分类
    updataCategoryList = async () =>  {
      //收集数据
        const categoryId = this.category._id
        const {categoryName} = this.form.getFieldsValue()
        //发送ajax请求
        const result = await reqUpdateCategorys({categoryId,categoryName})
        if(result.status === 0){
          message.success('更新成功')
          this.getCategorys()
        }
        this.setState({
            isShowUpdata:false
        })
        this.form.resetFields()
    }

    //回退到一级分类
    showOneCategory = () => {
      this.setState({
          parentName:'',
          parentId:'0',
          subCategorys : [],
      })
    }

  componentWillMount(){
      this.columns = [{
          title: '分类名称',
          dataIndex: 'name',
      }, {
          title: '操作',
          width:300,
          render:(category) => {
              return (
                  <span>
                  <a href="javaScript:" onClick={()=>this.ShowUpdataCategory(category)}>修改分类</a>
                    &nbsp;&nbsp;
                    <a href="javaScript:" onClick={()=>this.showSubCategorys(category)}>查看子分类</a>
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
      const {categorys,visible,isShowUpdata,subCategorys,parentId,parentName} = this.state
      const category = this.category || {}
    return (
      <div>
        <Card>
            {
                parentId ==='0'
                    ? <span style={{fontSize:20}}>一级分类列表</span>
                    : (
                    <span>
                        <a href="javaScript:" onClick={()=>this.showOneCategory()}>一级分类</a>
                        &nbsp;&nbsp;&nbsp;
                        <Icon type="arrow-right"/>
                        &nbsp;&nbsp;&nbsp;
                        <span>{parentName}</span>
                    </span>
                    )
            }
          <Button style={{float:'right'}} type="primary" onClick={()=>this.setState({visible:true})}>
             <Icon type="plus"/>
               添加分类
          </Button>
        </Card>
        <Table
            columns={columns}
            dataSource={parentId==='0'? categorys:subCategorys}
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
              <AddForm categorys={categorys} parentId={parentId} setForm={(form)=>this.form=form}/>
          </Modal>,
        <Modal
              title="更新分类"
              visible={isShowUpdata}
              onCancel={()=>this.setState({ isShowUpdata:false})}
              keyboard="true"
              centered
              onOk={this.updataCategoryList}
          >
              <UpdataForm categoryName={category.name} setForm={(form)=>this.form=form}/>
          </Modal>
      </div>
    )
  }
}

//添加分类的组件
class AddForm extends Component{
    static propTypes = {
        categorys:PropTypes.array.isRequired,
        setForm:PropTypes.func.isRequired,
        parentId:PropTypes.string.isRequired
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render(){
        const {getFieldDecorator} = this.props.form
        const {categorys,parentId} = this.props
        return (
            <Form>
                <Item label="所属分类">
                    {
                        getFieldDecorator('parentId',{
                            initialValue: parentId
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

//更新分类的组件
class UpdataForm extends Component{
    static propTypes = {
        categoryName:PropTypes.string,
        setForm:PropTypes.func.isRequired
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render(){
        const {getFieldDecorator} = this.props.form
        const {categoryName} = this.props
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: categoryName
                        })(<Input/> )
                    }
                </Item>
            </Form>
        )
    }
}
UpdataForm = Form.create()(UpdataForm)

