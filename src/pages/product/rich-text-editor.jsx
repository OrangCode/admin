import React, { Component } from 'react'
import { EditorState, convertToRaw ,ContentState} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import PropsTypes from 'prop-types'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './rich.less'


/*
用来指定商品详细信息的富文本编辑器
 */
class RichTextEditor extends Component {
  static propTypes = {
    rich : PropsTypes.string
  }
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }
  componentWillMount(){
    const rich = this.props.rich
    if(rich){
      const blocksFromHtml = htmlToDraft(rich)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorState = EditorState.createWithContent(contentState)
      this.state.editorState = editorState
    }
  }

  /*
  获取得到的富文本数据
   */
  getContent = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }
  render() {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    )
  }
}
export default RichTextEditor

