import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", user: 4000, "private seller": 3200, dealer: 2800 },
  { name: "Feb", user: 3000, "private seller": 2500, dealer: 2200 },
  { name: "Mar", user: 4000, "private seller": 3300, dealer: 2900 },
  { name: "Apr", user: 2780, "private seller": 2300, dealer: 2100 },
  { name: "May", user: 1890, "private seller": 1600, dealer: 1400 },
  { name: "Jun", user: 2390, "private seller": 2000, dealer: 1800 },
  { name: "Jul", user: 3490, "private seller": 2900, dealer: 2600 },
  { name: "Aug", user: 1490, "private seller": 1300, dealer: 1200 },
  { name: "Sep", user: 3490, "private seller": 2900, dealer: 2600 },
  { name: "Oct", user: 3490, "private seller": 3000, dealer: 2700 },
  { name: "Nov", user: 3490, "private seller": 3100, dealer: 2800 },
  { name: "Dec", user: 3490, "private seller": 3200, dealer: 2900 },
];

const UserStatistics = () => {
  return (
    <div
      style={{ width: "100%", height: 350 }}
      className="px-5 bg-white rounded-2xl py-3"
    >
      <h4 className="mb-5 text-xl font-semibold mt-4">User Statistics</h4>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} syncId="anyId">
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="user"
            stroke="#00D307"
            fill="#C4A862"
          />
          <Line
            type="monotone"
            dataKey="private seller"
            stroke="#FF9F40"
            fill="#FFC371"
          />
          <Line
            type="monotone"
            dataKey="dealer"
            stroke="#007BFF"
            fill="#A8D4FF"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStatistics;
