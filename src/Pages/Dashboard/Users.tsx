import React, { useState } from "react";
import { Table, Button, Select, Input, Spin } from "antd";
import {
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  useUpdateUserStatusMutation,
  useUsersQuery,
} from "@/redux/apiSlices/userSlice";
import moment from "moment";
import toast from "react-hot-toast";

const Users: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data: usersList, isFetching } = useUsersQuery({});
  const [updateUserStatus] = useUpdateUserStatusMutation();

  if (isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  console.log(searchText, roleFilter, statusFilter);

  const allUsersList = usersList?.data?.users || [];

  const filteredUsersList = allUsersList?.filter((user: any) => {
    const q = searchText.trim().toLowerCase();
    const name = (user?.name || "").toLowerCase();
    const email = (user?.email || "").toLowerCase();
    const phone = (user?.phone || "").toLowerCase();
    const textMatch =
      !q || name.includes(q) || email.includes(q) || phone.includes(q);
    const roleMatch = !roleFilter || user?.role === roleFilter;
    const statusMatch =
      !statusFilter ||
      (statusFilter === "Active"
        ? user?.isLocked === false
        : user?.isLocked === true);
    return textMatch && roleMatch && statusMatch;
  });

  const handleDelete = (userId: string) => {
    console.log("delete user", userId);
  };

  const handleUpdateUserStatus = async (userId: string) => {
    try {
      const res = await updateUserStatus({ id: userId });
      if (res?.data?.success) {
        toast.success(res?.data?.message || "User status updated successfully");
      } else {
        toast.error(res?.data?.message || "Failed to update user status");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to update user status");
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "Serial",
      dataIndex: "key",
      key: "key",
      render: (...args: any[]) => args[2] + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: any) => record.name || "-",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_: string, record: any) => record.email || "-",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (_: string, record: any) => record.phone || "-",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_: string, record: any) => (
        <div>{record?.role === "DELEAR" ? "DEALER" : record?.role}</div>
      ),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (_: string, record: any) =>
        moment(record?.joinDate || record?.createdAt).format("YYYY-MM-DD") ||
        "-",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record: any) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            record.isLocked
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {record.isLocked ? "Locked" : "Active"}
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
            className={`${
              record.isLocked
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
            icon={record.isLocked ? <UnlockOutlined /> : <LockOutlined />}
            onClick={() => handleUpdateUserStatus(record._id)}
          ></Button>
          <Button
            type="link"
            className="bg-red-200 text-red-800"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Users List</h1>
        <div>
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <Input
              placeholder="Search by name or email"
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 220 }}
            />

            {/* Role Filter Dropdown */}
            <Select
              placeholder="Filter by Role"
              allowClear
              onChange={(value) => setRoleFilter(value)}
              style={{ width: 150 }}
            >
              <Select.Option value="SELLER">Private Seller</Select.Option>
              <Select.Option value="DEALER">Dealer</Select.Option>
              <Select.Option value="BUYER">Buyer</Select.Option>
            </Select>

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
        dataSource={filteredUsersList}
        rowKey={(row) => row._id || row.key || row.id}
        pagination={{
          current: page,
          pageSize: limit,
          total: usersList?.data?.meta?.total || filteredUsersList.length,
          onChange: (p, ps) => {
            setPage(p);
            setLimit(ps || 10);
          },
        }}
      />
    </div>
  );
};

export default Users;
