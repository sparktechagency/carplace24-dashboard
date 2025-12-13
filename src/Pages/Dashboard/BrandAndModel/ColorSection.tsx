import { useState } from "react";
import { Button, Form, Input, Modal, Popconfirm, Spin, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import {
  useGetAllColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} from "@/redux/apiSlices/brandAndModalSlice";

type Color = {
  id: string;
  color: string;
};

const ColorSection = () => {
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<Color | null>(null);
  const [colorForm] = Form.useForm();

  const {
    data: getAllColors,
    isFetching: isFetchingColors,
    refetch: refetchColors,
  } = useGetAllColorsQuery({});

  const [createColor] = useCreateColorMutation();
  const [updateColor] = useUpdateColorMutation();
  const [deleteColorMut] = useDeleteColorMutation();

  const allColors = getAllColors?.data || [];

  const openCreateColor = () => {
    setEditingColor(null);
    colorForm.resetFields();
    setColorModalOpen(true);
  };

  const openEditColor = (record: any) => {
    setEditingColor(record);
    colorForm.setFieldsValue({
      color: record?.color,
    });
    setColorModalOpen(true);
  };

  const submitColor = async () => {
    const values = await colorForm.validateFields();
    if ((editingColor as any)?._id) {
      await updateColor({
        id: (editingColor as any)._id,
        color: values.color,
      }).unwrap();
      toast.success("Color updated");
    } else {
      await createColor({ color: values.color }).unwrap();
      toast.success("Color added");
    }
    setColorModalOpen(false);
    setEditingColor(null);
    colorForm.resetFields();
    refetchColors();
  };

  const deleteColor = async (id: string) => {
    await deleteColorMut(id).unwrap();
    toast.success("Color deleted");
    refetchColors();
  };

  const getColorHex = (name: string) => {
    const normalize = (s: string) => s.trim().toLowerCase();
    const n = normalize(name);

    const map: Record<string, string> = {
      anthracite: "#383E42",
      anthrazit: "#383E42",
      bordeaux: "#800020",
      beige: "#F5F5DC",
      champagne: "#F7E7CE",
      burgundy: "#800020",
      "metallic black": "#000000", // Metallic usually just looks like the base color in flat UI
      "metallic white": "#FFFFFF",
      "metallic silver": "#C0C0C0",
      "metallic grey": "#808080",
      "metallic gray": "#808080",
      "metallic blue": "#0000FF",
      "metallic red": "#FF0000",
    };

    if (map[n]) return map[n];
    return name; // Fallback to original (works for standard colors and hex)
  };

  const colorColumns = [
    {
      title: "Color Name",
      dataIndex: "color",
      key: "color",
      render: (color: string) => (
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full border shadow-sm"
            style={{
              backgroundColor: getColorHex(color || "").toLowerCase(),
            }}
          ></div>
          {color}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => openEditColor(record)}
          ></Button>
          <Popconfirm
            title="Delete color?"
            onConfirm={() => deleteColor((record as any)?._id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (isFetchingColors) {
    return <Spin />;
  }

  return (
    <div className="bg-white rounded-xl p-4 border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Colors</h2>
        <Button
          type="primary"
          size="small"
          icon={<PlusOutlined />}
          onClick={openCreateColor}
        >
          Add
        </Button>
      </div>
      <Table
        columns={colorColumns}
        dataSource={allColors}
        rowKey="_id"
        size="small"
        pagination={{ pageSize: 12, size: "small" }}
      />

      <Modal
        centered
        open={colorModalOpen}
        onCancel={() => setColorModalOpen(false)}
        onOk={submitColor}
        okText={editingColor ? "Update" : "Create"}
        title={editingColor ? "Edit Color" : "Add Color"}
        width={560}
      >
        <Form form={colorForm} layout="vertical">
          <Form.Item
            name="color"
            label="Color Name"
            rules={[{ required: true, message: "Enter color name" }]}
          >
            <Input placeholder="Enter color name (e.g. Red, Green, Blue)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ColorSection;
