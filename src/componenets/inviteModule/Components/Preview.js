

import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import ReactHtmlParser from 'react-html-parser' ;
import '../candidates.css';



const Preview = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };




  return (
    <>
      <Button type="primary" onClick={showModal} className="button_setting mt-3">
        Preview
      </Button>
      <Modal className="modal_background" title="Preview" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  width={1000}  >
     <div className="email_body"><p><b>Email:</b>  {props.headerEmail}</p>
  <p><b>Email Subject:</b>   {props.subject}</p></div>   
  <p> 
    {ReactHtmlParser(props.textPreview)}</p>
  
        

      </Modal>
    </>
  );
};


export default Preview
