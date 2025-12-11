import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { toast } from "react-toastify";

const ClubMembersPanel = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: memberships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["clubmembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/membership");
      return res.data;
    },
  });

  const handleExpire = async (id) => {
    await axiosSecure.patch(`/membership/${id}/expire`).then((res) => {
      console.log(res);
      if (res.data.modifiedCount) {
        refetch();
      }
    });
    toast.success("Membership expired!");
  };

  if (isLoading) {
    return <Loadingspinner></Loadingspinner>;
  }

  return (
    <div className="p-4 md:p-6 bg-base-200 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Club Members Panel</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300 text-base">
            <tr className="min-h-[60px]">
              <th className="py-4">#</th>
              <th className="py-4">Email</th>
              <th className="py-4">Status</th>
              <th className="py-4">Joined</th>
              <th className="py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {memberships.map((m, idx) => (
              <tr
                key={m._id}
                className="hover:bg-base-100 transition-colors min-h-[60px]"
              >
                <th className="py-4">{idx + 1}</th>
                <td className="break-words max-w-[180px] py-4">
                  {m.userEmail}
                </td>
                <td className="py-4">
                  <span
                    className={`badge badge-md ${
                      m.status === "active" ? "badge-success" : "badge-error"
                    } text-white`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="py-4">{m.createdAt}</td>
                <td className="py-4">
                  <button
                    onClick={() => handleExpire(m._id)}
                    className={`btn ${
                      m.status === "active"
                        ? "bg-green-600 hover:bg-orange-700"
                        : "bg-orange-600 hover:bg-red-700"
                    } text-white btn-sm md:btn-md w-full md:w-auto`}
                  >
                    {m.status === "active" ? "Set Expired" : "Expired"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default ClubMembersPanel;
