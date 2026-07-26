import { createService } from "@/api/serviceApi";
import { getApiErrorMessage } from "@/util/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, ClipboardList, FileText, Info, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

const schema = z.object({
  serviceName: z.string().min(1, { message: "Service Name is required" }),
  serviceDescription: z.string().min(1, {
    message: "Service Description is required",
  }),
  serviceDate: z.string().min(1, { message: "Service Date is required" }),
});

type formDataType = z.infer<typeof schema>;

const CreateServiceModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formDataType>({
    resolver: zodResolver(schema),
  });

  const clearSubmitTimer = (): void => {
    if (submitTimerRef.current) {
      clearTimeout(submitTimerRef.current);
      submitTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearSubmitTimer();
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const queryClient = useQueryClient();

  const { mutateAsync: newService, isPending } = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      handleClose();
      toast.success("Service created successfully!");
      queryClient.invalidateQueries({ queryKey: ["activeServices"] });
      queryClient.invalidateQueries({ queryKey: ["upcomingServices"] });
      queryClient.invalidateQueries({ queryKey: ["serviceStats"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  const submitForm: SubmitHandler<formDataType> = async (data) => {
    try {
      await newService({
        serviceName: data.serviceName,
        description: data.serviceDescription,
        date: new Date(data.serviceDate).toISOString(),
      });
    } catch (error) {
      console.error("Error creating service:", error);
    }
    reset();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-start justify-between px-8 pt-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-900">
              Create New Service
            </h2>

            <p className="mt-2 text-lg text-slate-500">
              Add a new service for today. You can add slots after creation.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit(submitForm)}
          className="space-y-7 px-8 py-8"
        >
          {/* Service Name */}

          <div>
            <label className="mb-3 block text-lg font-semibold text-slate-800">
              Service Name
              {errors.serviceName?.message && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </label>

            <div className="relative">
              <ClipboardList className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                {...register("serviceName")}
                placeholder="Enter service name"
                className="h-14 w-full rounded-xl border border-slate-300 pl-12 pr-4 text-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Enter a name that represents this service
            </p>
          </div>

          {/* Description */}

          <div>
            <label className="mb-3 block text-lg font-semibold text-slate-800">
              Service Description
              {errors.serviceDescription && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </label>

            <div className="relative">
              <FileText className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

              <textarea
                {...register("serviceDescription")}
                rows={4}
                placeholder="Enter service description"
                className="w-full resize-none rounded-xl border border-slate-300 py-4 pl-12 pr-4 text-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Provide short details about this service
            </p>
          </div>

          {/* Date */}

          <div>
            <label className="mb-3 block text-lg font-semibold text-slate-800">
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
                className="h-14 w-full rounded-xl border border-slate-300 pl-12 pr-4 text-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Select the date for this service (today or a future date)
            </p>
          </div>

          {/* Info Box */}

          <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <Info className="mt-0.5 h-5 w-5 text-blue-600" />

            <p className="text-sm text-blue-700">
              You can add multiple slots for this service after it is created.
            </p>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4 pt-2">
            <button
              disabled={isPending}
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-8 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              {isPending ? "Creating Service..." : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceModal;
