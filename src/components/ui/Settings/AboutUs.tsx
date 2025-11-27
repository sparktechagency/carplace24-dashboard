import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import Title from "@/components/common/Title";
import {
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from "@/redux/apiSlices/publicSlice";
import { Spin } from "antd";

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data: getAboutData, isLoading } = useGetAboutUsQuery({});
  const [updateAboutUs, { isLoading: isUpdating }] = useUpdateAboutUsMutation();

  if (isLoading || isUpdating) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const aboutUsData = getAboutData?.data?.content || "";
  console.log(aboutUsData);

  const termsDataSave = async () => {
    const data = {
      content: content,
    };

    try {
      const res = await updateAboutUs(data);
      if (res?.data?.success) {
        toast.success(res?.data?.message || "About Us updated successfully");
        setContent(data.content);
      } else {
        toast.error(res?.data?.message || "Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white">
      <Title className="mb-4">About Us</Title>

      <JoditEditor
        ref={editor}
        value={aboutUsData}
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

export default AboutUs;
