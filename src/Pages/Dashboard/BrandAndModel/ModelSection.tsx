import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Spin,
  Table,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import {
  useGetAllModelsQuery,
  useGetAllBrandsQuery,
  useCreateModelMutation,
  useUpdateModelMutation,
  useDeleteModelMutation,
} from "@/redux/apiSlices/brandAndModalSlice";

type Model = {
  id: string;
  title: string;
  brandId: string;
};

const ModelSection = () => {
  const [modelModalOpen, setModelModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [modelForm] = Form.useForm();

  // We need brands for the select dropdown
  const { data: getAllBrands } = useGetAllBrandsQuery({});

  const {
    data: getAllModels,
    isFetching: isFetchingModels,
    refetch: refetchModels,
  } = useGetAllModelsQuery({});

  const [createModel] = useCreateModelMutation();
  const [updateModel] = useUpdateModelMutation();
  const [deleteModelMut] = useDeleteModelMutation();

  const allModels = getAllModels?.data || [];
  const allBrands = getAllBrands?.data || [];

  const brandOptions = allBrands?.map((b: any) => ({
    label: b?.brand,
    value: b?._id,
  }));

  const openCreateModel = () => {
    setEditingModel(null);
    modelForm.resetFields();
    setModelModalOpen(true);
  };

  const openEditModel = (record: any) => {
    setEditingModel(record);
    modelForm.setFieldsValue({
      title: record?.model,
      brandId: record?.brand?._id || record?.brand,
    });
    setModelModalOpen(true);
  };

  const submitModel = async () => {
    const values = await modelForm.validateFields();
    const payload = { model: values.title, brand: values.brandId };
    if ((editingModel as any)?._id) {
      await updateModel({
        id: (editingModel as any)._id,
        model: payload,
      }).unwrap();
      toast.success("Model updated");
    } else {
      await createModel(payload).unwrap();
      toast.success("Model added");
    }
    setModelModalOpen(false);
    setEditingModel(null);
    modelForm.resetFields();
    refetchModels();
  };

  const deleteModel = async (id: string) => {
    await deleteModelMut(id).unwrap();
    toast.success("Model deleted");
    refetchModels();
  };

  const modelColumns = [
    {
      title: "Title",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (_: any, record: any) => record?.brand?.brand || "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => openEditModel(record)}
          ></Button>
          <Popconfirm
            title="Delete model?"
            onConfirm={() => deleteModel((record as any)?._id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (isFetchingModels) {
    return <Spin />;
  }

  return (
    <div className="bg-white rounded-xl p-4 border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Models</h2>
        <Button
          type="primary"
          size="small"
          icon={<PlusOutlined />}
          onClick={openCreateModel}
        >
          Add
        </Button>
      </div>
      <Table
        columns={modelColumns}
        dataSource={allModels}
        rowKey="_id"
        size="small"
        pagination={{ pageSize: 12, size: "small" }}
      />

      <Modal
        centered
        open={modelModalOpen}
        onCancel={() => setModelModalOpen(false)}
        onOk={submitModel}
        okText={editingModel ? "Update" : "Create"}
        title={editingModel ? "Edit Model" : "Add Model"}
        width={560}
      >
        <Form form={modelForm} layout="vertical">
          <Form.Item
            name="title"
            label="Model Title"
            rules={[{ required: true, message: "Enter model title" }]}
          >
            <Input placeholder="Enter model title" />
          </Form.Item>
          <Form.Item
            name="brandId"
            label="Assigned Brand"
            rules={[{ required: true, message: "Select a brand" }]}
          >
            <Select options={brandOptions} placeholder="Select brand" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModelSection;
