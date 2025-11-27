import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import Title from "../../components/common/Title";
import {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} from "@/redux/apiSlices/publicSlice";
import toast from "react-hot-toast";
import { Spin } from "antd";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data: termsAndCondition, isLoading } = useGetTermsAndConditionsQuery(
    {}
  );
  const [updateTermsAndConditions, { isLoading: isUpdating }] =
    useUpdateTermsAndConditionsMutation();
  if (isLoading || isUpdating) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const termsAndConditionData = termsAndCondition?.data?.content || "";

  const termsDataSave = async () => {
    const data = {
      content: content,
    };
    console.log(data);

    try {
      const res = await updateTermsAndConditions(data).unwrap();
      if (res.success) {
        toast.success(
          res?.message || "Terms and Conditions updated successfully"
        );
        setContent(res.data.content);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch {
      throw new Error("Something Is wrong at try");
    }
  };

  return (
    <div className="p-6 bg-white">
      <Title className="mb-4">Terms and Conditions</Title>

      <JoditEditor
        ref={editor}
        value={termsAndConditionData}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={termsDataSave}
          type="submit"
          className="bg-primary text-white w-[160px] h-[42px] rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
