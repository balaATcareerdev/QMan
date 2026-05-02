import { service_lamp } from "@/assets/export";
import BubbleDisplayMulti from "@/component/Common/BubbleDisplayMulti";
import { Activity, Calendar, History, Users } from "lucide-react";

const HeroSection = ({
  serviceName,
  serviceDesc,
  activeSlots,
  avgTime,
  total,
  queueLength,
}: {
  serviceName: string;
  serviceDesc: string;
  activeSlots: number;
  avgTime: number;
  total: number;
  queueLength: number;
}) => {
  return (
    <section className="pt-30 min-h-screen text-white">
      <div className="grid grid-cols-2 px-30 gap-5 items-center">
        <div>
          <h1 className="text-4xl">Welcome to</h1>
          <h2 className="text-6xl font-semibold text-[#db62d4]">
            {serviceName}
          </h2>
          <p className="text-lg text-gray-300 mt-5">{serviceDesc}</p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={service_lamp}
            alt=""
            className="w-full max-w-175 h-auto object-contain"
          />
        </div>
      </div>

      <div className="flex justify-around items-center px-20">
        <BubbleDisplayMulti
          header="Avg Time"
          Icon={History}
          subHeader="of active slots"
          value={Math.round(avgTime)}
          type="Sec"
          color="#9a29f9"
        />

        <BubbleDisplayMulti
          header="Active Slots"
          Icon={Activity}
          subHeader="of active slots"
          value={activeSlots}
          color="#2dc16a"
          state="Currently Running"
        />

        <BubbleDisplayMulti
          header="Total Slots"
          Icon={Calendar}
          subHeader="of active slots"
          value={total}
          color="#3ca2f2"
          state="Created"
        />

        <BubbleDisplayMulti
          header="People in Queue"
          Icon={Users}
          subHeader="of active slots"
          value={queueLength}
          color="#fe8217"
          state="Waiting"
        />
      </div>
    </section>
  );
};

export default HeroSection;
