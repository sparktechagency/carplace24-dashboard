import { useState } from "react";
import { Button, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import FaqModal from "../../components/ui/FAQ/FaqModal";
import toast from "react-hot-toast";
import {
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "@/redux/apiSlices/publicSlice";

const Faq = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [modalData, setModalData] = useState<any | null>(null);

  const { data: faqRes, isFetching, refetch } = useGetFaqQuery({});
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  const faqData = faqRes?.data || [];

  const handleEdit = (record: any) => {
    setModalData(record);
    setOpenAddModel(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFaq(id).unwrap();
      toast.success("FAQ deleted");
      refetch();
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      width: "40%",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      width: "50%",
      render: (text: string) => <div className="max-w-md truncate">{text}</div>,
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record?._id || record?.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">FAQ Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setModalData(null);
            setOpenAddModel(true);
          }}
        >
          Add FAQ
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          columns={columns}
          dataSource={faqData}
          rowKey={(row) => row._id || row.key}
          loading={isFetching}
          pagination={{
            pageSize: 10,
          }}
        />
      </div>

      <FaqModal
        openAddModel={openAddModel}
        setOpenAddModel={setOpenAddModel}
        modalData={modalData}
        setModalData={setModalData}
        onSubmit={async (values) => {
          try {
            if (modalData?._id) {
              await updateFaq({ _id: modalData._id, ...values }).unwrap();
              toast.success("FAQ updated");
            } else {
              await createFaq(values).unwrap();
              toast.success("FAQ added");
            }
            refetch();
          } catch (e) {
            toast.error("Save failed");
            throw e;
          }
        }}
      />
    </div>
  );
};

export default Faq;
