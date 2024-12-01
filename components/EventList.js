import React from "react";
import EventTile from "./EventTile";
import { getDateInDesiredFormat } from "@/lib/helpers";
import { getEvents } from "@/app/api/data";

const EventList = async ({ day, month, year }) => {
  const date = getDateInDesiredFormat({ day, month, year });

  const res = await getEvents({ date });
  const list = res.data;

  return (
    <div className="flex flex-col gap-4 py-4 overflow-y-auto overflow-x-hidden">
      {list?.map((item) => (
        <EventTile data={item} />
      ))}
    </div>
  );
};

export default EventList;
