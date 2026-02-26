import { useState } from "react";
import { Table, Button, Modal, Upload, message, Popconfirm, Image } from "antd";
import { PlusOutlined, DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import {
  useGetAllBannersQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} from "@/redux/apiSlices/blogSlice";
import { getImageUrl } from "@/utils/getImageUrl";

const { Dragger } = Upload;

const BannerManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  // API Hooks
  const { data: bannersData, isLoading: isFetching } = useGetAllBannersQuery();
  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const showModal = () => {
    setIsModalOpen(true);
    setFileList([]);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBanner(id).unwrap();
      message.success("Banner deleted successfully");
    } catch (error) {
      message.error("Failed to delete banner");
    }
  };

  const handleAddBanner = async () => {
    if (fileList.length === 0) {
      message.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", fileList[0].originFileObj);

    try {
      await createBanner(formData).unwrap();
      message.success("Banner added successfully");
      handleCancel();
    } catch (error) {
      message.error("Failed to add banner");
    }
  };

  const columns = [
    {
      title: "Banner No",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: "Image Preview",
      dataIndex: "image",
      key: "image",
      render: (img: string) => (
        <Image
          src={getImageUrl(img)}
          width={150}
          height={70}
          alt="Banner"
          className="w-32 h-16 object-cover rounded-md border border-gray-200"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Are you sure you want to delete this banner?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            className="flex items-center"
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    fileList,
    beforeUpload: (file) => {
      setFileList([
        {
          uid: "-1",
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
          originFileObj: file,
        },
      ]);
      return false; // Prevent auto upload
    },
    onRemove: () => {
      setFileList([]);
    },
    listType: "picture",
    maxCount: 1,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm min-h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Banner Management
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          className="bg-primary hover:bg-primary/90"
        >
          Add Banner
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={bannersData?.data}
        loading={isFetching}
        rowKey="_id"
        className="border border-gray-100 rounded-lg"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Add New Banner"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleAddBanner}
            loading={isCreating}
            className="bg-primary"
          >
            Done
          </Button>,
        ]}
        width={600}
      >
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4">
            Upload a high-quality image for the home page banner slider.
            Recommended size: 1920x600px.
          </p>
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="text-primary" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibited from uploading
              company data or other banned files.
            </p>
          </Dragger>
        </div>
      </Modal>
    </div>
  );
};

export default BannerManagement;
