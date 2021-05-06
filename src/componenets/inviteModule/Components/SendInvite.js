import React, { useState, useEffect } from 'react'
import { Form, Input, InputNumber, Button, Upload, message, Progress, Row, Col, Radio, Select,Table } from 'antd';
import EmailTable from './SendEmailTable';
import { useHistory  } from "react-router-dom";
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined, SettingOutlined, AreaChartOutlined, SendOutlined, MailOutlined, BarChartOutlined, PieChartOutlined, DotChartOutlined, LineChartOutlined, RadarChartOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '../candidates.css';
import axios from 'axios';
import $ from 'jquery';
import { parse } from 'papaparse'
const { Title } = Typography;
const style = { padding: '8px 0' };
const { Option, OptGroup } = Select;
const { TabPane } = Tabs;

const apiCallRequest = {
  // url: 'http://localhost:3000/inviteTestData/emailTemplate.json',
  url: 'http://localhost:3000/mail/Alltemplate/2',

  config: {

  }
}
const apiCallRequest1 = {
  url: 'http://localhost:3000/inviteTestData/listCampaigns.json',
  data: {
    // data to be sent

  },
  config: {

  }
}
// const baseUrl="http://192.168.18.30:3000"

// const access_token = localStorage.getItem('login');

// const apiCallRequest1 = {
//   url: baseUrl+'/gcp/getInviteListCompanies/${comp}${campaignName}${userType}',
//   data: {
//       // data to be sent
     
//   },
//   config: {
//     headers: {
//         Authorization: `Bearer ${access_token}`
//     }
// }
// }
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: percent => `${parseFloat(percent.toFixed(2))}%`,
  },
};


function callback(key) {
  console.log(key);
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: 'Please input your ${label}!',
  types: {
    email: 'Enter a valid email!',

  }
};
const onFinish = () => {
alert("Email succcessfully send") 
}
function handleChange(value) {
  console.log(`selected ${value}`);
}
const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstname',
    key: 'name',
  },
  {
    title: 'Last name',
    dataIndex: 'lastname',
    key: 'lastname',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
];
function SendInvite(props) {


  let [listCompanies, setlistCompanies] = React.useState();
  const [Details, setDetails] = useState();
  const [campaign, setCampaigns] = React.useState('');
  const [campaignName, setCampaignName] = React.useState('');
  const [userEmailsData, setUserEmailsData] = useState([]);
 const[emailSubject,setSubject]=useState();

  const [value, setValue] = React.useState(0);
  const [email, setemail] = useState('')
  const [emailtemp, setemailtemp] = useState([]);
  const [comp, setcomp] = useState();
  const [userstype, setusersType] = useState();

  const usersSelector=(val)=>
{ console.log(val,'userstype')
  setusersType(val)
  console.log("type of user",userstype)
}

const sendEmail=()=>
{
  console.log("email",email);
  console.log('emailtemp', emailtemp)
  console.log("subject of email",emailSubject)
 
  

  const sesEmail = {
    url: 'http://localhost:3000/invitedb/emailTest/',
    method: 'POST',
    data: {
      // data to be sent
      emailId:email,
      templateBody:emailtemp[0].templateBody,
      emailSubject:emailSubject,
      campaignId:2,
    
    },
    config: {
  
    }
  }
  {axios(sesEmail).then(r => {console.log(r.data)
    console.log(r.message)
})
    .catch(e => 
      {console.log(e)
        console.log(e.error)}
    );
}

}
  useEffect(() => {

    axios.get(apiCallRequest.url)
      .then(res => {
        console.log('EmailTemplate', res);
        const emailjson = res.data;
        
        if (emailjson[0] !== undefined)
          setemailtemp(emailjson)
          setSubject(emailjson[0].subject)
          console.log("subject of axio",emailSubject)

      });
    axios.get(apiCallRequest1.url)
      .then(res => {
        console.log('Axios API Call Result listCampaign', res);

        // if(res.data.length !== undefined)
        // setCampaigns(listCompanies)
        listCompanies = res.data;
        setlistCompanies(listCompanies);
        setCampaigns(listCompanies[0].campaigns);
        // setCampaignName(listCompanies[0].campaigns[0].name);
        //  console.log("campaignData",listCompanies)

      })

  }, [])



  const handleCompanychange = (cmompanyName, e) => {
    // debugger
    console.log('cmompanyName', cmompanyName);
    setcomp(cmompanyName);
    console.log(comp)
    let campaignList = listCompanies.filter(listCompanies => listCompanies.title == cmompanyName)[0].campaigns;
    console.log('campaign list', campaignList);
    console.log('campaign list', campaignList[1].id);
console.log("campaign name",campaignName)
    setCampaigns(listCompanies[0].campaigns);
    // setCampaignName(Campaigns.name[value][0]);
  };


  const onSecondCamChange = value => {
    setCampaignName(value);
    console.log("campaign name",campaignName)
  };
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const searchData = (val) => {
    console.log('val', val.target);
    console.log('companyName', comp);
    console.log(' campaign ', campaignName);
    console.log(' User Type ', userstype);
    
    const apiUsers = {
      url: 'http://localhost:3000/inviteTestData/data.json',
      data: {
        // data to be sent

      },
      config: {

      }
    }

    axios.get(apiUsers.url)
      .then(res => {

        const dataTable = res.data.userCampaigns;
        console.log('dataTable', dataTable);
        if (dataTable !== undefined)
          setUserEmailsData(dataTable);


        console.log('userDataTable', userEmailsData)
      })


  }

  // const DropFile=e=>{
  //   // debugger;
  //   // e.preventDefault();
  //   console.log("in function", e)
  //   console.log("in function", e.data)
  // { 
  //   // if(e.target.files!=undefined)
  //   //  {
  //     //  console.log("Dummy json data jo dekhna ha",e.target.files) 
  // //      Array.from(e.target.files).filter((file)=>file.type=== "text/csv").forEach(async(file)=>{
  // //       console.log("in array file")   
  // //  const text=await file.text();
  // //  const result=parse(text,{header:true});
  // //  setDetails(prev=>[...prev,...result.data])
  // //   })
  // }
  // //   else
  // //   {console.log('error')}
  // // }

  // }
  const history = useHistory();
  const uploadCsv=()=>
  {
    // history.push('/CustomizedTemplate');
    alert("Email Send Successfully")
  }

  return (

    <div>
     

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <Radio.Group name="radiogroup" onChange={onChange} value={value}>
              <Radio value={1} name="single"  >Single Invite</Radio>
              <br></br>
              <Radio value={2} name="bulk"  >Bulk Invite</Radio>
              <br></br>
              <Radio value={3} name="campaign"  >Campaign</Radio>
                console.log(val);
            </Radio.Group>
            {((value == 1) || (value == 2) || (value == 3)) ? <div>
              <Select defaultValue="Rejection " style={{ width: "30%" }} className="mt-3">
                {emailtemp.map((template, index) => (
                  <Option value={template.templateBody} >{template.tempName}{template.tempId}</Option>

                ))}
              </Select>
            </div> : null}
          </div>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          {(value == 1) ? <div style={style}>
            <Title level={4}>Single Invite</Title>

            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>


              <Form.Item name={['user', 'email']} rules={[{ type: 'email' }]}>
                <Input placeholder="Enter Your Email" autoComplete="off" className="input_invite" value={email}
                  onChange={e => setemail(e.target.value)} />
              </Form.Item>
              
                {/* <Button type="primary" htmlType="submit" className="mt-3">
                  Send Invite
              </Button> */}
              
            </Form>
          </div> : null}
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          {(value == 2) ? <div style={style}>
            <Title level={4}>Bulk Email</Title>
            <div>
              <Upload className="inline-row" {...props} accept=".csv" beforeUpload=
                {file => {
                  const reader = new FileReader();

                  reader.onload = e => {
                    // console.log("printing details before", Details.data)
                    
                   { console.log(e.target.result);
                    const text = e.target.result;
                    const json = parse(text, { header: true });
                    console.log("jsonn", json.data)
                    setDetails(json.data);
                    console.log("printing details", Details)}
                   
                  }
                 
                  reader.readAsText(file);

                  // Prevent upload
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>

              <span className="inline-row">CSV Format Allowed</span>
            </div>
            <Table columns={columns} dataSource={Details} />
            {/* <Button type="primary" htmlType="submit" className="mt-3" onClick={uploadCsv}>
              Send Invite
           </Button> */}
          

          </div> : null}
          
        </Col>
       

      </Row>
      {(value == 3) ? <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {(listCompanies != undefined) ?
            <>
              <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 4 }}>
                <Select style={{ width: "100%" }} placeholder="Select Company" onChange={handleCompanychange}>
                  {listCompanies.map(company => (
                    <Option key={company.title} value={company.title} id={company.id}>{company.title}{console.log('id of comp', value)}</Option>

                  ))}
                </Select>
              </Col>
              <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 4 }}>
                {(comp !== undefined) ? <Select style={{ width: "100%" }} placeholder="Select Campaign" onChange={onSecondCamChange}>
                  {campaign.map(campaign => (
                    <Option key={campaign.name} value={campaign.name}>{campaign.name}</Option>
                  ))}
                </Select> : <Select style={{ width: "100%" }} placeholder="Select Campaign" onChange={onSecondCamChange} disabled>
                    {campaign.map(campaign => (
                      <Option key={campaign.name} value={campaign.name}>{campaign.name}</Option>
                    ))}
                  </Select>}
              </Col></>
            : <></>
          }
          <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 4 }}>
            {((campaignName!= "")&&(comp!="undefined")) ?
            <Select placeholder="Select User type" style={{ width: "100%" }} onChange={usersSelector} value={userstype} >
              <Option value="allregisterusers">All Register Users</Option>
              <Option value="inprogressusers">Inprogress Users</Option>
              <Option value="completedusers">Completed Users</Option>
              <Option value="register">Register </Option>
            </Select>:
            <Select placeholder="Select User type" style={{ width: "100%" }} disabled>
            <Option value="all_register_users">All Register Users</Option>
            <Option value="inprogress_users">Inprogress Users</Option>
            <Option value="completed_users">Completed Users</Option>
            <Option value="register">Register </Option>
          </Select>}
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 4 }}>

            {((campaignName!= "")&&(comp!=undefined)&&(userstype!=undefined)) ?
              <Button type="primary" htmlType="submit" className="button_setting" style={{ width: "100%" }} onClick={searchData} >Search</Button>
              : <Button type="primary" htmlType="submit" className="button_setting" style={{ width: "100%" }} onClick={searchData} disabled>Search</Button>}

          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 18 }}>
            <EmailTable
              userEmailsData={userEmailsData} />
          </Col>
        </Row>
      </div> : null}
      {((value === 1 ) || (value === 2))? <Button type="primary" htmlType="submit" style={{marginTop:'-20px'}} onClick={sendEmail}>
              Send Invite
           </Button>:null}
    </div>
  )
}

export default SendInvite
