import { Table, Input, Button, Space, Dropdown, Menu,Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
// import TableData from '../TestData/TableData.json';
import React, { Component }  from 'react';
import moment from "moment";
import axios from 'axios';
const { Search } = Input;


const apiCallRequest = {
  url: 'http://localhost:3000/inviteTestData/invites.json',
  data: {
      // data to be sent
     
  },
  config: {
      
  }
}
class InvitedUserTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      TableData: [],
      searchText: '',
      searchedColumn: '',

    };

    // this.onChartUpdate = this.onChartUpdate.bind(this);
  };
  componentDidMount() {
    axios.get(apiCallRequest.url)
      .then(res => {
        console.log('TableData', res);
        const TableData = res.data;
        if(TableData.length !== undefined)
          this.setState({ TableData  });
        
        
        console.log('invite',this.state.TableData)
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

  handleDelete = (key) => {
    console.log("key",key);
    const dataSource = [...this.state.TableData];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  
  render() {
    
    console.log("render_tabledata",this.state.TableData)
    const columns = [
      
      
      {
        title: 'Name',
        dataIndex: 'name',
        key: '0',
        width: '30%',
        ...this.getColumnSearchProps('email'),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: '1',
        width: '30%',
        ...this.getColumnSearchProps('email'),
      },
      {
        title: 'Company Name',
        dataIndex: 'company',
        key: '3',
        width: '30%',
        ...this.getColumnSearchProps('email'),
      },
      {
        title: 'Campaign Name',
        dataIndex: 'campaign',
        key: '4',
        width: '30%',
        ...this.getColumnSearchProps('email'),
      },
      {
        title: 'Send Date ',
        dataIndex:'createdAt',
        key: '5',
        width: '20%',
        ...this.getColumnSearchProps('Send date'),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: '6',
        ...this.getColumnSearchProps('status'),
      },
      {
        title: 'Action',
        key: 'action',
        render:  (_, record) =>
        this.state.TableData.length >= 1 ? (
          <>
            {/* <Dropdown  placement="bottomLeft" >
            <Menu>
        <Menu.Item>
          <a>Send Reminder </a>
        </Menu.Item>
        <Menu.Item > */}
        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
        {/* </Menu.Item>
       </Menu> */}
              {/* <Button>Action</Button>
            </Dropdown> */}
            </>
            ) : null,
         
        
      },
    ];
   
    return (
      <div>
        
     <Table className="invited_user_table" columns={columns} dataSource={this.state.TableData} /> 

  </div>);
    
  }
  
}
export default InvitedUserTable;