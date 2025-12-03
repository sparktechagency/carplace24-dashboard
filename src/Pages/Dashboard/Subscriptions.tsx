import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Table,
  Tag,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Title from "@/components/common/Title";
import {
  useGetAllPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
} from "@/redux/apiSlices/subscriptionsSlice";
import { useMemo, useState } from "react";

type RoleType = "SELLER" | "DELEAR";

interface PackageRow {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  carLimit: number;
  adHocPricePerCar: number;
  targetRole: RoleType;
  OnlineImmediately: boolean | string;
  VisibleToEveryone: boolean | string;
  createdAt: string;
}

const Subscriptions = () => {
  const { data: res, isFetching, refetch } = useGetAllPackagesQuery(undefined);
  const [createPackage, { isLoading: creating }] = useCreatePackageMutation();
  const [updatePackage, { isLoading: updating }] = useUpdatePackageMutation();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<PackageRow | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const dataSource: PackageRow[] = useMemo(() => {
    const list = (res as any)?.data || [];
    return list.map((p: any) => ({
      id: p?._id,
      title: p?.title || "",
      description: p?.description || "",
      price: Number(p?.price ?? 0),
      duration: String(p?.duration || ""),
      carLimit: Number(p?.carLimit ?? 0),
      adHocPricePerCar: Number(p?.adHocPricePerCar ?? 0),
      targetRole: (p?.targetRole || "SELLER") as RoleType,
      OnlineImmediately: p?.OnlineImmediately,
      VisibleToEveryone: p?.VisibleToEveryone,
      createdAt: p?.createdAt || "",
    }));
  }, [res]);

  const columns: ColumnsType<PackageRow> = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Duration", dataIndex: "duration", key: "duration", width: 120 },
    { title: "Price (CHF)", dataIndex: "price", key: "price", width: 120 },
    { title: "Car Limit", dataIndex: "carLimit", key: "carLimit", width: 120 },
    {
      title: "Ad-hoc/Car",
      dataIndex: "adHocPricePerCar",
      key: "adHocPricePerCar",
      width: 120,
    },
    { title: "Role", dataIndex: "targetRole", key: "targetRole", width: 110 },
    {
      title: "Online",
      dataIndex: "OnlineImmediately",
      key: "OnlineImmediately",
      width: 100,
      render: (val) => (
        <Tag color={val ? "green" : "red"}>{val ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Visible",
      dataIndex: "VisibleToEveryone",
      key: "VisibleToEveryone",
      width: 100,
      render: (val) => (
        <Tag color={val ? "green" : "red"}>{val ? "Yes" : "No"}</Tag>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, row) => (
        <Button
          type="link"
          onClick={() => {
            setEditing(row);
            editForm.setFieldsValue({
              title: row.title,
              description: row.description,
              price: row.price,
              duration: row.duration,
              OnlineImmediately:
                row.OnlineImmediately === true ||
                row.OnlineImmediately === "true",
              VisibleToEveryone:
                row.VisibleToEveryone === true ||
                row.VisibleToEveryone === "true",
              targetRole: row.targetRole,
              carLimit: row.carLimit,
              adHocPricePerCar: row.adHocPricePerCar,
            });
            setEditOpen(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        duration: values.duration,
        OnlineImmediately: values.OnlineImmediately ? "true" : "false",
        VisibleToEveryone: values.VisibleToEveryone ? "true" : "false",
        targetRole: values.targetRole,
        carLimit: Number(values.carLimit),
        adHocPricePerCar: Number(values.adHocPricePerCar),
      };
      const res = await createPackage(payload).unwrap();
      message.success((res as any)?.message || "Package created");
      setOpen(false);
      form.resetFields();
      refetch();
    } catch (err: any) {
      message.error(err?.data?.message || "Failed to create package");
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await editForm.validateFields();
      const payload = {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        duration: values.duration,
        OnlineImmediately: values.OnlineImmediately ? "true" : "false",
        VisibleToEveryone: values.VisibleToEveryone ? "true" : "false",
        targetRole: values.targetRole,
        carLimit: Number(values.carLimit),
        adHocPricePerCar: Number(values.adHocPricePerCar),
      };
      const res = await updatePackage({
        id: editing?.id,
        data: payload,
      }).unwrap();
      message.success((res as any)?.message || "Package updated");
      setEditOpen(false);
      setEditing(null);
      editForm.resetFields();
      refetch();
    } catch (err: any) {
      message.error(err?.data?.message || "Failed to update package");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <Title>Subscriptions</Title>
        <Button type="primary" onClick={() => setOpen(true)}>
          Create New Package
        </Button>
      </div>
      <Table
        rowKey={(row) => row.id}
        columns={columns}
        dataSource={dataSource}
        loading={isFetching}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Create Package"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleCreate}
        confirmLoading={creating}
        okText="Create"
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="PRIVATE MEDIUM" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price (CHF)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true }]}
          >
            <Input placeholder="60 day" />
          </Form.Item>

          <Form.Item
            name="OnlineImmediately"
            label="Online Immediately"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="VisibleToEveryone"
            label="Visible To Everyone"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="targetRole"
            label="Target Role"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: "SELLER", value: "SELLER" },
                { label: "DELEAR", value: "DELEAR" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="carLimit"
            label="Car Limit"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            name="adHocPricePerCar"
            label="Ad-hoc Price Per Car"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={0.1} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Package"
        open={editOpen}
        onCancel={() => {
          setEditOpen(false);
          setEditing(null);
        }}
        onOk={handleUpdate}
        confirmLoading={updating}
        okText="Update"
      >
        <Form layout="vertical" form={editForm}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price (CHF)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true }]}
          >
            <Input placeholder="Duration" />
          </Form.Item>
          <Form.Item
            name="OnlineImmediately"
            label="Online Immediately"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="VisibleToEveryone"
            label="Visible To Everyone"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="targetRole"
            label="Target Role"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: "SELLER", value: "SELLER" },
                { label: "DELEAR", value: "DELEAR" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="carLimit"
            label="Car Limit"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            name="adHocPricePerCar"
            label="Ad-hoc Price Per Car"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={0.1} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Subscriptions;
