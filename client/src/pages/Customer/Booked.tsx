import ColumnSlot from "@/component/Customer/ColumnSlot";

const Booked = () => {
  return (
    <div className="bg-linear-to-b from-black to-[#19040F] min-h-screen pt-20 text-white pb-20">
      <div className="flex flex-col gap-10">
        <h1 className="flex justify-center items-center text-3xl">Booked</h1>

        <h2 className="text-2xl px-10">11-04-2026</h2>
      </div>

      <div className="grid grid-cols-4 gap-5 px-10 mt-20">
        <ColumnSlot title="Active" count={2} />
        <ColumnSlot title="Upcoming" count={1} />
        <ColumnSlot title="Backlog" count={3} />
        <ColumnSlot title="History" count={1} />
      </div>
    </div>
  );
};

export default Booked;
