import React, { useState } from 'react';
import { Row, Col, Tag, Space,Table } from 'antd';
import InvitedUserTable from './InvitedUserTable';
import { Input,DatePicker,Button } from 'antd';
import { Select } from 'antd';
import ApexChart from './Chart'
const { Option } = Select;
const { Search } = Input;
const { Column, ColumnGroup } = Table;
const style = {  };

function onChange(date, dateString) {
    console.log(date, dateString);
  }



function InvitedUsers() {
const[graphDataSelected,setGraphDataSelected]=useState("weekly");
const[data,setData]=useState([]);
const[runtimedata,setRuntimeData]=useState([]);
const [date,setDate]=useState(new Date().toDateString());

const onChangesearch = e =>{

};
const graphData=(value)=>
{
  console.log('option clicked for graph data',value)
  setGraphDataSelected(value);
const currDate=new Date();
console.log('currdate',currDate)
//for month
const prior = new Date().setDate(currDate.getDate() - 30);
const monthData=new Date(prior).toDateString();
console.log(monthData)
//for week
const priorweek = new Date().setDate(currDate.getDate() - 7);
const weekData=new Date(priorweek).toDateString();
console.log(weekData)
//for day
const priorday = new Date().setDate(currDate.getDate() - 1);
const dayData=new Date(priorday).toDateString();
console.log(dayData)

if(value=="weekly")
{
  setData(value);
  console.log("date today",currDate);
  console.log("Last date of week",weekData);
  setRuntimeData(weekData)
}
else if(value=="daily")
{
  setData(value);
  console.log("date today",currDate);
  console.log("Last date of week",dayData);
  setRuntimeData(dayData)
}
else if(value=="monthly")
{
  setData(value);
  console.log("date today",currDate);
  console.log("Last date of week",monthData);
  setRuntimeData(monthData)
}

}

    return (

       <>
       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 18 }} >
            <div  className="parent_cont">
          <Select placeholder="Select Data type" style={{ width: "30%" }} value={graphDataSelected} onChange={graphData} value={data} className="select_invite">
              <Option value="weekly">7 Days</Option>
              <Option value="daily">1 Day</Option>
              <Option value="monthly">30 Days</Option>
            </Select>
    <p className="date_graph">{runtimedata}<span>&nbsp;-&nbsp;</span>{date}</p>
    </div>
       </Col>
       </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 18 }} >
       <ApexChart startDate={date} runtimedate={runtimedata}/>
       </Col>
       </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 18 }} className="mx-auto">
          <Col xs={{ span: 24 }} lg={{ span: 4}}>
            
               <Search
                placeholder="input search text"
                allowClear
                onChange={onChangesearch}
                style={{width:"100%"}}
              /> 
            
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 4}}>
            
              <Select defaultValue="Status" style={{width:"100%"}}>
                <Option>Total Invites</Option>
                <Option>Bounces</Option>
                <Option>Unsubscribers</Option>
                <Option>Unopened</Option>
              </Select>
          </Col>
          <Col  xs={{ span: 24}} lg={{ span: 4}}>
            
              <Space direction="horizontal" >
                <DatePicker  onChange={onChange} style={{width:"100%"} }/>
              </Space>
           
          </Col>
          <Col  xs={{ span:24 }} lg={{ span: 4}}>
            
              <Button type="primary" htmlType="submit" className="button_setting" style={{width:"100%"}} >
                Search
            </Button>
            
          </Col>
        </Row>

        <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 18 }} >
            <div style={style}>
               {/* {
                invites.filter((val,key)=>
                  {if(searchval=="")
                  return val
                  else if (val.email.toLowerCase().includes(searchval.toLowerCase()))
                  {return val}
                  }).map((val,key)=>
                  {
                    return(
                    <p key={key}>{val.email}</p>
                    )
                  })
                  
              }   */}
              {/* <Table dataSource={invites} className="table_res">
                  
                   <Column title="Email" dataIndex="email" key="1" >
                      
                      </Column>
             
                
                <Column title="Send Date" dataIndex="createdAt" key="1" />
                <Column title="Status" dataIndex="status" key="1" />
                <Column
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <Space size="middle">
                      <a>Invite {record.lastName}</a>

                    </Space>
                  )}
                />
                  </Table> */}
              <InvitedUserTable />
             </div>
             </Col>
             </Row>
        </>
      );
}

export default InvitedUsers
