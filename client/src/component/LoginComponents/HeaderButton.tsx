interface HeaderButtonProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  type: "Login" | "Register";
}

const HeaderButton = ({ isLogin, setIsLogin, type }: HeaderButtonProps) => {
  return (
    <button
      onClick={() => setIsLogin(true)}
      className={`flex-1 border-b-2 pb-4 text-lg font-semibold transition ${
        isLogin
          ? "border-blue-600 text-blue-600"
          : "border-slate-200 text-slate-500"
      }`}
    >
      {type}
    </button>
  );
};

export default HeaderButton;
