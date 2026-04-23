import { tokens } from "@/assets";
import PrimaryPurpSlot from "@/component/Buttons/PrimaryPurpSlot";
import SlotPrimaryGrad from "@/component/Buttons/SlotPrimaryGrad";
import type { TokenType } from "@/types/types";
import { getFormattedTime } from "@/util/slotUtils";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const NowServicing = () => {
  const [currentToken, setCurrentToken] = useState<TokenType | null>(null);

  const { slotId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCurrentToken = async () => {
    const token = tokens.find(
      (t) => t.slotId === slotId && t.status === "in_progress",
    );
    if (token) {
      setCurrentToken(token);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCurrentToken();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="bg-linear-to-b from-[#C87EFF]/15 to-[#5A0A95]/15 border border-[#5F5F5F]
     px-10 py-5 flex flex-col gap-5 rounded-sm"
    >
      {isLoading ? (
        <div className="h-full">
          <Loader className="animate-spin text-[#9711FB] mx-auto" size={48} />
        </div>
      ) : currentToken ? (
        <>
          <div className="grid grid-cols-[80%_20%] gap-2">
            <div className="flex justify-around items-center gap-5 border rounded-sm p-5">
              <h1 className="font-light text-lg text-[#B7B7B7]">
                Now Servicing
              </h1>
              <div className="flex justify-center items-center">
                <span className="font-light text-5xl">
                  #{currentToken.slotNumber}
                </span>
              </div>
            </div>

            <div>
              <SlotPrimaryGrad text="Next Token" />
            </div>
          </div>

          <div className="flex gap-2">
            <PrimaryPurpSlot text="Start Token" />
            <button className="border border-[#9711FB] hover:bg-[#9711FB]/10 font-light textsm rounded-sm px-2.5 py-1 transition-colors duration-300 ease-in-out">
              Skip Token
            </button>
          </div>

          <div className="pt-10 font-light text-sm text-[#9711FB] flex flex-col gap-2">
            <p>
              Status:{" "}
              <span className="text-white">
                {currentToken.status === "in_progress"
                  ? "In Progress"
                  : "unknown"}
              </span>
            </p>

            <p>
              Booked at:{" "}
              <span className="text-white">
                {getFormattedTime(currentToken.createdAt)}
              </span>
            </p>

            <p>
              Started Service:{" "}
              <span className="text-white">
                {getFormattedTime(currentToken.startedServiceTime!)}
              </span>
            </p>

            <p>
              Next:{" "}
              <span className="text-white">
                #
                {currentToken.next?.nextId
                  ? currentToken.next.slotNumber
                  : "No Next Token"}
              </span>
            </p>
          </div>
        </>
      ) : (
        <div>
          <p>No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default NowServicing;
