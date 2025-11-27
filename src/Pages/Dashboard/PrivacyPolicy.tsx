import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import Title from "@/components/common/Title";
import {
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "@/redux/apiSlices/publicSlice";

import { Spin } from "antd";

const PrivacyPolicy = () => {
  const editor = useRef<any>(null);
  const [content, setContent] = useState<string>("");

  const { data: getPrivacyPolicy, isLoading } = useGetPrivacyPolicyQuery({});
  const [updatePrivacyPolicy, { isLoading: isUpdating }] =
    useUpdatePrivacyPolicyMutation();

  if (isLoading || isUpdating) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const privacyPolicyData = getPrivacyPolicy?.data?.content || "";

  const termsDataSave = async () => {
    const data = {
      content: content,
    };

    try {
      const res = await updatePrivacyPolicy(data).unwrap();
      if (res.success) {
        toast.success(res?.message || "Privacy Policy updated successfully");
        setContent(res.data.content);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white">
      <Title className="mb-4">Privacy Policy</Title>

      <JoditEditor
        ref={editor}
        value={privacyPolicyData}
        onChange={(newContent: string) => {
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

export default PrivacyPolicy;
