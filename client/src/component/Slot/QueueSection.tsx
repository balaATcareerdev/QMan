import QueueList from "@/component/Slot/QueueList";
import { fetchQueueList } from "@/services/queue.api";
import type { TokenType } from "@/types/types";
import { LoaderCircle, NotepadText } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const QueueSection = () => {
  const [upcomingQueue, setUpcomingQueue] = useState<TokenType[]>([]);
  const { slotId } = useParams<{ slotId: string }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slotId) return;

    const timer = setTimeout(() => {
      fetchQueueList(slotId).then((queues) => {
        setUpcomingQueue(queues);
        setIsLoading(false);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [slotId]);

  return (
    <section className="p-4 border border-[#2a1652] rounded-2xl">
      <div className="flex justify-between items-center">
        <h1>Upcoming Queue</h1>
        <div className="border border-[#451d70] bg-[#451d70]/30 px-2 py-1 rounded-sm">
          {isLoading ? (
            <div>
              <LoaderCircle size={20} className="animate-spin" />
            </div>
          ) : (
            <span>{upcomingQueue.length} People</span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <LoaderCircle size={30} className="animate-spin" />
        </div>
      ) : (
        <div className="mt-3">
          {upcomingQueue.length > 0 ? (
            <div className="flex flex-col gap-3">
              {upcomingQueue.map((q) => (
                <QueueList
                  key={q.id}
                  slotNumber={q.slotNumber}
                  status={q.status}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-[#4e2579]">
              <p>No upcoming items in the queue.</p>
            </div>
          )}

          <div className="mt-5 p-5 bg-[#7d37ed]/10 border border-[#210c43] rounded-sm flex gap-2 flex-col">
            <div className="flex items-center text-[#7d37ed] gap-2">
              <NotepadText size={40} />
              <span className="text-lg">Note</span>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-lg text-[#aa7cf4]">
                Please manage the queue efficiently to ensure smooth service
                flow
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default QueueSection;
