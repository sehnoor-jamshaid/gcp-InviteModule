import React,{ useState, useEffect } from 'react'
import { Switch,DatePicker, Space ,Form, Input, Button,Row, Col,Select} from 'antd';
import { Typography } from 'antd';
import moment from 'moment';
import EditorConvertToHTML from '../Extra/TextEditor';
import Preview from './Preview';
import { useHistory  } from "react-router-dom";
import axios from 'axios';
const { Option, OptGroup } = Select;




const style = {};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
function onChange1(checked) {
  console.log(`switch to ${checked}`);
}
const validateMessages = {
    required: 'Please input your ${label}!',
    types: {
        email: 'Enter a valid email!',

    }
};
const apiCallRequest = {
  // url: 'http://localhost:3000/inviteTestData/emailTemplate.json',
  url:'http://localhost:3000/mail/Alltemplate/1',
  data: {
    // data to be sent

  },
  config: {

  }
}
const onFinishFailed=(e)=>
{
console.log("Error",e)
}
const onFinish = (values) => {

    console.log("Success:", values);

}

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  
  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
//   const getval=(value)=>
//   {
// console.log("value","email body cust temp")
//   }
function Settings(props) {
    const history = useHistory();
    const Customized = (values) => {
        console.log('Success:', values);
        // props.updateInfo({name:'adminLogin',values:values});
        history.push('/invite/customizedtemplate');
      
      };
      
      const[templateName,setTemplateName]=useState("Rejection");
      const [switchon,setswitchon]=useState("false")
      const [inputFields,setInputFields]=useState(
       { email:'recruitment@grameenphone.co',
        emailSubj:templateName+" "+"Email" } 

      )
      console.log("Email subject",inputFields.emailSubj)
      const[template,setTemplate]=useState(`<pre><pre>Thank you for taking the time to consider , We wanted to let you know that we have chosen to move forward with a different candidate.If you do not have one,we  suggest that you create one now in advance<br><br>For any technical queries, please write to recruitment@grameenphone.co  and info@c-factor.live.<br><br>Best of Luck<br><br>GR HR</pre></pre>`);
      const [emailTemplate,setEmailTemplate]=useState();
    const inputEvent=(event)=>
    {    console.log("value",event.target.value)
        const{value,name}=event.target
        setInputFields((prev)=>
        { console.log("prevvalue",prev)
            return {...prev,
            [name]:value}
        })
    } 

    const saveButton=()=>
  {
  //   const apiVar =   {
  //     "active":true,
  //     "allow_direct_applications":false,
  //     "allow_invites_only":false,
  //     "campaignEmail":inputFields.email,
  //     "campaignUrl":null,
  //     "clientId":"abc",
  //     "createdAt":"2019-11-07T16:31:30.917Z",
  //     "_description":"This is a  GrameenPhone3 campaign!",
  //     "emailSubject": inputFields.emailSubj,
  //     "emailTemplate":template,
  //     "id":"adsdasd",
  //     "image_url":null,
  //     "name":"GrameenPhone3",
  //     "start_date":"Mon Jan 25 2021 14:30:00 GMT+0600 (Bangladesh Standard Time)",
  //     "startupComponentId":null,
  //     "state":"completed",
  //     "title":"GrameenPhone",
  //     "emailbodycust":props.emailbody,
  //     "updatedAt":"2021-02-22T07:16:29.359Z"
  //  }
   if(props.emailbody!=undefined)
  {console.log("emailbody cust",props.emailbody)}
   
    let req = {
      url:"http://localhost:3000/mail/",
      method: 'POST',
      data: {
        emailFrom:inputFields.email,
        subject:inputFields.emailSubj,
        type:templateName,
        emailBody:props.emailbody,
        campaignId:1,
        templateBody:template ,
        tempName:templateName ,
        },
    }

    {axios(req).then(r => console.log(r.data))
    .catch(e => console.log(e));
}
}
    const handleSubmit = (e) => {
        // e.preventDefault();
        alert("saved", inputFields)
        console.log(inputFields)

    }
    function onChange(date, dateString) {
        // console.log(date, dateString);
        // console.log("switchon now", switchon)
        setswitchon(!switchon)
        // console.log('after clicking switch',switchon)
      }
      const mailTemplate=(value,key)=>
      {
        console.log("value",key.key);
      setTemplateName(key.key);
      // console.log("template name dekhna ha",templateName);
      // console.log("email Template value",value)

      setTemplate(value);
      // if(template!=undefined)
      // {console.log("temp in state",template)}

      setInputFields(
        { email:'recruitment@grameenphone.co',
         emailSubj:key.key+" "+"Email" } 
 
       )

      }
      useEffect(() => {
        console.log("prop email body",props.emailbody)
        axios.get(apiCallRequest.url)
          .then(res => {
            console.log('EmailTemplate', res);
            const emailjson = res.data;
            if (emailjson[0] !== undefined)
              setEmailTemplate(emailjson)
    
    
          });
      }, [])
    return (
        <>
        <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 13 }}>
                    <div style={style} >
                     <div className="parent_cont">
                         <div className="item_switch">
                     <label>Add Client's Logo</label>
                     <Switch  onChange={onChange1}  />
                     </div>
                     <div className="item_switch">
                     <label>Add CampaignLogo</label>
                     <Switch  onChange={onChange1} />
                     </div>
                     </div>
                    </div>
             </Col>
             </Row>
             <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-2">
                <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 13 }}>
                    <div style={style}>
                     <label>Scheduler</label>
                     <Switch  onChange={onChange} className="ml-2" />
                     <div className="mt-3">
                     {(switchon==false)?<Space direction="horizontal">
                        <DatePicker
                           format="YYYY-MM-DD HH:mm:ss"
                           disabledDate={disabledDate}
                            disabledTime={disabledDateTime}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                         />
                     </Space>:null }
                     {/* <Button type="primary" htmlType="submit"className="button_setting mt-4" >
                          Schedule
                         </Button> */}
                     </div> 
                    { (emailTemplate!=undefined)?
                     <Select defaultValue="Rejection " style={{ width: "30%" }} className="mt-1" onChange={mailTemplate}>
                {emailTemplate.map((template, index) => (
                  <Option key={template.tempName} value={template.templateBody}>{template.tempName}</Option>
                ))}
                </Select> :<></>
               }
                    </div>
             </Col>
             </Row>
             <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
             <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 13 }}>
               <div style={style}>
                 
                    <Form {...layout} name="nest-messages" 
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                     validateMessages={validateMessages}>
                       <Form.Item name={['user', 'email']}  rules={[{ type: 'email' }] }>
                           <label>Campaign Email Address</label>
                           <Input placeholder="Enter Your Email" autoComplete="off" className="input_invite"
                            onChange={inputEvent}
                           name="email"
                           value={inputFields.email}
                           />
                       </Form.Item>
                       <br></br>
                       <Form.Item   rules={[{ type: 'text' }] }>
                           <label className="mt-3">Email Subject</label>
                           <Input  autoComplete="off" className="input_invite" placeholder="Email Subject" 
                           onChange={inputEvent}
                           name="emailSubj"
                           value={inputFields.emailSubj}
                           />
                       </Form.Item>
                    <div style={{marginTop:'60px'}}>
                           <p>You can include following tags in your email templates</p>
                           <p>#CampaignName</p>
                           {console.log("template props purpose",template)}
                        <EditorConvertToHTML  template={template} headerEmail={inputFields.email} subject={inputFields.emailSubj} />
                        </div>

                        <div className="parent_cont mt-3">
                       <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }} >
                         <Button type="primary" htmlType="submit" className="button_setting"onClick={saveButton} >
                        Save
                         </Button>
                   </Form.Item> 
                   <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
                         <Button type="primary"  className="button_setting" onClick={Customized}  >
                          Customized Template
                         </Button>
                        
                   </Form.Item> 
                   </div> 
                    </Form>

                </div>
           </Col>
           </Row>
            
        </div>
        </>
    )
}

export default Settings
