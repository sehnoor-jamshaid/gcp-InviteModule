import React,{Component} from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import SendInvite from './SendInvite'
import axios from 'axios';

const apiUsers= {
  url: 'http://localhost:3000/inviteTestData/data.json',
  data: {
      // data to be sent
     
  },
  config: {
      
  }
}
// const baseUrl="http://192.168.18.30:3000"

// const access_token = localStorage.getItem('login');

// const apiUsers = {
//   url: baseUrl+'/gcp/getInviteDataByCampaignId/',
//   data: {
//       // data to be sent
     
//   },
//   config: {
//     headers: {
//         Authorization: `Bearer ${access_token}`
//     }
// }
// }

// const data = 


// [
//   {
//     key: '1',
//     name: 'John Brown',
//     email: "test@gmail.com",
//     gender:"female",
//     score:34,
//     client: 'KE',
//     campaign: 'camp1',
//     status: 'completed' 
//   },
//   {
//     key: '2',
//     name: 'Joe Black',
//     email: "test@gmail.com",
//     gender:"female",
//     score:34,
//   },
//   {
//     key: '3',
//     name: 'Jim Green',
//     email: "test@gmail.com",
//     gender:"female",
//     score:34,
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     email: "test@gmail.com",
//     gender:"female",
//     score:34,
//   },
// ];

class EmailTable extends React.Component {
 state = {
    searchText: '',
    searchedColumn: '',
     dataTable:[]
     
  };
  componentDidMount() {
    axios.get(apiUsers.url,apiUsers.config)
      .then(res => {
        console.log('Sendinvite Table data', res);

        
        const dataTable = res.data.userCampaigns;
        if(dataTable !== undefined)
          this.setState({ dataTable  });
        
        
        console.log('invite',this.state.dataTable)
      })
  
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    
    const columns = [
      {
        title: 'userId',
        dataIndex: 'userId',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'age',
        width: '20%',
        ...this.getColumnSearchProps('age'),
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'address',
        ...this.getColumnSearchProps('address'),
      },
     
    ];
  return <><Table columns={columns} dataSource={this.props.userEmailsData} /></>;
  }
}

export default EmailTable;