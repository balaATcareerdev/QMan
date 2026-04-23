import NowServicing from "@/component/Slot/NowServicing";
import Progress from "@/component/Slot/Progress";

const Details = ({ progress }: { progress: number }) => {
  return (
    <section className="relative z-20 grid grid-cols-[30%_70%] px-20 py-10 gap-10 justify-between items-start">
      <Progress progress={progress} />
      <NowServicing />
    </section>
  );
};

export default Details;
