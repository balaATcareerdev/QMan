const BubbleDisplay = ({ head, value }: { head: string; value: string }) => {
  return (
    <div className="text-white flex flex-col p-2 bg-[#17151B]/40 rounded-md justify-center items-center">
      <span className="text-3xl">{head}</span>
      <span className="text-7xl">{value}</span>
    </div>
  );
};

export default BubbleDisplay;
