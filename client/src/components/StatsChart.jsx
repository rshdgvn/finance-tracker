import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";

const StatsChart = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();

        const months = Array.from({ length: 12 }, (_, i) => i + 1);
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const chartData = months.map((m) => {
          const incomeObj = result.income.find((i) => i.month === m);
          const expensesObj = result.expenses.find((e) => e.month === m);
          return {
            month: monthNames[m - 1],
            income: incomeObj ? parseFloat(incomeObj.total) : 0,
            expenses: expensesObj ? parseFloat(expensesObj.total) : 0,
          };
        });

        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch monthly stats:", err);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" angle={-35} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#82ca9d"
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ff4d4f"
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
