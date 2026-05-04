const QueueList = ({
  slotNumber,
  status,
}: {
  slotNumber: number;
  status: string;
}) => {
  return (
    <div className="flex gap-3 border-[#331257] border p-2 rounded-sm bg-[#bc82f8]/8">
      <div className="w-15 rounded-full h-15 bg-[#bc82f8]/10 flex justify-center items-center">
        <p className="text-3xl text-[#bc82f8]">{slotNumber}</p>
      </div>
      <div>
        <p className="text-lg">Token #{slotNumber}</p>
        <p className="text-[#3583d3]">
          {status[0].toLocaleUpperCase()}
          {status.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default QueueList;
