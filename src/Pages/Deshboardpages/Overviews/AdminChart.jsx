import React from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 300, pv: 4567, amt: 2400 },
  { name: "Page C", uv: 320, pv: 1398, amt: 2400 },
  { name: "Page D", uv: 200, pv: 9800, amt: 2400 },
  { name: "Page E", uv: 278, pv: 3908, amt: 2400 },
  { name: "Page F", uv: 189, pv: 4800, amt: 2400 },
];

// #endregion

const AdminChart = () => {
 const axiosSecure = useAxiosSecure();

 const {data, isLoading} = useQuery({
    queryKey: ['paymentchart'],
    queryFn: async() => {
        const res = await axiosSecure.get('/payments')
        return res.data;
    }
 })

console.log(data);



  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="clubName" />
          //club name
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          //price
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminChart;
