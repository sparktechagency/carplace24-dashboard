import { Input, Select, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RiEyeLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  listingDate: string;
  uploadedBy: string;
  status: "Active" | "Pending" | "Sold";
}

const dataSource: Vehicle[] = [
  {
    id: "V-1001",
    name: "Audi A4",
    brand: "Audi",
    model: "A4",
    price: 27500,
    listingDate: "2025-01-05",
    uploadedBy: "John Doe",
    status: "Active",
  },
  {
    id: "V-1002",
    name: "BMW 320i",
    brand: "BMW",
    model: "320i",
    price: 31500,
    listingDate: "2025-01-12",
    uploadedBy: "Anna Smith",
    status: "Pending",
  },
  {
    id: "V-1003",
    name: "Mercedes C200",
    brand: "Mercedes",
    model: "C200",
    price: 39900,
    listingDate: "2025-01-16",
    uploadedBy: "Carl Zeiss",
    status: "Active",
  },
  {
    id: "V-1004",
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    model: "Golf",
    price: 18950,
    listingDate: "2024-12-29",
    uploadedBy: "Elena Novak",
    status: "Sold",
  },
  {
    id: "V-1005",
    name: "Toyota Corolla",
    brand: "Toyota",
    model: "Corolla",
    price: 16500,
    listingDate: "2025-01-20",
    uploadedBy: "Marco Rossi",
    status: "Active",
  },
  {
    id: "V-1006",
    name: "Honda Civic",
    brand: "Honda",
    model: "Civic",
    price: 17200,
    listingDate: "2025-01-22",
    uploadedBy: "Sara Lee",
    status: "Pending",
  },
  {
    id: "V-1007",
    name: "Porsche 911",
    brand: "Porsche",
    model: "911",
    price: 115000,
    listingDate: "2025-01-02",
    uploadedBy: "James Bond",
    status: "Active",
  },
  {
    id: "V-1008",
    name: "Kia Sportage",
    brand: "Kia",
    model: "Sportage",
    price: 23500,
    listingDate: "2024-12-20",
    uploadedBy: "Nora White",
    status: "Sold",
  },
  {
    id: "V-1009",
    name: "Hyundai Ioniq",
    brand: "Hyundai",
    model: "Ioniq",
    price: 28900,
    listingDate: "2025-01-10",
    uploadedBy: "Liam Müller",
    status: "Pending",
  },
  {
    id: "V-1010",
    name: "Tesla Model 3",
    brand: "Tesla",
    model: "Model 3",
    price: 39990,
    listingDate: "2025-01-24",
    uploadedBy: "Ada Lovelace",
    status: "Active",
  },
  {
    id: "V-1011",
    name: "Ford Mustang",
    brand: "Ford",
    model: "Mustang",
    price: 42000,
    listingDate: "2025-01-25",
    uploadedBy: "Jack Ryan",
    status: "Active",
  },
  {
    id: "V-1012",
    name: "Chevrolet Camaro",
    brand: "Chevrolet",
    model: "Camaro",
    price: 38000,
    listingDate: "2025-01-26",
    uploadedBy: "Emily Clark",
    status: "Pending",
  },
  {
    id: "V-1013",
    name: "Nissan Qashqai",
    brand: "Nissan",
    model: "Qashqai",
    price: 24500,
    listingDate: "2025-01-27",
    uploadedBy: "Oliver Queen",
    status: "Active",
  },
  {
    id: "V-1014",
    name: "Mazda CX-5",
    brand: "Mazda",
    model: "CX-5",
    price: 31000,
    listingDate: "2025-01-28",
    uploadedBy: "Sophie Turner",
    status: "Sold",
  },
  {
    id: "V-1015",
    name: "Subaru Outback",
    brand: "Subaru",
    model: "Outback",
    price: 33500,
    listingDate: "2025-01-29",
    uploadedBy: "Daniel Craig",
    status: "Pending",
  },
  {
    id: "V-1016",
    name: "Volvo XC60",
    brand: "Volvo",
    model: "XC60",
    price: 48500,
    listingDate: "2025-01-30",
    uploadedBy: "Emma Watson",
    status: "Active",
  },
  {
    id: "V-1017",
    name: "Jaguar XE",
    brand: "Jaguar",
    model: "XE",
    price: 52000,
    listingDate: "2025-01-31",
    uploadedBy: "Harry Styles",
    status: "Sold",
  },
  {
    id: "V-1018",
    name: "Land Rover Discovery",
    brand: "Land Rover",
    model: "Discovery",
    price: 68000,
    listingDate: "2025-02-01",
    uploadedBy: "Isla Fisher",
    status: "Pending",
  },
  {
    id: "V-1019",
    name: "Peugeot 308",
    brand: "Peugeot",
    model: "308",
    price: 22000,
    listingDate: "2025-02-02",
    uploadedBy: "Luke Evans",
    status: "Active",
  },
  {
    id: "V-1020",
    name: "Renault Clio",
    brand: "Renault",
    model: "Clio",
    price: 17500,
    listingDate: "2025-02-03",
    uploadedBy: "Zoe Saldana",
    status: "Active",
  },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(value);

const statusColor = (status: Vehicle["status"]) => {
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

  console.log(searchText, brandFilter, statusFilter);

  const columns: ColumnsType<Vehicle> = [
    {
      title: "Serial",
      key: "serial",
      width: 90,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Vehicle Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value: number) => formatPrice(value),
    },
    {
      title: "Listing Date",
      dataIndex: "listingDate",
      key: "listingDate",
    },
    {
      title: "Uploaded By",
      dataIndex: "uploadedBy",
      key: "uploadedBy",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value: Vehicle["status"]) => (
        <Tag color={statusColor(value)}>{value}</Tag>
      ),
    },
    {
      title: "Action",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Tooltip title="View">
          <Link to={`/vehicle-details/${record.id}`}>
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => toast(`Viewing ${record.name}`)}
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
        rowKey={(row) => row.id}
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 15 }}
        size="small"
      />
    </div>
  );
};

export default VehicleList;
