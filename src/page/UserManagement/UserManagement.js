// View profile of an user
import React, { Component } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import TextField from '@material-ui/core/TextField';
import { Table, Tag, Space } from 'antd';
// import { update_user } from './UserFunction'
import Header from '../../Component/Header';

class UserManagement extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: sessionStorage.getItem('user_login'),
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      mainImage: 'https://image.flaticon.com/icons/png/512/147/147144.png',
      gender: '',
      birth_date: '',
      roles: '',
      favourite: '',
      currentTab: 1,
    }
  }

  // refreshDataFromServer = () => {
  //     myAccount(sessionStorage.getItem('user_login')).then((userFromServer) => {
  //       this.setState({
  //         gender: userFromServer[0].gender,
  //         first_name:userFromServer[0].first_name,
  //         middle_name :userFromServer[0].middle_name,
  //         last_name :userFromServer[0].last_name,
  //         email :userFromServer[0].email,
  //         mainImage: 'https://image.flaticon.com/icons/png/512/147/147144.png',
  //         gender :userFromServer[0].gender,
  //         birth_date :userFromServer[0].birth_date,
  //         roles :userFromServer[0].roles,
  //         favourite :userFromServer[0].favourite,
  //         currentTab : 1,
  //       });
  //       console.log(this.state.gender)
  // }).catch((error) => {
  // console.error(error);
  // });
  // }
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];

    return (
      <>
        <Header />
        <div className="body product detail">
          <div className="container">
            <div className="product-info-top">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default UserManagement