"use client";
import { deleteEvent } from "@/app/api/data";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EventTile = ({ data }) => {
  const router = useRouter();

  const handleDelete = async (e) => {
    try {
      await deleteEvent(data._id);
      router.refresh();
    } catch (e) {
      //
    }
  };

  return (
    <div className="text-white flex flex-col gap-4 p-4 rounded-md hover:scale-y-105 hover:rounded-md cursor-pointer bg-secondary">
      <p>{data.desc}</p>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => router.push(`/${data._id}`)}
          className="bg-white text-secondary text-center rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-white text-secondary text-center rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventTile;
