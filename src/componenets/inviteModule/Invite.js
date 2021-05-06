import React,{useEffect}  from 'react'
import InvitedUsers from './Components/InvitedUsers';
 import SendInvite from './Components/SendInvite';
import Settings from './Components/Settings';
import './candidates.css';
import { Tabs } from 'antd';
import {  SettingOutlined, SendOutlined, MailOutlined } from '@ant-design/icons';
import cDashboardBg from '../../assets/backgroundImages/cDashboardBg.png';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
    localStorage.setItem('defaultInvite',key);
}   

// const emailTemplate = "<pre>Please note that you will need to have a Linkedln account in order to complete the registration process.If you do not have one,we  suggest that you create one now in advance<br><br>For any technical queries, please write to recruitment@grameenphone.co  and info@c-factor.live.<br><br>Best of Luck<br><br>GR HR</pre>";

function Invite(props) {
    useEffect(() => {
        props.changeBgImage(cDashboardBg);
      },[props.bgImage]);
    
    return (
        <div id="invite-container">

            <Tabs  defaultActiveKey={localStorage.getItem('defaultInvite')||'invitedUsers'} onChange={callback}>
                <TabPane 
                    tab={
                        <span>
                            <MailOutlined />
                            Invited Users
                        </span>
                    }
                    key="invitedUsers"
                >
                    <InvitedUsers />
                </TabPane>
                
                <TabPane
                     tab={
                        <span>
                          <SendOutlined />
                          Send Invite
                        </span>
                    }
                    key="SendInvite"
                >
                    <SendInvite />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                          <SettingOutlined/>Settings
                        </span>
                    }
                    key="settings"
                >
                    <Settings  />
                </TabPane>

            </Tabs>
        </div>
    )
}

export default Invite;
