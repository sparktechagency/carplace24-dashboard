import React, { useState } from "react";
import { Table, Button, Select, Input, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useSellersQuery } from "@/redux/apiSlices/userSlice";
import moment from "moment";

const PrivateSeller: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const { data: getAllSellers, isFetching } = useSellersQuery({});

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const allSellers = getAllSellers?.data?.users || [];

  const filteredSellers = allSellers?.filter((seller: any) => {
    const nameMatch = seller?.name
      ?.toLowerCase()
      ?.includes(searchText.toLowerCase());
    const emailMatch = seller?.email
      ?.toLowerCase()
      ?.includes(searchText.toLowerCase());
    const phoneMatch = seller?.phone
      ?.toLowerCase()
      ?.includes(searchText.toLowerCase());
    const roleMatch = seller?.role
      ?.toLowerCase()
      ?.includes(searchText.toLowerCase());
    const statusMatch = seller?.status
      ?.toLowerCase()
      ?.includes(statusFilter.toLowerCase());

    return nameMatch || emailMatch || phoneMatch || roleMatch || statusMatch;
  });

  const columns: ColumnsType<any> = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => name || "-",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => email || "-",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => phone || "-",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => role || "-",
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (joinDate: string) =>
        moment(joinDate).format("YYYY-MM-DD") || "-",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: string, record) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            record?.isLocked
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {record?.isLocked ? "Locked" : "Active"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
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
        dataSource={filteredSellers}
        rowKey="key"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PrivateSeller;
