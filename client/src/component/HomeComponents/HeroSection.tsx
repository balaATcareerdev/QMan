import { Calendar } from "@/assets/export";
import { formatDate } from "@/util/dateUtilts";
import { CalendarDays, Plus, SlidersHorizontal } from "lucide-react";

interface HeroSectionProps {
  setOpenCreateModal: (value: boolean) => void;
}

const HeroSection = ({ setOpenCreateModal }: HeroSectionProps) => {
  return (
    <section className="flex flex-col-reverse items-center justify-between gap-12 rounded-3xl bg-white px-8 py-12 lg:flex-row">
      {/* Left Content */}
      <div className="max-w-2xl">
        {/* Date Badge */}
        <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-gray-100 px-5 py-3">
          <CalendarDays className="h-5 w-5 text-slate-500" />
          <span className="text-lg font-medium text-slate-700">
            {formatDate(new Date(), "dddd, d MMMM yyyy")}
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold leading-tight text-slate-900">
          Today's Operations
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-xl text-2xl leading-relaxed text-slate-500">
          Manage all queues and services scheduled for today.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-5">
          <button
            className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-5 text-lg font-semibold text-white shadow-sm transition hover:bg-blue-700"
            onClick={() => setOpenCreateModal(true)}
          >
            <Plus className="h-6 w-6" />
            Create Today's Service
          </button>

          <button className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-8 py-5 text-lg font-semibold text-slate-800 transition hover:bg-gray-50">
            <SlidersHorizontal className="h-5 w-5" />
            Manage Services
          </button>
        </div>
      </div>

      {/* Right Illustration */}
      <div className="flex justify-center lg:w-[42%]">
        <img
          src={Calendar}
          alt="Calendar Illustration"
          className="w-full max-w-md object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
