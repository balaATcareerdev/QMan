import ColumnElem from "@/component/Customer/ColumnElem";

const ColumnSlot = ({ title, count }: { title: string; count: number }) => {
  return (
    <div className="bg-[#342430]/40 min-h-96 rounded-md">
      <div className="flex justify-center items-center p-2 gap-5">
        <p className="text-lg">{title}</p>
        <div className="bg-[#4B283B] w-10 rounded-sm h-10 flex justify-center items-center">
          <span className="text-center">{count}</span>
        </div>
      </div>

      <section className="px-5 py-5 flex flex-col gap-5">
        <ColumnElem />
        <ColumnElem />
      </section>
    </div>
  );
};

export default ColumnSlot;
