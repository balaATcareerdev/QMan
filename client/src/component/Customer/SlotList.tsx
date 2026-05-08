import { getFormattedTime } from "@/util/slotUtils";

const SlotList = ({
  startingTime,
  endingTime,
  click,
}: {
  startingTime: string;
  endingTime: string;
  click: () => void;
}) => {
  return (
    <div className="flex justify-between items-center">
      <p>
        {getFormattedTime(startingTime)} - {getFormattedTime(endingTime)}
      </p>
      <button
        onClick={click}
        className="bg-linear-to-t from-[#C275FB] to-[#6D9DFC] active:from-[#C275FB]/50 active:to-[#6D9DFC]/50 text-lg rounded-sm px-2.5 py-1 transition-colors duration-200 ease-in-out"
      >
        Book
      </button>
    </div>
  );
};

export default SlotList;
