"use client";
import { createEvent, updateEvent } from "@/app/api/data";
import { getDateInDesiredFormat } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import React, { useReducer, useState } from "react";

const AddEventTIle = ({ day, month, year, details }) => {
  const isEditing = !!details;
  const [desc, setDesc] = useState(details?.desc || "");
  const router = useRouter();

  const handleSaveEvent = async () => {
    if (!desc) {
      return;
    }
    try {
      if (isEditing) {
        await updateEvent(details._id, { desc });
        setDesc("");
        const [day, month, year] = details.date.split("-");
        router.push(`/?day=${day}&month=${Number(month) - 1}&year=${year}`);
      } else {
        const date = getDateInDesiredFormat({
          day,
          month,
          year,
        });

        await createEvent({ desc, date });
        setDesc("");
        router.refresh();
      }
    } catch (e) {
      //
    }
  };

  return (
    <div className="flex gap-3 flex-col items-center">
      <textarea
        type="text"
        className="border-1 border-gray-900 w-full resize-none"
        multiple={true}
        placeholder="Enter event details here..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSaveEvent();
          }
        }}
      />
      <div className="grid grid-cols-2 w-full gap-4">
        <button
          onClick={() => setDesc("")}
          className="border border-secondary border-solid bg-transparent text-secondary w-full"
        >
          Clear
        </button>
        <button className="bg-secondary  w-full" onClick={handleSaveEvent}>
          {isEditing ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddEventTIle;
