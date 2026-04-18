import { colorBg } from "@/assets/export";
import BubbleDisplayMulti from "@/component/Common/BubbleDisplayMulti";

const HeroSection = ({
  serviceName,
  activeSlots,
  avgTime,
  total,
  queueLength,
}: {
  serviceName: string;
  activeSlots: number;
  avgTime: number;
  total: number;
  queueLength: number;
}) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-position-[-120%_100%] bg-size-[1200px] bg-no-repeat z-20 left-0 top-0"
        style={{ backgroundImage: `url("${colorBg}")` }}
      />
      <div className="relative pt-40 z-20 px-30 text-7xl">
        <h1 className="text-white">
          Welcome to{" "}
          <span className="font-bold text-[#D295FF]">{serviceName}</span>
        </h1>
        <hr className="mt-4 border-white" />
        <div className="flex justify-center items-center gap-5 pt-10">
          <BubbleDisplayMulti
            text1={"Avg Time"}
            text3={"of active slots"}
            value={Math.round(avgTime)}
            type={"Sec"}
          />
          <BubbleDisplayMulti text1={"Active Slots"} value={activeSlots} />
          <BubbleDisplayMulti text1={"Total Slots"} value={total} />
          <BubbleDisplayMulti
            text1={"People in"}
            text2={"Q"}
            value={queueLength}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
