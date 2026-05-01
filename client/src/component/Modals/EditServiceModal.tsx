import type { ServiceType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { LoaderCircle } from "lucide-react";
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
  service: ServiceType;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceName: service.name,
      serviceDescription: service.description,
      serviceDate: new Date(service.createdAt).toISOString().split("T")[0],
    },
  });

  const submitForm: SubmitHandler<formDataType> = async (data) => {
    console.log(data);
  };

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white rounded-full px-2 shadow text-black"
        >
          ✕
        </button>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="bg-linear-to-b from-[#171616] to-[#140B1B] text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-sm rounded-lg shadow-lg min-w-96"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Edit Service
          </h2>

          <input
            className="w-full border mt-1 border-gray-500/30 rounded p-2 focus:outline-2 focus:outline-[#9711FB] text-white"
            placeholder="Service Name"
            {...register("serviceName")}
          />

          {errors.serviceName && (
            <div>
              <p className="text-red-500 text-sm">
                {errors.serviceName.message}
              </p>
            </div>
          )}

          <input
            className="w-full border mt-1 border-gray-500/30 rounded p-2 focus:outline-2 focus:outline-[#9711FB] text-white"
            placeholder="Description"
            {...register("serviceDescription")}
          />

          {errors.serviceDescription && (
            <div>
              <p className="text-red-500 text-sm">
                {errors.serviceDescription.message}
              </p>
            </div>
          )}

          <input
            className="w-full border mt-1 border-gray-500/30 rounded p-2 focus:outline-2 focus:outline-[#9711FB] text-white scheme-dark"
            placeholder="Date"
            type="date"
            {...register("serviceDate")}
          />
          {errors.serviceDate && (
            <div>
              <p className="text-red-500 text-sm">
                {errors.serviceDate.message}
              </p>
            </div>
          )}

          <button
            className="w-full my-3 bg-[#9711FB] hover:bg-[#9711FB]/80 transition py-2.5 rounded text-white flex justify-center items-center gap-1"
            disabled={isSubmitting}
          >
            Edit
            {isSubmitting && (
              <LoaderCircle size={20} className="animate-spin" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;
