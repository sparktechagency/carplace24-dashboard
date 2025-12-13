import { useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
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
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetAllModelsQuery, // Needed to refetch models on brand delete if linked?
  // Actually original code refetched models on brand delete: `refetchModels()`.
  // So we need access to refetchModels or we just ignore it.
  // Ideally deleting a brand deletes models or we cascade.
  // The original code did `refetchModels()`.
  // To keep exactly same behavior I might need to import it.
} from "@/redux/apiSlices/brandAndModalSlice";
import { getImageUrl } from "@/utils/getImageUrl";

type Brand = {
  id: string;
  name: string;
  logo?: string;
};

const BrandSection = () => {
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [brandForm] = Form.useForm();
  const [logoFiles, setLogoFiles] = useState<UploadFile[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | undefined>();

  const {
    data: getAllBrands,
    isFetching,
    refetch: refetchBrands,
  } = useGetAllBrandsQuery({});

  // Use this to refetch models when a brand is deleted/updated if necessary
  const { refetch: refetchModels } = useGetAllModelsQuery({});

  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrandMut] = useDeleteBrandMutation();

  const allBrands = getAllBrands?.data || [];

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

  const brandColumns = [
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? (
          <Image
            src={getImageUrl(image)}
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg"
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gray-100" />
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
          ></Button>
          <Popconfirm
            title="Delete brand?"
            onConfirm={() => deleteBrand((record as any)?._id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (isFetching) {
    return <Spin />;
  }

  return (
    <div className="bg-white rounded-xl p-4 border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Brands</h2>
        <Button
          type="primary"
          size="small"
          icon={<PlusOutlined />}
          onClick={openCreateBrand}
        >
          Add
        </Button>
      </div>
      <Table
        columns={brandColumns}
        dataSource={allBrands}
        size="small"
        rowKey="_id"
        pagination={{ pageSize: 12, size: "small" }}
      />

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
    </div>
  );
};

export default BrandSection;
