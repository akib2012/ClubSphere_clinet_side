import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const EventMangement = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const { register, handleSubmit, setValue, reset } = useForm();

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/event/by-wonermail");
      return res.data;
    },
  });

  React.useEffect(() => {
    if (selectedEvent) {
      setValue("title", selectedEvent.title);
      setValue("location", selectedEvent.location);
      setValue("description", selectedEvent.description);
      setValue("eventDate", selectedEvent.eventDate);
    }
  }, [selectedEvent, setValue]);

  if (isLoading) return <Loadingspinner />;

  const onSubmit = async (data) => {
    const res = await axiosSecure.patch(`/events/${selectedEvent._id}`, data);
    if (res.data.matchedCount) {
      toast.success("Event updated successfully!");
      refetch();
    }
    reset();
    setSelectedEvent(null);
  };

  const handleeventdelete = async (id) => {
    const res = await axiosSecure.delete(`/events/${id}`);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed && res.data.deletedCount) {
        Swal.fire("Deleted!", "Event has been deleted.", "success");
        refetch();
      }
    });
  };

  return (
    <div className="p-2 md:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-2xl font-bold">Event Management</h2>
        <Link to="/deshboard/manager/create-event">
          <button className="btn bg-orange-600 text-white w-full sm:w-auto">
            Create Event
          </button>
        </Link>
      </div>

      {/* ---------- Desktop Table ---------- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((e, index) => (
              <tr key={e._id}>
                <td>{index + 1}</td>
                <td>{e.title}</td>
                <td>{e.location}</td>
                <td className="max-w-xs truncate">{e.description}</td>
                <td>{e.createdAt}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => setSelectedEvent(e)}
                    className="btn btn-sm bg-green-600 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleeventdelete(e._id)}
                    className="btn btn-sm bg-orange-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile Cards ---------- */}
      <div className="md:hidden space-y-4">
        {events.map((e, index) => (
          <div
            key={e._id}
            className="bg-base-100 rounded-xl shadow p-4 space-y-2"
          >
            <p className="text-sm text-gray-500">#{index + 1}</p>
            <h3 className="font-bold text-lg">{e.title}</h3>
            <p>
              <span className="font-semibold">📍</span> {e.location}
            </p>
            <p className="text-sm text-gray-600">{e.description}</p>
            <p className="text-sm">📅 {e.createdAt}</p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedEvent(e)}
                className="btn btn-sm bg-green-600 text-white flex-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleeventdelete(e._id)}
                className="btn btn-sm bg-orange-600 text-white flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Edit Modal ---------- */}
      {selectedEvent && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Edit Event</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input
                {...register("title")}
                className="input input-bordered w-full"
                placeholder="Event Title"
              />
              <input
                {...register("location")}
                className="input input-bordered w-full"
                placeholder="Location"
              />
              <input
                {...register("eventDate")}
                className="input input-bordered w-full"
                placeholder="Event Date"
              />
              <textarea
                {...register("description")}
                className="textarea textarea-bordered w-full"
                placeholder="Description"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="btn"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default EventMangement;
