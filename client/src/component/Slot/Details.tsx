import NowServicing from "@/component/Slot/NowServicing";
import Progress from "@/component/Slot/Progress";
import QueueSection from "@/component/Slot/QueueSection";

const Details = ({
  progress,
  completed,
  total,
}: {
  progress: number;
  completed: number;
  total: number;
}) => {
  return (
    <section className="relative z-20 grid grid-cols-[25%_40%_30%] px-20 py-10 gap-10 justify-between items-start">
      <Progress progress={progress} completed={completed} total={total} />
      <NowServicing />
      <QueueSection />
    </section>
  );
};

export default Details;
