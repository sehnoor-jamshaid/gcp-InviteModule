import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios';
import {  Button} from 'antd';

import '../Extra/HtmlEditor/HtmlEditor.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

class CustomizedTemplate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: "",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Demystifying Email Design</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        
          <style type="text/css">
            a[x-apple-data-detectors] {color: inherit !important;}
          </style>
        
        </head>
        <body style="margin: 0; padding: 0;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 20px 0 30px 0;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
          <tr>
            <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0;">
              <img src="https://assets.codepen.io/210284/h1_1.gif" alt="Creating Email Magic." width="300" height="230" style="display: block;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                <tr>
                  <td style="color: #153643; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 24px; margin: 0;">Lorem ipsum dolor sit amet!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                    <p style="margin: 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                      <tr>
                        <td width="260" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                            <tr>
                              <td>
                                <img src="https://assets.codepen.io/210284/left_1.gif" alt="" width="100%" height="140" style="display: block;" />
                              </td>
                            </tr>
                            <tr>
                              <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 25px 0 0 0;">
                                <p style="margin: 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                        <td width="260" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                            <tr>
                              <td>
                                <img src="https://assets.codepen.io/210284/right_1.gif" alt="" width="100%" height="140" style="display: block;" />
                              </td>
                            </tr>
                            <tr>
                              <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 25px 0 0 0;">
                                <p style="margin: 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ee4c50" style="padding: 30px 30px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                <tr>
                  <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
                    <p style="margin: 0;">&reg; Someone, somewhere 2025<br/>
                   <a href="#" style="color: #ffffff;">Unsubscribe</a> to this newsletter instantly</p>
                  </td>
                  <td align="right">
                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                      <tr>
                        <td>
                          <a href="http://www.twitter.com/">
                            <img src="https://assets.codepen.io/210284/tw.gif" alt="Twitter." width="38" height="38" style="display: block;" border="0" />
                          </a>
                        </td>
                        <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                        <td>
                          <a href="http://www.twitter.com/">
                            <img src="https://assets.codepen.io/210284/fb.gif" alt="Facebook." width="38" height="38" style="display: block;" border="0" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
              </td>
            </tr>
          </table>
        </body>
        </html>`,
        css: "",
        js: "",
        
      };

      this.pusher = new Pusher("<your app key>", {
        cluster: "<your app cluster>",
        forceTLS: true
      });

      this.channel = this.pusher.subscribe("editor");
    }

    componentDidUpdate() {
      this.runCode();
    }

    componentDidMount() {
      this.props.sendData(this.state.html);
      this.setState({
        id: pushid()
      });

      this.channel.bind("code-update", data => {
        const { id } = this.state;
        if (data.id === id) return;

        this.setState({
          html: data.html,
          css: data.css,
          js: data.js,
        });
      });
    }

    syncUpdates = () => {
      const data = { ...this.state };

      axios
        .post("http://localhost:5000/update-editor", data)
        .catch(console.error);
    };

  runCode = () => {
    const { html, css, js } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}

        <script type="text/javascript">
          ${js}
        </script>
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };
  functionHandler = () => {

    
    
    }


  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: "material",
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true
    };


   
    {
    return (
        <div className="App">
           
          <section className="playground">
            <div className="code-editor html-code">
              <div className="editor-header">HTML</div>
              <CodeMirror
                value={html}
                options={{
                  mode: "htmlmixed",
                  ...codeMirrorOptions
                }}
                onBeforeChange={(editor, data, html) => {
                  this.setState({ html }, () => this.syncUpdates()); // update this line
                }}
              />
            </div>
            {/* <div className="code-editor css-code">
              <div className="editor-header">CSS</div>
              <CodeMirror
                value={css}
                options={{
                  mode: "css",
                  ...codeMirrorOptions
                }}
                onBeforeChange={(editor, data, css) => {
                  this.setState({ css }, () => this.syncUpdates()); // update this line
                }}
              />
            </div>
            <div className="code-editor js-code">
              <div className="editor-header">JavaScript</div>
              <CodeMirror
                value={js}
                options={{
                  mode: "javascript",
                  ...codeMirrorOptions
                }}
                onBeforeChange={(editor, data, js) => {
                  this.setState({ js }, () => this.syncUpdates()); // update this line
                }}
              />
            </div> */}
          </section>
          <section className="result">
            <iframe title="result" className="iframe" ref="iframe" />
          </section>
          <div className="text-left ml-3">
          <Button type="primary" htmlType="submit" className="mt-3" >
                  Save
              </Button>
          </div>
          
        </div>
      );
    }
    }
}

export default CustomizedTemplate;
