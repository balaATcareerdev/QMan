import ColumnSlot from "@/component/Customer/ColumnSlot";
import {
  fetchUserBookings,
  type BookingsResponse,
} from "@/services/bookings.api";
import { Calendar, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Booked = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookedSlots, setBookedSlots] = useState<BookingsResponse>({
    active: [],
    upcoming: [],
    backlog: [],
    history: [],
  });

  const displayDate = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(new Date());

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUserBookings().then((bookings) => {
        setBookedSlots(bookings);
        setIsLoading(false);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-linear-to-b from-black to-[#19040F] min-h-screen pt-20 text-white pb-20">
      <div className="flex flex-col gap-10 pt-5 pl-5">
        <h1 className="flex text-3xl">Booked</h1>

        <div className="flex">
          <div className="bg-gray-400/15 flex items-center gap-1 p-2 rounded-sm border-[#303030] border">
            <Calendar size={20} />
            <span className="text-xl font-light">{displayDate}</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center pt-20 min-h-screen">
          <LoaderCircle size={40} className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 px-10 mt-20">
          <ColumnSlot
            title="Active"
            count={bookedSlots.active.length}
            tokens={bookedSlots.active}
            type="active"
            color="#fa68a8"
            subTitle="Currently Ongoing"
          />
          <ColumnSlot
            title="Upcoming"
            count={bookedSlots.upcoming.length}
            tokens={bookedSlots.upcoming}
            type="upcoming"
            color="#ad5ff1"
            subTitle="Starts soon"
          />

          <ColumnSlot
            title="Backlog"
            count={bookedSlots.backlog.length}
            tokens={bookedSlots.backlog}
            type="backlog"
            subTitle="Pending actions"
            color="#ffa822"
          />

          <ColumnSlot
            title="History"
            count={bookedSlots.history.length}
            tokens={bookedSlots.history}
            type="history"
            color="#6df38b"
            subTitle="Completed booking"
          />
        </div>
      )}
    </div>
  );
};

export default Booked;
