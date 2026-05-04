import { tokens } from "@/assets";
import Pool from "@/component/Slot/Pool";
import type { TokenType } from "@/types/types";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PoolList = () => {
  const [tokensData, setTokensData] = useState<TokenType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { slotId } = useParams();

  const fetchTokens = async () => {
    const slotTokens = tokens.filter((token) => token.slotId === slotId);

    setTokensData(slotTokens);
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTokens();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative px-20 z-30 pb-10">
      <div className="w-full bg-[#9711FB]/10 border-[#451d70] border p-5 rounded-lg overflow-hidden">
        <h1 className="text-2xl">Tokens</h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <LoaderCircle className="animate-spin" size={40} />
          </div>
        ) : tokensData.length > 0 ? (
          <div className="py-10 px-10 grid grid-cols-8 justify-start gap-10 items-end">
            {tokensData.map((token) => (
              <Pool key={token.id} n={token.slotNumber} status={token.status} />
            ))}
          </div>
        ) : (
          <div>No Tokens Available</div>
        )}
      </div>
    </section>
  );
};

export default PoolList;
