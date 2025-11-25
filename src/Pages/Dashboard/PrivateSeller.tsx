import React, { useState } from "react";
import { Table, Button, Select, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface UserData {
  key: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joinDate: string;
}

const dummyData: UserData[] = [
  {
    key: "1",
    userId: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Private Seller",
    phone: "+123456789",
    status: "Active",
    joinDate: "2023-05-10",
  },
  {
    key: "2",
    userId: "USR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Private Seller",
    phone: "+987654321",
    status: "Active",
    joinDate: "2023-03-15",
  },
  // Additional dummy data...
];

const PrivateSeller: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>(dummyData);
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  console.log(searchText, statusFilter);

  const columns: ColumnsType<UserData> = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "Active"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: UserData) => (
        <div className="flex gap-2">
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (key: string): void => {
    setUsers(users.filter((user) => user.key !== key));
  };

  return (
    <div className="p-6 bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Private Seller List</h1>
        <div>
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <Input
              placeholder="Search by name or email"
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 220 }}
            />

            {/* Status Filter Dropdown */}
            <Select
              placeholder="Filter by Status"
              allowClear
              onChange={(value) => setStatusFilter(value)}
              style={{ width: 150 }}
            >
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="key"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PrivateSeller;
