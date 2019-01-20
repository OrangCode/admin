import { Upload, Icon, Modal ,message} from 'antd';
import React from 'react'

import {reqDeleteImg} from '../../api'

import PropTypes from 'prop-types'
//管理商品图片的组件（上传图片和删除图片）
export default class PicturesWall extends React.Component {
  static propTypes = {
    imgs:PropTypes.array
  }
  state = {
    previewVisible: false,//是否显示大图的预览
    previewImage: '',
    fileList:[]//包含所有已上传图片信息对象的数组
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }


  /*
  得到当前已上传的图片文件名的数组
   */
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  /*
  file : 当前操作文件信息对象
  fileList : 所有文件信息对象的数组
   */
  handleChange = async ({file, fileList }) => {
    //如果图片上传成功
    if(file.status === 'done'){
      const result = file.response
      if(result.status === 0){
        message.success('上传图片成功')
        const {name,url} = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      }else {
        message.error('上传图片失败')
      }
    }else if(file.status === 'removed'){   //删除图片
      const result = await reqDeleteImg(file.name)
      if(result.status === 0){
        message.success('删除图片成功')
      }else {
        message.error('删除图片失败')
      }
    }
    this.setState({fileList})
  }
  componentWillMount(){
    //如果有imgs，那就生成一个对应的fileList，并更新fileList
    const imgs = this.props.imgs
    if(imgs && imgs.length > 0){
      const fileList = imgs.map( (img,index) => ({
        uid: -index,
        name: img,
        status: 'done',
        url: 'http://localhost:5000/upload/' + img,
      }))
      this.state.fileList = fileList
    }
  }

  render(){
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          accept='image/*'
          name='image'
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
