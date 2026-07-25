import type { SlotDataType } from "@/component/HomeComponents/ActiveServiceCard";
import SlotDetailsPane from "@/component/HomeComponents/SlotDetailsPane";

const SlotsListClient = ({ slots }: { slots: SlotDataType[] }) => {
  return (
    <>
      <h4 className="mb-5 text-sm font-bold tracking-wide text-slate-500 uppercase">
        Slots Status
      </h4>

      <div className="space-y-6">
        {slots.map((slot, index) => (
          <SlotDetailsPane key={index} slot={slot} />
        ))}
      </div>
    </>
  );
};

export default SlotsListClient;
