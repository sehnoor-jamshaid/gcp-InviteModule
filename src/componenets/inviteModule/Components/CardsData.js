import React from 'react';
import ApexChart from './Chart';
import { Card, Col, Row } from 'antd';
import '../candidates.css';
function Common(props)
{
    return(
      
        <Col xs={{ span: 24 }} lg={{ span: 6}}  className="text-center">
        <Card className="resp_cards cardsOfDashboard" bordered={false}>
    <p>{props.title}</p>
    <h4>{props.percent}</h4>
    <h5>{props.number}</h5>
        </Card>
      </Col>

    );
}
export default Common;