import type { ServiceType } from "@/types/types";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const EditServiceModal = ({
  open,
  isOpen,
  onClose,
  service,
}: {
  open: boolean;
  isOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  service: ServiceType;
}) => {
  const [formData, setFormData] = useState(() => ({
    serviceName: service.name || "",
    serviceDescription: service.description || "",
    serviceDate: new Date(service.createdAt).toISOString().split("T")[0] || "",
  }));

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const editService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulate API call
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      isOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
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
          onSubmit={editService}
          className="bg-linear-to-b from-[#000000] to-[#140B1B] text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-sm rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Edit Service
          </h2>

          <input
            className="w-full border mt-1 border-gray-500/30 rounded p-2 focus:outline-2 focus:outline-[#9711FB] text-white"
            placeholder="Service Name"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
          />

          <input
            className="w-full border mt-1 border-gray-500/30 rounded p-2 focus:outline-2 focus:outline-[#9711FB] text-white"
            placeholder="Description"
            name="serviceDescription"
            value={formData.serviceDescription}
            onChange={handleChange}
          />

          <input
            className="w-full border mt-1 border-gray-500/30 rounded p-2 focus:outline-2 focus:outline-[#9711FB] text-white scheme-dark"
            placeholder="Date"
            type="date"
            name="serviceDate"
            value={formData.serviceDate}
            onChange={handleChange}
          />

          <button
            className="w-full my-3 bg-[#9711FB] hover:bg-[#9711FB]/80 transition py-2.5 rounded text-white flex justify-center items-center gap-1"
            disabled={isLoading}
          >
            Edit
            {isLoading && <LoaderCircle size={20} className="animate-spin" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;
