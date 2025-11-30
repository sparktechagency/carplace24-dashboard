import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Title from "@/components/common/Title";
import { useGetAllSubscribersQuery } from "@/redux/apiSlices/userSlice";

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

const toStatus = (val?: string): StatusType => {
  switch ((val || "").toLowerCase()) {
    case "active":
      return "Active";
    case "expired":
      return "Expired";
    case "paused":
      return "Paused";
    default:
      return "Active";
  }
};

const formatDateIso = (iso?: string) =>
  iso ? new Date(iso).toISOString().split("T")[0] : "";

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
  const { data: subscribersRes, isFetching } = useGetAllSubscribersQuery({});

  const apiData = (subscribersRes as any)?.data || [];
  const dataSource: Subscriber[] = apiData.map((s: any) => ({
    id: s?._id,
    name: s?.user?.name || s?.user?.email || "",
    packageType: (s?.package?.title || "Basic") as PackageType,
    startDate: formatDateIso(s?.currentPeriodStart),
    endDate: formatDateIso(s?.currentPeriodEnd),
    price: Number(s?.price ?? s?.package?.price ?? 0),
    status: toStatus(s?.status),
  }));

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
        loading={isFetching}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Subscribers;
