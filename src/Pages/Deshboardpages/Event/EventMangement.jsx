import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { toast } from "react-toastify";

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

  // Autofill React Hook Form when event selected
  React.useEffect(() => {
    if (selectedEvent) {
      setValue("title", selectedEvent.title);
      setValue("location", selectedEvent.location);
      setValue("description", selectedEvent.description);
      setValue("eventDate", selectedEvent.eventDate);
    }
  }, [selectedEvent]);

  if (isLoading) return <Loadingspinner></Loadingspinner>;

  // Patch API Submit
  const onSubmit = async (data) => {
    await axiosSecure
      .patch(`/events/${selectedEvent._id}`, data)
      .then((res) => {
        if (res.data.matchedCount) {
          toast.success("event update sucessfull!!");
          refetch();
        }
      });
    reset();
    setSelectedEvent(null);
  };

  const handleeventdelete = async (id) => {
    const res = await axiosSecure.delete(`/events/${id}`);
    console.log(res.data);
    if(res.data.deletedCount){
        toast.success('event delte sucessfll!!');
        refetch();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Event Management</h2>

      <Link to="/deshboard/manager/create-event">
        <button className="btn bg-orange-600 my-4">Create Event</button>
      </Link>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>location</th>
              <th>description</th>
              <th>createdAt</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((e, index) => (
              <tr key={e._id}>
                <td>{index + 1}</td>
                <td>{e.title}</td>
                <td>{e.location}</td>
                <td>{e.description}</td>
                <td>{e.createdAt}</td>
                <td>
                  <button
                    onClick={() => setSelectedEvent(e)}
                    className="btn btn-sm bg-green-600"
                  >
                    Edit Event
                  </button>

                  <button
                    onClick={() => handleeventdelete(e._id)}
                    className="btn btn-sm bg-orange-600"
                  >
                    Delete Event
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEvent && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Event</h3>

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
