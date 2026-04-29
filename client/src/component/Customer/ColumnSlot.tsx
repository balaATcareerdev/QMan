import ColumnElem from "@/component/Customer/ColumnElem";
import type { BookingType } from "@/services/bookings.api";

const ColumnSlot = ({
  title,
  count,
  tokens,
  type,
}: {
  title: string;
  count: number;
  tokens: BookingType[];
  type: "active" | "upcoming" | "backlog" | "history";
}) => {
  return (
    <div className="bg-[#342430]/40 min-h-96 rounded-md">
      <div className="flex justify-center items-center p-2 gap-5">
        <p className="text-lg">{title}</p>
        <div className="bg-[#4B283B] w-10 rounded-sm h-10 flex justify-center items-center">
          <span className="text-center">{count}</span>
        </div>
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
            />
          ))
        ) : (
          <div>
            <p>No Data</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ColumnSlot;
