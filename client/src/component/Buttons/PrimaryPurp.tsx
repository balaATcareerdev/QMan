const PrimaryPurp = ({
  text,
  setOpenCreate,
}: {
  text: string;
  setOpenCreate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className="bg-[#9711FB] hover:bg-[#832bc6]/70 transition-colors duration-100 text-white py-2.5 px-2.5 rounded-lg"
      onClick={() => setOpenCreate(true)}
    >
      {text}
    </button>
  );
};

export default PrimaryPurp;
