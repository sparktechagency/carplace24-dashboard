import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", subscriptions: 600 },
  { name: "Feb", subscriptions: 950 },
  { name: "Mar", subscriptions: 800 },
  { name: "Apr", subscriptions: 1150 },
  { name: "May", subscriptions: 1600 },
  { name: "Jun", subscriptions: 1150 },
  { name: "Jul", subscriptions: 1900 },
  { name: "Aug", subscriptions: 2100 },
  { name: "Sep", subscriptions: 1850 },
  { name: "Oct", subscriptions: 2200 },
  { name: "Nov", subscriptions: 2050 },
  { name: "Dec", subscriptions: 2300 },
];

const SubscriptionStatistics = () => {
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
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#007AFF" stopOpacity={1} />
              <stop offset="100%" stopColor="#007AFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="subscriptions"
            stroke="#007AFF"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionStatistics;
