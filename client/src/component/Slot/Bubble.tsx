const Bubble = ({
  text,
  value,
  type,
}: {
  text: string;
  value: number;
  type?: string;
}) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="font-light text-lg text-[#B7B7B7]">{text}</h1>
      <p className="font-light text-white text-3xl">
        {value}
        {type}
      </p>
    </div>
  );
};

export default Bubble;
