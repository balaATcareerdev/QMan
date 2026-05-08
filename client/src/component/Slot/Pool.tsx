import { CircleCheck, LoaderCircle } from "lucide-react";

const Pool = ({ n, status }: { n: number; status: string }) => {
  return (
    <div
      className={`flex flex-col gap-1 justify-center items-center border ${status === "completed" ? "border-green-500" : status === "in_progress" ? "border-[#9711FB]" : "border-gray-500"} p-1 rounded-sm`}
    >
      <p className="text-2xl font-light">#{n}</p>
      <div className="flex gap-1 justify-center items-center">
        <p
          className={`flex text-md capitalize ${status === "completed" ? "text-green-500" : status === "in_progress" ? "text-[#9711FB]" : "text-gray-500"}`}
        >
          {status.replace("_", " ")}
        </p>
        {status === "completed" ? (
          <CircleCheck size={20} />
        ) : status === "in_progress" ? (
          <div className="flex justify-center items-center">
            <LoaderCircle color="#9711FB" size={20} className="animate-spin" />
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <span
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
            <span
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "500ms" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pool;
