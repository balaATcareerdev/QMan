import ColumnSlot from "@/component/Customer/ColumnSlot";
import {
  fetchUserBookings,
  type BookingsResponse,
} from "@/services/bookings.api";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Booked = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookedSlots, setBookedSlots] = useState<BookingsResponse>({
    active: [],
    upcoming: [],
    backlog: [],
    history: [],
  });

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
      <div className="flex flex-col gap-10">
        <h1 className="flex justify-center items-center text-3xl">Booked</h1>

        <h2 className="text-2xl px-10">11-04-2026</h2>
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
          />
          <ColumnSlot
            title="Upcoming"
            count={bookedSlots.upcoming.length}
            tokens={bookedSlots.upcoming}
            type="upcoming"
          />
          <ColumnSlot
            title="Backlog"
            count={bookedSlots.backlog.length}
            tokens={bookedSlots.backlog}
            type="backlog"
          />
          <ColumnSlot
            title="History"
            count={bookedSlots.history.length}
            tokens={bookedSlots.history}
            type="history"
          />
        </div>
      )}
    </div>
  );
};

export default Booked;
