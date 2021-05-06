import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import './TextEditor.css';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import Settings from "../Components/Settings";
import Preview from '../Components/Preview'



class EditorConvertToHTML extends Component {

  constructor(props) {
    super(props);
    // this.onTextChange = this.onTextChange.bind(this);
    // this.onTextChange(this.props.template);
   
  }

  

 onEditorStateChange  = (editorState) => {
    this.setState({
      editorState,
    });
  };

onTextChange = (template) => {
    console.log("onTextChange", template);
    const html = template;
    const contentBlock = htmlToDraft(html);
 
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
      
    }
  }

  
  render() {
    console.log("TextEditor Template",this.props.template);
    this.onTextChange(this.props.template);
    const { editorState } = this.state;
    // const editorState = this.props.template
    // console.log("editorState", editorState.getCurrentContent());
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        
        {/* <textarea
          enabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
        <Preview textPreview={this.props.template} headerEmail={this.props.headerEmail} subject={this.props.subject}/>
      </div>
    );
  }
}
export default EditorConvertToHTML;