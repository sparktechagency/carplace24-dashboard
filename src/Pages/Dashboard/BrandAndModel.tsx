import { useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Select,
  Spin,
  Table,
  Upload,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import toast from "react-hot-toast";
import {
  useGetAllBrandsQuery,
  useGetAllModelsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useCreateModelMutation,
  useUpdateModelMutation,
  useDeleteModelMutation,
} from "@/redux/apiSlices/brandAndModalSlice";
import { getImageUrl } from "@/utils/getImageUrl";

type Brand = {
  id: string;
  name: string;
  logo?: string;
};

type Model = {
  id: string;
  title: string;
  brandId: string;
};

const BrandAndModel = () => {
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [modelModalOpen, setModelModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [brandForm] = Form.useForm();
  const [modelForm] = Form.useForm();

  const [logoFiles, setLogoFiles] = useState<UploadFile[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | undefined>();

  const {
    data: getAllBrands,
    isFetching,
    refetch: refetchBrands,
  } = useGetAllBrandsQuery({});
  const {
    data: getAllModels,
    isFetching: isFetchingModels,
    refetch: refetchModels,
  } = useGetAllModelsQuery({});

  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrandMut] = useDeleteBrandMutation();
  const [createModel] = useCreateModelMutation();
  const [updateModel] = useUpdateModelMutation();
  const [deleteModelMut] = useDeleteModelMutation();

  if (isFetching || isFetchingModels) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const allBrands = getAllBrands?.data || [];
  const allModels = getAllModels?.data || [];
  console.log(allBrands, allModels);

  const brandOptions = allBrands?.map((b: any) => ({
    label: b?.brand,
    value: b?._id,
  }));

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const openCreateBrand = () => {
    setEditingBrand(null);
    setLogoFiles([]);
    setLogoPreview(undefined);
    brandForm.resetFields();
    setBrandModalOpen(true);
  };

  const openEditBrand = (record: any) => {
    setEditingBrand(record);
    brandForm.setFieldsValue({ name: record?.brand });
    setLogoPreview(record?.image ? getImageUrl(record.image) : undefined);
    setLogoFiles([]);
    setBrandModalOpen(true);
  };

  const handleBrandLogoChange = async ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setLogoFiles(fileList);
    const f = fileList[0]?.originFileObj as File | undefined;
    if (f) {
      const b64 = await getBase64(f);
      setLogoPreview(b64);
    } else {
      setLogoPreview(undefined);
    }
  };

  const submitBrand = async () => {
    const values = await brandForm.validateFields();
    const fd = new FormData();
    fd.append("brand", values.name);
    const file = logoFiles[0]?.originFileObj as File | undefined;
    if (file) {
      fd.append("image", file);
    }
    if ((editingBrand as any)?._id) {
      await updateBrand({
        id: (editingBrand as any)._id,
        formData: fd,
      }).unwrap();
      toast.success("Brand updated");
    } else {
      await createBrand(fd).unwrap();
      toast.success("Brand added");
    }
    setBrandModalOpen(false);
    setEditingBrand(null);
    brandForm.resetFields();
    setLogoFiles([]);
    setLogoPreview(undefined);
    refetchBrands();
  };

  const deleteBrand = async (id: string) => {
    await deleteBrandMut(id).unwrap();
    toast.success("Brand deleted");
    refetchBrands();
    refetchModels();
  };

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

  const brandColumns = [
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? (
          <Image
            src={getImageUrl(image)}
            width={44}
            height={44}
            className="w-11 h-11 rounded-lg"
          />
        ) : (
          <div className="w-11 h-11 rounded-lg bg-gray-100" />
        ),
    },
    {
      title: "Name",
      dataIndex: "brand",
      key: "brand",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => openEditBrand(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete brand?"
            onConfirm={() => deleteBrand((record as any)?._id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

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
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete model?"
            onConfirm={() => deleteModel((record as any)?._id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Brands</h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openCreateBrand}
            >
              Add Brand
            </Button>
          </div>
          <Table
            columns={brandColumns}
            dataSource={allBrands}
            size="small"
            rowKey="_id"
            pagination={{ pageSize: 8 }}
          />
        </div>

        <div className="bg-white rounded-2xl p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Models</h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openCreateModel}
            >
              Add Model
            </Button>
          </div>
          <Table
            columns={modelColumns}
            dataSource={allModels}
            rowKey="_id"
            size="small"
            pagination={{ pageSize: 8 }}
          />
        </div>
      </div>

      <Modal
        centered
        open={brandModalOpen}
        onCancel={() => setBrandModalOpen(false)}
        onOk={submitBrand}
        okText={editingBrand ? "Update" : "Create"}
        title={editingBrand ? "Edit Brand" : "Add Brand"}
        width={560}
      >
        <Form form={brandForm} layout="vertical">
          <Form.Item
            name="name"
            label="Brand Name"
            rules={[{ required: true, message: "Enter brand name" }]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>
          <div className="flex items-center gap-4">
            <Upload
              listType="picture-card"
              fileList={logoFiles}
              beforeUpload={() => false}
              onChange={handleBrandLogoChange}
              accept="image/*"
            >
              {logoFiles.length >= 1 ? null : (
                <div className="flex flex-col items-center">
                  <UploadOutlined />
                  <span className="mt-1 text-xs">Upload Logo</span>
                </div>
              )}
            </Upload>
            {logoPreview ? (
              <Image
                src={logoPreview}
                width={80}
                height={80}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gray-100" />
            )}
          </div>
        </Form>
      </Modal>

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

export default BrandAndModel;
