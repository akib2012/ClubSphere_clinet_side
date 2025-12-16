import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";

const ManageClub = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedClub, setSelectedClub] = useState(null);
  const [clubStats, setClubStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const {
    data: clubs = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
  });

  const handleclubaprove = async (club) => {
    try {
      const updatestatus = { status: "aproved" };
      const res = await axiosSecure.patch(
        `/clubs/${club._id}/status`,
        updatestatus
      );

      if (res.data.modifiedCount) {
        toast.success("Club approved successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to approve club");
    }
  };

  const handleclubreject = async (club) => {
    try {
      const updatestatus = { status: "rejected" };
      const res = await axiosSecure.patch(
        `/clubs/${club._id}/status`,
        updatestatus
      );

      if (res.data.modifiedCount) {
        toast.success("Club rejected successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to reject club");
    }
  };

  
  const handleviewstat = async (club) => {
    try {
      setSelectedClub(club);
      setLoadingStats(true);
      setClubStats(null);

      const res = await axiosSecure.get(`/clubss/${club._id}/stats`);
      setClubStats(res.data);

      document.getElementById("club_stats_modal").showModal();
    } catch (error) {
      toast.error("Failed to load club stats");
    } finally {
      setLoadingStats(false);
    }
  };

  if (isPending) {
    return <div className="text-center py-10">Loading clubs...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Club Name</th>
            <th>Manager Email</th>
            <th>Status</th>
            <th>Membership Fee</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {clubs.map((club, index) => (
            <tr key={club._id}>
              <th>{index + 1}</th>
              <td>{club.clubName}</td>
              <td>{club.managerEmail}</td>
              <td>
                <span
                  className={`badge ${
                    club.status === "aproved"
                      ? "badge-success"
                      : club.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {club.status}
                </span>
              </td>
              <td>{club.membershipFee || "Free"}</td>

              <td className="flex gap-2 flex-wrap">
                {club.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleclubaprove(club)}
                      className="btn btn-sm btn-success"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleclubreject(club)}
                      className="btn btn-sm btn-error"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => handleviewstat(club)}
                      className="btn btn-sm btn-info"
                    >
                      View Stats
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleviewstat(club)}
                    className="btn btn-sm btn-info"
                  >
                    View Stats
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog id="club_stats_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-4">Club Statistics</h3>

          {loadingStats && <p>Loading statistics...</p>}

          {!loadingStats && clubStats && (
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Club Name:</span>{" "}
                {selectedClub?.clubName}
              </p>

              <p>
                <span className="font-semibold">Total Members Joined:</span>{" "}
                {clubStats.totalMembers}
              </p>

              <p>
                <span className="font-semibold">Total Events Created:</span>{" "}
                {clubStats.totalEvents}
              </p>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageClub;
