import ReactApexChart from 'react-apexcharts';
import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
// import cards from '../TestData/cards.json'
import Common from './CardsData';
// import chart from '../TestData/chart.json'
import '../candidates.css';
import axios from 'axios';
let cards; 
let graph;


// const baseUrl="https://backend.thetalent.games"

// const baseUrl="http://192.168.18.30:3000"

// const access_token = localStorage.getItem('login');

// const apiReqChartUrl = {
//   url: baseUrl+'/gcp/getInviteChartInfo/',
//   data: {
//       // data to be sent
     
//   },
//   config: {
//     headers: {
//         Authorization: `Bearer ${access_token}`
//     }
// }
// }




const apiReqChartUrl = {
  url: 'http://localhost:3000/inviteTestData/chart.json',
  data: {
      // data to be sent
     
  },
  config: {
      
  }
}
class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],//for cards display
      graphData:[],//for apex chart
      chartOptions: {}

    };

    // this.onChartUpdate = this.onChartUpdate.bind(this);

  
  };

  // onChartUpdate(chart) {
  //   this.setState({ chartData: chart });
  // }
 
  componentDidMount() {
    console.log("runtimedate",this.props.runtimedate)
    console.log('apiReqChartUrl', apiReqChartUrl);
      axios.get(apiReqChartUrl.url,apiReqChartUrl.config)
      .then(res => {
        console.log('charts Data - merged', res);
        
        const graphData = res.data.chart;
        const chartData = res.data.cards;

        if(graphData.length !== undefined)
          this.setState({ graphData  });
        
        if(chartData[0] !== undefined)
        this.setState({ chartData  });


        graph = this.state.graphData;
      }).catch(e=>
        {
          console.log("error why graph isnt rendering",e);
        });
        this.setState({
          options: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              type: 'datetime',
            categories: [" 2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
             //categories: [this.props.startDate,this.props.runtimedate]
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          }
        });


    console.log("this.state.cardData", this.state.chartData);
    console.log("this.state.chartData", this.state.graphData);

  };

  
componentDidUpdate(){
  console.log( this.props,"props to show if data is coming ")

}

  
  render() {
    console.log("runtimedate",this.props.runtimedate)
    
    // this.props.chart;


    cards = this.state.chartData;
    graph=this.state.graphData;

     console.log("render graph",graph);
    return (
      (cards[0] !== undefined)?
      <>
        <div className="site-card-wrapper">
          
          <Row gutter={16}>
            {
            
            cards[0].chartDOU.map((val) => {
              console.log('val',val)
              return <Common title={val.title} percent={val.percent} number={val.number} />
            })
            
            }
            <Col xs={{ span: 24 }} lg={{ span: 6 }} >
              <Card bordered={false} className="resp_cards last">
                {cards[1].chartTotal.map((val, index) => {
                  return (
                    <li><span className={`dot dot${index + 1}`} ></span> {val.title}<span className="spanOfCards">{val.percent}</span></li>)
                })}
              </Card>
            </Col>
          </Row>
        </div>

        <div id="chart">
         <ReactApexChart options={this.state.options} series={graph} type="area" height={350} /> 
        </div>
      </>
    :<></>
    );
  }
}


export default ApexChart;