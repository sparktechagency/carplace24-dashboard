import { useRevenueStatsQuery } from "@/redux/apiSlices/dashboardSlice";
import { Spin } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SalesTrackingChart = () => {
  const { data: earningStates, isFetching } = useRevenueStatsQuery({});

  if (isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  const earningStats = earningStates?.data || [];

  return (
    <div className="px-5 bg-white rounded-2xl py-3">
      <h1 className="text-xl my-5 font-semibold">Earning Statistics</h1>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          width={500}
          height={300}
          data={earningStats}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="privateSellerRevenue"
            fill="#6DBD44"
            barSize={20}
            radius={[20, 20, 0, 0]}
          />
          <Bar
            dataKey="dealerRevenue"
            fill="#007AFF"
            barSize={20}
            radius={[20, 20, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrackingChart;
