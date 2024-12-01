import Calendar from "@/components/Calendar";

const page = async ({ searchParams }) => {
  const { day, month, year } = await searchParams;
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Calendar day={day} month={month} year={year} />
    </div>
  );
};

export default page;
