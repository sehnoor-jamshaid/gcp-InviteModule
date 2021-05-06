import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Select, Row,Col, Radio, Checkbox } from 'antd';
import {  useHistory  } from "react-router-dom";
import axios from 'axios';
import signupBG from '../../assets/backgroundImages/signupBg.png';



const { Option } = Select;

const layout = {
    wrapperCol: { span: 5 },    
};

const tailLayout = {
    wrapperCol: { offset: 0, span: 0 },
};

const validateMessages = {
    required: 'Please input your ${name}!',
    types: {
      email: '${name} is not validate email!',
      number: '${name} is not a validate number!', 
      website: '${name} is not a valid website!'
    }
  };

function CreateCompanies(props) {

    useEffect(() => {
        // Update the document title using the browser API
        props.changeBgImage(signupBG);
    },[props.bgImage]);

    const history = useHistory();

    const onFinish = (values) => {

        // const access_token = localStorage.getItem('login');

        // // const url = 'https://backend.thetalent.games/CreateCompanies';
        // const url = '';
        // const data = {
        //     name: values.companyName,
        //     website: values.companyWebsite,
        //     industry_type: values.companyIndustryType,
        //     bio: values.companyBio
        // }
        // const config = {
        //     headers: { Authorization: `Bearer ${access_token}` }
        // };

        // console.log(access_token, url, data, config);

        // axios.post(url, data, config)
        //     .then(response => {
        //         console.log(response)
        //         if (response.data.status) {
        //             console.log("Success: ", response);
        //             // localStorage.setItem('login', response.data.token);
        //             // history.push('/user');
        //         }
        //     }).catch(error => {
        //         console.log(error)
        //     });
        // localStorage.setItem('login', response.data.token);
        history.push('/client');
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
       if(!localStorage.getItem('login'))history.push('/'); 

    return (

        <div id="signupContainer">
            <div style={{marginBottom:25}}>
                <span style={{fontWeight:620, fontSize:18}}> Create your free account</span>
            </div>
            <div className="signupForm">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                >
                    <Row id="fname">
                        <Col>
                            <span className="spanStyling"> First Name</span>
                            <Form.Item
                                rules={[{ required: true}]}
                                name="firstName"
                                value={props.data.firstName}
                                onChange={props.handleChange}
                            >
                                <Input className="inputinline" placeholder="John" />
                            </Form.Item>
                        </Col>
                        

                        <Col className="col-inline">
                            <span className="spanStyling"> Last Name</span>
                            <Form.Item
                                rules={[{ required: true }]}
                                name="lastName"
                                value={props.data.lastName}
                                onChange={props.handleChange}

                            >
                                <Input className="inputinline" placeholder="Lang" />
                            </Form.Item>
                        </Col>
                    </Row>

                    
                    <span className="spanStyling">Email address</span>
                    <Form.Item
                        rules={[{ required: true }]}
                        name="email address"
                        value={props.data.companyWebsite}
                        onChange={props.handleChange}

                    >
                        <Input className="input-placeholder" placeholder="loremipsem@thetalentgames.com"/>
                    </Form.Item>

                    <span className="spanStyling">Organization Name</span>
                    <Form.Item
                        rules={[{ required: true }]}
                        name="company website"
                        value={props.data.companyWebsite}
                        onChange={props.handleChange}

                    >
                        <Input className="input-placeholder" placeholder="lorem ipsem"/>
                    </Form.Item>

                    <span className="spanStyling">Organization Website</span>
                    <Form.Item
                        rules={[{ required: true }]}
                        name="company name"
                        value={props.data.companyWebsite}
                        onChange={props.handleChange}

                    >
                        <Input className="input-placeholder" placeholder="www.loremipsem.com"/>
                    </Form.Item>

                    <span className="spanStyling"> Industry Type</span>
                    <Form.Item
                        className="dropdownStyling"
                        rules={[{ required: true }]}
                        name="company industry type"
                        value={props.data.companyIndustryType}
                        onChange={props.handleChange}
                        placeholder="Eg: Tech"

                    >
                        <Select
                            // className="dropdownStyling"
                            placeholder="Select Industry Type"
                            allowClear
                        >
                            <Option value="Entertainment">Entertainment</Option>
                            <Option value="Tech">Tech</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>

                    <Row gutter={5}>
                        <Col>
                            <span className="spanStyling">Password</span>
                            <Form.Item
                                hasFeedback
                                rules={[{ required: true}]}
                                name="Password"
                                value={props.data.password}
                                onChange={props.handleChange}
                            >
                                <Input.Password className="inputinline" placeholder="*******" />
                            </Form.Item>
                        </Col>

                        <Col className="col-inline">
                            <span className="spanStyling">Confirm Password</span>
                            <Form.Item
                                rules={[
                                    {
                                      required: true,
                                    },
                                    ({ getFieldValue }) => ({
                                      validator(rule, value) {
                                        if (!value || getFieldValue('Password') === value) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords do not match!');
                                      },
                                    }),
                                  ]}
                                hasFeedback
                                name="confirm password"
                                value={props.data.confirmPw}
                                onChange={props.handleChange}
                            >
                                <Input.Password className="inputinline" placeholder="*******" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        id="terms-conditions"
                        rules={[{ required: true }]} //DropDown or Radio Button 
                        value={props.data.configLanguage} //DropDown or Radio Button 
                        onChange={props.handleChange}
                    >

                        <div>
                            <Checkbox indeterminate={props.data.indeterminate}>
                                <span className="termsAndConditionsText">I agree to the I agree to the  I agree to the  I agree to the <span style={{ color: "#007e8b" }}>The Talent Games</span> Terms of TestData and <span style={{ color: "#007e8b" }}>Privacy policy.</span></span>
                            </Checkbox>
                        </div>
                    </Form.Item>
                    <div>
                        <Form.Item {...tailLayout}>
                            <Button id="myBtn" htmlType="submit" className="login-form-button">
                                Sign Up
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>

            

           
        </div>
         
            //     <br/>
            // //      <input 
            //         name="companyIndustryType" 
            //         value={props.data.companyIndustryType} 
            //         onChange={props.handleChange} 
            //         placeholder="Company Industry Type"
            //     />
            //     <br/>   
            //      <input 
                    // name="companyBio" 
                    // value={props.data.companyBio} 
                    // onChange={props.handleChange} 
                    // placeholder="Company Bio"
            //     />

            //     <br/>
            //     <button onClick={props.handleSubmit}>Create Company</button>
            //     <br/>
                
            // </form>
            
    );
}


export default CreateCompanies;