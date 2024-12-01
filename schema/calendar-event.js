import mongoose from "mongoose";

const CalendarEvent = mongoose.Schema(
  {
    desc: String,
    date: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.CalendarEvent ||
  mongoose.model("CalendarEvent", CalendarEvent);
