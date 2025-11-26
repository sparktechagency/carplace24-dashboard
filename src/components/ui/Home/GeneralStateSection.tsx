import { FaUsers } from "react-icons/fa6";
import { useGeneralStatsQuery } from "@/redux/apiSlices/dashboardSlice";
import { Spin } from "antd";

const GeneralStateSection = () => {
  const { data: generalStates, isFetching } = useGeneralStatsQuery({});

  if (isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const state = generalStates?.data;

  return (
    <div className="grid md:grid-cols-4 gap-6 md:h-[90px]">
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">Total User</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalUser !== undefined ? state.totalUser : "N/A"}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">Total Dealer</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalDealers !== undefined ? state.totalDealers : "N/A"}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">
            Total Private Seller
          </h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalprivateSeller !== undefined
              ? state.totalprivateSeller
              : "N/A"}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">Total Earning</h2>
          <h3 className="text-center text-2xl font-semibold">
            ${state?.totalIncome !== undefined ? state.totalIncome : "N/A"}
          </h3>
        </div>
      </div>
      {/* <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">Total Revenue</h2>
          <h3 className="text-center text-2xl font-semibold">
            ${state?.totalRevenue !== undefined ? state.totalRevenue : "N/A"}
          </h3>
        </div>
      </div> */}
    </div>
  );
};

export default GeneralStateSection;
