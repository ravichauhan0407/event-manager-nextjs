"use server";
import connectDB from "@/lib/connectDb";
import CalendarEvent from "@/schema/calendar-event";
// Create Event
export async function createEvent({ desc, date }) {
  try {
    await connectDB();
    console.log(desc, date);
    const event = new CalendarEvent({ desc, date });
    await event.save();
    return { success: true };
  } catch (error) {
    console.error("Error creating event:", error.message);
    return Response.json({ success: false, data: error.message });
  }
}

export async function getEventById({ id }) {
  try {
    await connectDB();

    const events = await CalendarEvent.findById(id);
    return { success: true, data: JSON.parse(JSON.stringify(events)) };
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return { success: false, error: error.message };
  }
}

// Read All Events
export async function getEvents({ date }) {
  try {
    await connectDB();

    const events = await CalendarEvent.find({ date }).sort({ updatedAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(events)) };
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return { success: false, error: error.message };
  }
}

export async function getAllEventsOfByDateRange({ dateStart, dateEnd }) {
  try {
    await connectDB();

    const events = await CalendarEvent.find({
      date: { $gte: dateStart, $lte: dateEnd },
    }).sort({
      updatedAt: -1,
    });
    return { success: true, data: JSON.parse(JSON.stringify(events)) };
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return { success: false, error: error.message };
  }
}

// Update Event
export async function updateEvent(id, { desc }) {
  try {
    await connectDB();
    const event = await CalendarEvent.findByIdAndUpdate(id, { desc });
    if (!event) throw new Error("Event not found");
    return { success: true };
  } catch (error) {
    console.error("Error updating event:", error.message);
    return { success: false };
  }
}

// Delete Event
export async function deleteEvent(id) {
  try {
    await connectDB();
    const event = await CalendarEvent.findByIdAndDelete(id);
    if (!event) throw new Error("Event not found");
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error.message);
    return { success: false };
  }
}
