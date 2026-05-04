import { tokens } from "@/assets";
import LiveStatus from "@/component/Slot/LiveStatus";
import type { TokenType } from "@/types/types";
import { getFormattedTime } from "@/util/slotUtils";
import {
  Activity,
  ArrowRight,
  Clock,
  Loader,
  Play,
  SkipForwardIcon,
  User,
} from "lucide-react";
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
    <div className="bg-[#9711FB]/10 border border-[#2a1652] p-10 rounded-2xl">
      {isLoading ? (
        <div className="h-full">
          <Loader className="animate-spin text-[#9711FB] mx-auto" size={48} />
        </div>
      ) : currentToken ? (
        <div>
          <h1 className="text-xl">Now Servicing</h1>

          <div className="grid grid-cols-[15%_50%_1fr] mt-2 gap-5 p-5 border border-[#451d70] rounded-sm bg-[#bc82f8]/8">
            <div className="flex items-center">
              <User
                size={40}
                color="#bc82f8"
                className="w-15 h-15 rounded-full bg-[#231838] p-2"
              />
            </div>
            <div>
              <h1 className="text-lg">Servicing</h1>
              <span className="text-5xl text-[#7945a1]">
                #{currentToken.slotNumber}
              </span>
            </div>
            <div>
              <button className="flex items-center bg-linear-to-r from-[#7918d9] to-[#822c93] hover:from-[#7918d9]/40 hover:to-[#822c93]/40 p-2 rounded-sm transition-colors duration-300 ease-in-out justify-center">
                Next Token
                <ArrowRight size={25} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5 px-5 justify-start mt-5">
            <button
              className="flex gap-2 items-center px-3 py-2 bg-linear-to-r
            from-[#682aca] to-[#571abc] hover:to-[#571abc]/50 hover:from-[#571abc]/40 rounded-sm transition-colors duration-300 ease-in-out"
            >
              <Play size={20} color="white" />
              <p>Start Token</p>
            </button>
            <button className="flex gap-2 items-center px-3 py-2  rounded-sm transition-colors duration-300 ease-in-out border border-[#bc82f8] hover:bg-[#bc82f8]/10">
              <SkipForwardIcon size={20} color="#bc82f8" />
              <p className="text-[#bc82f8]">Skip Token</p>
            </button>
          </div>

          <hr className="w-full border-cols-[#bc82f8] mt-10 mb-5 mx-auto  border border-[#451d70]" />

          <div>
            <h1 className="text-sm">Live Status</h1>
            <div className="mt-3 flex flex-col gap-2">
              <LiveStatus
                Icon={Activity}
                header="Status"
                value={currentToken.status}
              />

              <LiveStatus
                Icon={Clock}
                header="Booked At"
                value={getFormattedTime(currentToken.createdAt)}
              />

              <LiveStatus
                Icon={Clock}
                header="Started Service"
                value={
                  currentToken.startedServiceTime
                    ? getFormattedTime(currentToken.startedServiceTime)
                    : "Not Started"
                }
              />

              <LiveStatus
                Icon={SkipForwardIcon}
                header="Next"
                value={
                  currentToken.next
                    ? `#${currentToken.next.slotNumber}`
                    : "No Next Token"
                }
              />
            </div>
          </div>
        </div>
      ) : (
        // <>
        //   <div className="grid grid-cols-[80%_20%] gap-2">
        //     <div className="flex justify-around items-center gap-5 border rounded-sm p-5">
        //       <h1 className="font-light text-lg text-[#B7B7B7]">
        //         Now Servicing
        //       </h1>
        //       <div className="flex justify-center items-center">
        //         <span className="font-light text-5xl">
        //           #{currentToken.slotNumber}
        //         </span>
        //       </div>
        //     </div>

        //     <div>
        //       <SlotPrimaryGrad text="Next Token" />
        //     </div>
        //   </div>

        //   <div className="flex gap-2">
        //     <PrimaryPurpSlot text="Start Token" />
        //     <button className="border border-[#9711FB] hover:bg-[#9711FB]/10 font-light text-sm rounded-sm px-2.5 py-1 transition-colors duration-300 ease-in-out">
        //       Skip Token
        //     </button>
        //   </div>

        //   <div className="pt-10 font-light text-sm text-[#9711FB] flex flex-col gap-2">
        //     <p>
        //       Status:{" "}
        //       <span className="text-white">
        //         {currentToken.status === "in_progress"
        //           ? "In Progress"
        //           : "unknown"}
        //       </span>
        //     </p>

        //     <p>
        //       Booked at:{" "}
        //       <span className="text-white">
        //         {getFormattedTime(currentToken.createdAt)}
        //       </span>
        //     </p>

        //     <p>
        //       Started Service:{" "}
        //       <span className="text-white">
        //         {currentToken.startedServiceTime
        //           ? getFormattedTime(currentToken.startedServiceTime)
        //           : "Not Started"}
        //       </span>
        //     </p>

        //     <p>
        //       Next:{" "}
        //       <span className="text-white">
        //         {currentToken.next?.nextId
        //           ? `#${currentToken.next.slotNumber}`
        //           : "No Next Token"}
        //       </span>
        //     </p>
        //   </div>
        // </>
        <div>
          <p>No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default NowServicing;
