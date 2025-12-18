import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";

const EventRegestation = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: eventRegistrations = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["eventRegistrations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/eventRegistrations");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loadingspinner></Loadingspinner>;
  }

  console.log(eventRegistrations);

  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold my-5 ">
          Event Registers
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>UserEmail</th>
              <th>Status</th>
              <th>Regester Time</th>
            </tr>
          </thead>
          <tbody>
            {eventRegistrations.map((event, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{event.useremail}</td>
                <td>{event.status}</td>
                <td>{event.regeesteredat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventRegestation;
