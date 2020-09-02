import React, { useState } from 'react';
import { Table, Tag, Space, Popconfirm, message, Button } from 'antd';
import { connect } from 'dva';
import './index.css';
import UserModal from './components/UserModal';

//对于dispatch这个东西来说，如果在function类型的组件中，要在参数中接收；如果在class类型的组件中直接用this.props.dispatch就可以使用。

const userList = ({ users, dispatch, userListLoading }) => {
  //引入useState 函数组件也能拥有state  useState是一个函数 返回一个数组  
  //第一个元素是变量名，第二个元素是修改这个变量的函数名

  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      //record里存的是单条数据
      render: (text, record) => (
        <span>
          <a onClick={() => {
            editHandler(record)
          }}>Edit</a>&nbsp;&nbsp;&nbsp;
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={()=>{
              confirm(record)
            }}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>

        </span>
      ),
    },
  ];

  const closeHandler = () => {
    setModalVisible(false);

  }
  const editHandler = (record) => {
    setModalVisible(true)
    setRecord(record);
  }
  const confirm = (record) => {
    const id = record.id;
    dispatch({
      type: 'users/delete',
      payload: {
        id
      }
    })
  }
  const onFinish = values => {
    //点击edit才会有record  点击add没有 通过判断record来确定执行的是add还是edit
    let id = 0;
    if(record) {
      id = record.id;
    }

    if(id) {
      dispatch({
        type: 'users/edit',
        payload: {
          values,
          id
        }
      })
    }else {
      dispatch({
        type: 'users/add',
        payload: {
          values,
        }
      })
    }

    setModalVisible(false);
  }
  const addHandler = () =>{
    setModalVisible(true);
    setRecord(undefined)
  }
  return (
    <div className="list-table">
      <Button type="primary" onClick={addHandler}>Add</Button>
      <Table columns={columns} dataSource={users.data} rowKey="id" loading={userListLoading} />
      <UserModal visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
      ></UserModal>
    </div>
  );
};
const mapStateToProps = ({ users,loading }) => {
  return {
    users,
    userListLoading: loading.models.users
  };
};
// const mapStateToProps = (state) => {
//   console.log(state)
//     return {
//     }
// }
export default connect(mapStateToProps)(userList);


// state 是个对象 里面有 users,loading router @@dva   users对应同名的model中返回的数据
//通过connect方式绑定到仓库


