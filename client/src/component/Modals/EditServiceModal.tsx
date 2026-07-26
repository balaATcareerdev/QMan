import type { SelectedServiceType } from "@/pages/Client/Home";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, ClipboardList, FileText, Info, X } from "lucide-react";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

const schema = z.object({
  serviceName: z.string().min(1, { message: "Service Name is required" }),
  serviceDescription: z.string().min(1, {
    message: "Service Description is required",
  }),
  serviceDate: z.string().min(1, { message: "Service Date is required" }),
});

type formDataType = z.infer<typeof schema>;

const EditServiceModal = ({
  open,
  onClose,
  service,
}: {
  open: boolean;
  onClose: () => void;
  service: SelectedServiceType;
}) => {
  const toDateInputValue = (value: string) => value.slice(0, 10);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceName: service.serviceName,
      serviceDescription: service.serviceDescription,
      serviceDate: toDateInputValue(service.date),
    },
  });

  useEffect(() => {
    reset({
      serviceName: service.serviceName,
      serviceDescription: service.serviceDescription,
      serviceDate: toDateInputValue(service.date),
    });
  }, [service, reset]);

  const submitForm: SubmitHandler<formDataType> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-start justify-between px-8 pt-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Edit Service</h2>

            <p className="mt-2 text-base text-slate-500">
              Update the details of your service.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(submitForm)}
          className="space-y-6 px-8 py-8"
        >
          {/* Service Name */}

          <div>
            <label className="mb-3 block text-base font-semibold text-slate-800">
              Service Name
              {errors.serviceName && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </label>

            <div className="relative">
              <ClipboardList className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                {...register("serviceName")}
                className="h-14 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Enter a name that represents this service
            </p>
          </div>

          {/* Description */}

          <div>
            <label className="mb-3 block text-base font-semibold text-slate-800">
              Service Description
              {errors.serviceDescription && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </label>

            <div className="relative">
              <FileText className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

              <textarea
                rows={3}
                {...register("serviceDescription")}
                className="w-full resize-none rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Provide short details about this service
            </p>
          </div>

          {/* Date */}

          <div>
            <label className="mb-3 block text-base font-semibold text-slate-800">
              Service Date
              {errors.serviceDate && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </label>

            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="date"
                {...register("serviceDate")}
                className="h-14 w-full rounded-xl border border-slate-300 pl-12 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Select the date for this service (today or a future date)
            </p>
          </div>

          {/* Info */}

          <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

            <p className="text-sm text-blue-700">
              Changing the date will reschedule all slots under this service.
            </p>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-7 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-7 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              {isSubmitting ? "Updating Service..." : "Update Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;
