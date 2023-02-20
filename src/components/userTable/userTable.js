import { dummyData } from "../../fixtures/dummyData";
import { FaUserCircle } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { ImLocation } from "react-icons/im";
import { BsTelephoneFill } from "react-icons/bs";
import "./userTable.css";
import { Table, Modal, Input, Form } from "antd";
import { useState } from "react";

// localStorage.setItem("UserData", JSON.stringify(dummyData));
// let dataFromLocalStorage = localStorage.getItem("UserData");
// let parsedDummyData = JSON.parse(dataFromLocalStorage);




const UserTable = () => {
  const [userSearchedText, setUserSearchedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [dataSource, setDataSource] = useState(dummyData);

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      filteredValue: [userSearchedText],
      onFilter: (value, record) => {
        return  String(record.name).toLowerCase().includes(value.toLowerCase()) ;
      },
    },
    {
      title: "EMAIL",
      dataIndex: "email",
     
    },
    {
      title: "STATUS",
      dataIndex: "status",
      
    },
    {
      title: "LAST ONLINE",
      dataIndex: "lastOnline",
    },
    {
      title: "",
      render: (record) => {
        return (
          <>
            <p
            className="on-edit"
              onClick={() => {
                console.log("record", record)
                onEditUser(record);
              }}
            >
              Edit
            </p>
          </>
        );
      },
    },
  ];

  const onEditUser = (record) => {
    setIsEditing(true);
    setEditingUser({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };
  return (
    <div className="page-container">
      <Input.Search
        placeholder="Search"
        className="search-bar"
        onSearch={(value) => setUserSearchedText(value)}
        onChange={(e) => setUserSearchedText(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
        scroll={{
          y: 440,
        }}
      ></Table>
      <Modal
        open={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setDataSource((each) => {
           
            return each.map((user) => {
              if (user.key === editingUser.key) {
                return editingUser;
              } else {
                return user;
              }
            });
          });
          resetEditing();
        }}
      >
        <Form>
          <Form.Item
            label="Name"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              prefix={<FaUserCircle className="user-icon" />}
              value={editingUser?.name}
              onChange={(e) => {
                setEditingUser((pre) => {
                  return { ...pre, name: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              prefix={<GrMail className="user-icon" />}
              value={editingUser?.email}
              onChange={(e) => {
                setEditingUser((pre) => {
                  return { ...pre, email: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Location"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              prefix={<ImLocation className="user-icon" />}
              value={editingUser?.location}
              onChange={(e) => {
                setEditingUser((pre) => {
                  return { ...pre, location: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              prefix={<BsTelephoneFill className="user-icon" />}
              value={editingUser?.phoneNum}
             
              onChange={(e) => {
                setEditingUser((pre) => {
                  return { ...pre, phoneNum: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Title"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              prefix={<BsTelephoneFill className="user-icon" />}
              value={editingUser?.title}
              onChange={(e) => {
                setEditingUser((pre) => {
                  return { ...pre, title: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Birthday"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              value={editingUser?.birthday}
              onChange={(e) => {
                setEditingUser((pre) => {
                  return { ...pre, birthday: e.target.value };
                });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserTable;
