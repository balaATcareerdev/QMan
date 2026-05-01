import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";
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
    formState: { errors, isSubmitting },
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

  const submitForm: SubmitHandler<formDataType> = async (data) => {
    console.log(data);
  };

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 bg-white rounded-full px-2 shadow text-black"
        >
          ✕
        </button>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="bg-linear-to-b from-[#1b1b1b] to-[#140B1B] text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-sm rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Create Service
          </h2>

          <input
            className="w-full border mt-1 border-gray-500/30 rounded p-2 focus:outline-2 focus:outline-[#9711FB] text-white"
            placeholder="Service Name"
            {...register("serviceName")}
          />

          {errors.serviceName && (
            <div>
              <p className="text-red-500 text-sm mt-1">
                {errors.serviceName.message}
              </p>
            </div>
          )}

          <input
            className="w-full border mt-1 border-gray-500/30 rounded p-2 focus:outline-2 focus:outline-[#9711FB] text-white"
            placeholder="Description"
            {...register("serviceDescription")}
          />

          <input
            className="w-full border mt-1 border-gray-500/30 rounded p-2 focus:outline-2 focus:outline-[#9711FB] text-white scheme-dark"
            placeholder="Date"
            type="date"
            {...register("serviceDate")}
          />

          <button
            className="w-full my-3 bg-[#9711FB] hover:bg-[#9711FB]/80 transition py-2.5 rounded text-white flex justify-center items-center gap-1"
            disabled={isSubmitting}
          >
            Create
            {isSubmitting && (
              <LoaderCircle size={20} className="animate-spin" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceModal;
