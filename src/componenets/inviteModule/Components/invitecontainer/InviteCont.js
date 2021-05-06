import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Components
import Invite from '../../Invite';
import 'antd/dist/antd.css';  
import SendInvite from '../SendInvite';
import InvitedUsers from '../InvitedUsers';
import Settings from '../Settings';

import CustomizedTemplate from '../CustomizedTemplate'


class InviteContainer extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.state=
        {
            childval:"heyy"
        }
    }

    handleChange(event) {
       
    }
    getData(val){
        // do not forget to bind getData in constructor
        console.log(val,"cust temp value in parent");
        this.setState({childval:val });
        console.log(this.state.childval,"state ");
    }
    
    render() {
        console.log("bgImage");
        return (
            <div id="formContainer">
            {/* <div> */}
            <Router>
                <Switch>
                    <Route exact path="/invite">
                        <Invite 
                             changeBgImage={this.props.changeBgImage}
                             bgImage={this.props.bgImage}
                        />
                    </Route>
                    <Route exact path="/invite/SendInvite">
                        <SendInvite 
                            changeBgImage={this.props.changeBgImage}
                             bgImage={this.props.bgImage}
                        />
                        component={SendInvite}
                    </Route>
                    <Route exact path="/invite/InvitedUsers">
                        <InvitedUsers 
                            changeBgImage={this.props.changeBgImage}
                             bgImage={this.props.bgImage}
                        />
                    </Route>
                    <Route exact path="/invite/Settings">
                        <Settings 
                            changeBgImage={this.props.changeBgImage}
                             bgImage={this.props.bgImage}
                             emailbody={this.state.childval}
                        />
                    </Route>
                    <Route exact path="/invite/customizedtemplate">
                        <CustomizedTemplate 
                            changeBgImage={this.props.changeBgImage}
                             bgImage={this.props.bgImage}
                             sendData={this.getData}
                        />
                    </Route>
                
                </Switch>
            </Router>
            </div>
        );
    }
}


export default InviteContainer;