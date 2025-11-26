import { useTotalSubscribersQuery } from "@/redux/apiSlices/dashboardSlice";
import { Spin } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SubscriptionStatistics = () => {
  const { data: subscriptionStates, isFetching } = useTotalSubscribersQuery({});

  if (isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  const subscriptionStats = subscriptionStates?.data || [];

  return (
    <div
      style={{ width: "100%", height: 350 }}
      className="px-5 py-3 bg-white rounded-2xl"
    >
      <h4 className="mb-5 mt-4 text-xl font-semibold">
        Subscription Statistics
      </h4>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={subscriptionStats}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#007AFF" stopOpacity={1} />
              <stop offset="100%" stopColor="#007AFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalSubscribers"
            stroke="#007AFF"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionStatistics;
