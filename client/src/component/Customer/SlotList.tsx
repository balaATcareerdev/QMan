import { useNavigate } from "react-router";

const SlotList = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <p>12:00 - 12:30</p>
      <button
        onClick={() => navigate("booked")}
        className="bg-linear-to-t from-[#C275FB] to-[#6D9DFC] text-lg rounded-sm px-2.5 py-1"
      >
        Book
      </button>
    </div>
  );
};

export default SlotList;
