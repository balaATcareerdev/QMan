import { slotsData, tokens } from "@/assets";
import Details from "@/component/Slot/Details";
import HeroSection from "@/component/Slot/HeroSection";
import PoolList from "@/component/Slot/PoolList";
import type { SlotType, TokenType } from "@/types/types";
import { getTimeDifference } from "@/util/slotUtils";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

const SlotPage = () => {
  const { slotId } = useParams();

  const [tokensData, setTokensData] = useState<TokenType[]>([]);

  const [slot, setSlot] = useState<SlotType | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchTokens = async () => {
    setTokensData(tokens);
    setIsLoading(false);
  };

  const fetchSlot = async () => {
    const slotFound = slotsData.find((s) => s.id === slotId);
    setSlot(slotFound ?? null);
  };

  useEffect(() => {
    const time = setTimeout(() => {
      fetchTokens();
      fetchSlot();
    }, 2000);

    return () => clearTimeout(time);
  }, []);

  const stats = useMemo(() => {
    const slotToken = tokensData.filter((token) => token.slotId === slotId);

    const completedTokens = slotToken.filter(
      (token) => token.status === "completed",
    );

    const avgTime =
      completedTokens.length > 0
        ? completedTokens.reduce((acc, token) => {
            const diff = getTimeDifference(
              token.startedServiceTime!,
              token.endServiceTime!,
            );

            const totalSeconds =
              diff.hours * 3600 + diff.minutes * 60 + diff.seconds;

            return acc + totalSeconds;
          }, 0) / completedTokens.length
        : 0;

    const progress =
      slotToken.length > 0
        ? (completedTokens.length / slotToken.length) * 100
        : 0;

    return {
      totalBooked: slotToken.length,
      completed: completedTokens.length,
      remaining: slotToken.length - completedTokens.length,
      avgTime,
      progress,
      slotToken,
    };
  }, [slotId, tokensData]);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white relative flex justify-center items-center">
        <LoaderCircle className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-[#120736] via-[#000000] to-[#120736] min-h-screen text-white relative">
      {slot ? (
        <>
          <section className="z-20">
            <HeroSection
              stats={stats}
              slotName={slot.slotName}
              startTime={slot.startTime}
              endTime={slot.endTime}
              status={slot.status}
            />
            <Details
              progress={stats.progress}
              completed={stats.completed}
              total={stats.totalBooked}
            />
            <PoolList />
          </section>
        </>
      ) : (
        <div>No slot found</div>
      )}
    </div>
  );
};

export default SlotPage;
