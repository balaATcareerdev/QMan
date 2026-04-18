interface BubbleDisplayMultiProps {
  text1: string;
  text2?: string;
  text3?: string;
  value: number;
  type?: string;
}

const BubbleDisplayMulti = ({
  text1,
  text2,
  text3,
  value,
  type,
}: BubbleDisplayMultiProps) => {
  return (
    <div className="text-white text-4xl bg-[#4B325E]/40 w-72 grid grid-rows-2 justify-center p-3 rounded-2xl h-48 border-[#716A77] border">
      {/* Top */}
      <div>
        <div className="flex gap-2">
          <p>{text1}</p>
          {text2 && <p className="text-[#9711FB] ">{text2}</p>}
        </div>
        {text3 && <p className="text-sm">{text3}</p>}
      </div>

      {/* Bottom */}
      <div className="flex justify-center text-[#9711FB]">
        <p className="text-6xl text-center">
          {value}
          <span className="text-4xl">{type}</span>
        </p>
      </div>
    </div>
  );
};

export default BubbleDisplayMulti;
