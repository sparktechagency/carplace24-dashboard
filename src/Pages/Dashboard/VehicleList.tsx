import { Input, Select, Spin, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiEyeLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarsQuery } from "@/redux/apiSlices/carSlice";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(value);

const statusColor = (status: any) => {
  switch (status) {
    case "Active":
      return "green";
    case "Pending":
      return "gold";
    case "Sold":
      return "red";
    default:
      return "default";
  }
};

const VehicleList = () => {
  const [searchText, setSearchText] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data: getALlCars, isFetching } = useCarsQuery({});

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const allCarsData = getALlCars?.data || [];

  const filteredCars = allCarsData?.filter((car: any) => {
    const nameMatch = car?.vehicleName
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    const brandMatch = car?.brand
      ?.toLowerCase()
      ?.includes(brandFilter.toLowerCase());
    const statusMatch = car.status === statusFilter || !statusFilter;
    return nameMatch || brandMatch || statusMatch;
  });

  const columns: ColumnsType<any> = [
    {
      title: "Serial",
      key: "serial",
      width: 90,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Vehicle Name",
      dataIndex: ["basicInformation", "vehicleName"],
      key: "vehicleName",
    },
    {
      title: "Brand",
      dataIndex: ["basicInformation", "brand", "brand"],
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: ["basicInformation", "model", "model"],
      key: "model",
    },
    {
      title: "Price",
      dataIndex: ["basicInformation", "OfferPrice"],
      key: "price",
      render: (value: number) => formatPrice(value),
    },
    {
      title: "Listing Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      title: "Uploaded By",
      dataIndex: ["createdBy", "name"],
      key: "uploadedBy",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value: any) => <Tag color={statusColor(value)}>{value}</Tag>,
    },
    {
      title: "Action",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Tooltip title="View">
          <Link to={`/vehicle-details/${record._id}`}>
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() =>
                toast(`Viewing ${record?.basicInformation?.vehicleName}`)
              }
            >
              <RiEyeLine size={18} />
            </button>
          </Link>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm vehicle-list-table">
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
              placeholder="Filter By Brand"
              allowClear
              onChange={(value) => setBrandFilter(value)}
              style={{ width: 150 }}
            >
              <Select.Option value="Private Seller">
                Private Seller
              </Select.Option>
              <Select.Option value="Dealer">BMW</Select.Option>
              <Select.Option value="Buyer">Mercedes-Benz</Select.Option>
              <Select.Option value="Buyer">Audi</Select.Option>
              <Select.Option value="Buyer">Land Rover</Select.Option>
              <Select.Option value="Buyer">Range Rover</Select.Option>
            </Select>

            {/* Status Filter Dropdown */}
            <Select
              placeholder="Filter by Status"
              allowClear
              onChange={(value) => setStatusFilter(value)}
              style={{ width: 150 }}
            >
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Active">Pending</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
              <Select.Option value="Inactive">Sold</Select.Option>
            </Select>
          </div>
        </div>
      </div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredCars}
        pagination={{ pageSize: 15 }}
        size="small"
      />
    </div>
  );
};

export default VehicleList;
