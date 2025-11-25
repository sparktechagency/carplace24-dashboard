import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Title from "@/components/common/Title";

type PackageType = "Basic" | "Pro" | "Premium";
type StatusType = "Active" | "Expired" | "Paused";

interface Subscriber {
  id: string;
  name: string;
  packageType: PackageType;
  startDate: string;
  endDate: string;
  price: number;
  status: StatusType;
}

const dataSource: Subscriber[] = [
  {
    id: "S-1001",
    name: "John Doe",
    packageType: "Pro",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    price: 299,
    status: "Active",
  },
  {
    id: "S-1002",
    name: "Anna Smith",
    packageType: "Premium",
    startDate: "2024-11-10",
    endDate: "2025-11-09",
    price: 499,
    status: "Active",
  },
  {
    id: "S-1003",
    name: "Marco Rossi",
    packageType: "Basic",
    startDate: "2024-01-15",
    endDate: "2024-07-14",
    price: 99,
    status: "Expired",
  },
  {
    id: "S-1004",
    name: "Sara Lee",
    packageType: "Pro",
    startDate: "2025-02-01",
    endDate: "2026-01-31",
    price: 299,
    status: "Paused",
  },
  {
    id: "S-1005",
    name: "James Bond",
    packageType: "Premium",
    startDate: "2025-01-05",
    endDate: "2026-01-04",
    price: 499,
    status: "Active",
  },
  {
    id: "S-1006",
    name: "Elena Novak",
    packageType: "Basic",
    startDate: "2024-08-20",
    endDate: "2025-02-19",
    price: 99,
    status: "Expired",
  },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(value);

const statusColor = (status: StatusType) => {
  switch (status) {
    case "Active":
      return "green";
    case "Expired":
      return "red";
    case "Paused":
      return "gold";
    default:
      return "default";
  }
};

const Subscribers = () => {
  const columns: ColumnsType<Subscriber> = [
    {
      title: "Serial",
      key: "serial",
      width: 90,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Package Type",
      dataIndex: "packageType",
      key: "packageType",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value: number) => formatPrice(value),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value: StatusType) => (
        <Tag color={statusColor(value)}>{value}</Tag>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <Title>Subscribers</Title>
      </div>
      <Table
        rowKey={(row) => row.id}
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Subscribers;
