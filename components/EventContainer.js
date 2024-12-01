import { createEvent, saveEvent } from "@/app/api/data";
import cancelIcon from "../public/cancel.svg";
import AddEventTIle from "./AddEventTIle";
import EventList from "./EventList";

const EventContainer = (props) => {
  const { isEditing } = props;

  return (
    <div className="rounded-md gap-12 flex flex-col">
      <AddEventTIle {...props} isEditing={isEditing} />
      <EventList {...props} />
    </div>
  );
};

export default EventContainer;
