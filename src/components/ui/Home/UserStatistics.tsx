import { useUserStatisticsQuery } from "@/redux/apiSlices/dashboardSlice";
import { Spin } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserStatistics = () => {
  const { data: userStatistics, isFetching } = useUserStatisticsQuery({});

  if (isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  const userStats = userStatistics?.data || [];

  return (
    <div
      style={{ width: "100%", height: 350 }}
      className="px-5 bg-white rounded-2xl py-3"
    >
      <h4 className="mb-5 text-xl font-semibold mt-4">User Statistics</h4>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={userStats} syncId="anyId">
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="dealer"
            stroke="#00D307"
            fill="#C4A862"
          />
          <Line
            type="monotone"
            dataKey="allUsers"
            stroke="#FF9F40"
            fill="#FFC371"
          />
          <Line
            type="monotone"
            dataKey="privateSeller"
            stroke="#007BFF"
            fill="#A8D4FF"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStatistics;
