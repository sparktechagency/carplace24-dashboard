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

const data = [
  {
    month: "Jan",
    privateSeller: 3200,
    dealer: 4100,
  },
  {
    month: "Feb",
    privateSeller: 2800,
    dealer: 3600,
  },
  {
    month: "Mar",
    privateSeller: 3500,
    dealer: 4200,
  },
  {
    month: "Apr",
    privateSeller: 3100,
    dealer: 3900,
  },
  {
    month: "May",
    privateSeller: 2900,
    dealer: 3700,
  },
  {
    month: "Jun",
    privateSeller: 3300,
    dealer: 4100,
  },
  {
    month: "Jul",
    privateSeller: 3600,
    dealer: 4400,
  },
  {
    month: "Aug",
    privateSeller: 3800,
    dealer: 4600,
  },
  {
    month: "Sep",
    privateSeller: 3700,
    dealer: 4500,
  },
  {
    month: "Oct",
    privateSeller: 4000,
    dealer: 4800,
  },
  {
    month: "Nov",
    privateSeller: 4200,
    dealer: 5000,
  },
  {
    month: "Dec",
    privateSeller: 4500,
    dealer: 5300,
  },
];

const SalesTrackingChart = () => {
  return (
    <div className="px-5 bg-white rounded-2xl py-3">
      <h1 className="text-xl my-5 font-semibold">Earning Statistics</h1>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          width={500}
          height={300}
          data={data}
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
            dataKey="privateSeller"
            fill="#6DBD44"
            barSize={20}
            radius={[20, 20, 0, 0]}
          />
          <Bar
            dataKey="dealer"
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
