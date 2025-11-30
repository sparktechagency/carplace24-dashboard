import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Upload,
  Image,
  Spin,
  Tag,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { getImageUrl } from "@/utils/getImageUrl";
import {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/redux/apiSlices/blogSlice";

type BlogRecord = {
  _id: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  image: string;
  createdAt?: string;
};

const BlogsManagement = () => {
  const { data, isFetching } = useGetAllBlogsQuery();
  const [createBlog, { isLoading: creating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: deleting }] = useDeleteBlogMutation();

  const blogs: BlogRecord[] = data?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogRecord | null>(null);
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewBlog, setViewBlog] = useState<BlogRecord | null>(null);

  const openAddModal = () => {
    setEditingBlog(null);
    setFile(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (record: BlogRecord) => {
    setEditingBlog(record);
    setFile(null);
    form.setFieldsValue({
      title: record.title,
      type: record.type,
      description: record.description,
      tags: record.tags || [],
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("type", values.type);
      formData.append("description", values.description);
      (values.tags || []).forEach((t: string) => formData.append("tags[]", t));
      if (file) formData.append("image", file);

      if (editingBlog) {
        await updateBlog({ id: editingBlog._id, formData }).unwrap();
        toast.success("Blog updated");
      } else {
        await createBlog(formData).unwrap();
        toast.success("Blog created");
      }

      setIsModalOpen(false);
      form.resetFields();
      setFile(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (record: BlogRecord) => {
    try {
      await deleteBlog(record._id).unwrap();
      toast.success("Blog deleted");
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const openViewModal = (record: BlogRecord) => {
    setViewBlog(record);
    setIsViewModalOpen(true);
  };

  const columns: ColumnsType<BlogRecord> = [
    {
      title: "#",
      key: "serial",
      width: 70,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 120,
      render: (src: string) => (
        <Image
          src={getImageUrl(src)}
          width={80}
          height={50}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (value: string) => <Tag>{value}</Tag>,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <div className="flex flex-wrap gap-1">
          {(tags || []).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value?: string) =>
        value ? new Date(value).toLocaleDateString() : "-",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 160,
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            icon={<EyeOutlined />}
            onClick={() => openViewModal(record)}
            size="small"
          >
            View
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this blog?"
            onConfirm={() => handleDelete(record)}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              loading={deleting}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Blogs Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
          Add New Blog
        </Button>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={blogs}
        pagination={{ pageSize: 10 }}
        size="small"
      />

      <Modal
        title={editingBlog ? "Edit Blog" : "Add Blog"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        confirmLoading={creating || updating}
        okText={editingBlog ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Blog title" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Type is required" }]}
          >
            <Select placeholder="Select type">
              <Select.Option value="Promotion">Promotion</Select.Option>
              <Select.Option value="News">News</Select.Option>
              <Select.Option value="Article">Article</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea rows={4} placeholder="Write blog description" />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select
              mode="tags"
              tokenSeparators={[","]}
              placeholder="Add tags"
            />
          </Form.Item>
          <Form.Item label="Image">
            <Upload
              beforeUpload={(f) => {
                setFile(f as File);
                return false;
              }}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
            {editingBlog && !file && editingBlog.image && (
              <div className="mt-3">
                <Image src={getImageUrl(editingBlog.image)} width={120} />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Blog Details"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={
          <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
        }
        width={800}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        {viewBlog && (
          <div>
            <Image
              src={getImageUrl(viewBlog.image)}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                maxHeight: 500,
                objectFit: "contain",
              }}
            />
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{viewBlog.title}</h2>
                <Tag>{viewBlog.type}</Tag>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {(viewBlog.tags || []).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <div className="mt-4 whitespace-pre-line">
                {viewBlog.description}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogsManagement;
