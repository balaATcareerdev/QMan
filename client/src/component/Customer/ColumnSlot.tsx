import ColumnElem from "@/component/Customer/ColumnElem";
import type { BookingType } from "@/services/bookings.api";
import { hexToRgba } from "@/util/slotUtils";
import {
  Calendar,
  CheckCircle,
  Clock,
  HourglassIcon,
  NotepadText,
  ShieldQuestionMark,
} from "lucide-react";

const Icon = [
  { title: "active", Icon: Calendar },
  { title: "upcoming", Icon: Clock },
  { title: "backlog", Icon: HourglassIcon },
  { title: "history", Icon: CheckCircle },
];

const ColumnSlot = ({
  title,
  count,
  tokens,
  type,
  color,
  subTitle,
}: {
  title: string;
  count: number;
  tokens: BookingType[];
  type: "active" | "upcoming" | "backlog" | "history";
  color: string;
  subTitle: string;
}) => {
  const Logo =
    Icon.find((item) => item.title === type)?.Icon || ShieldQuestionMark;

  return (
    <div className="flex flex-col gap-2">
      <section className="flex gap-3 bg-[#ffffff]/7 border border-[#ffffff]/15 p-4 rounded-sm">
        <div
          style={{ backgroundColor: hexToRgba(color, 0.1) }}
          className="w-12 h-12 rounded-full flex justify-center items-center border border-[#a78fd7]/30"
        >
          <Logo color={color} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xl">{title}</span>
          <span style={{ color: hexToRgba(color, 1) }} className="text-2xl">
            {count}
          </span>
          <span className="text-sm text-gray-500">{subTitle}</span>
        </div>
      </section>
      <section className="bg-[#ffffff]/7 border border-[#ffffff]/15 rounded-sm">
        <div className="p-2">
          <span className="capitalize">
            {title}{" "}
            <span
              style={{
                color: hexToRgba(color, 1),
              }}
              className="text-lg"
            >
              {count}
            </span>
          </span>
        </div>

        <section className="px-5 py-5 flex flex-col gap-5">
          {tokens.length > 0 ? (
            tokens.map((token) => (
              <ColumnElem
                key={token.tokenId}
                slotName={token.slotName}
                serviceName={token.serviceName}
                startTime={token.startTime}
                endTime={token.endTime}
                type={type}
                Icon={Logo}
                color={color}
              />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="bg-[#ffffff]/7 w-15 h-15 rounded-full flex justify-center items-center">
                <NotepadText color={color} size={30} />
              </div>
              <p>No Data</p>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default ColumnSlot;
