import { user } from "@/assets/mockUser";
import type { PriceType } from "@/types/types";
import { getBuyButtonText } from "@/util/priceUtils";
import { Check } from "lucide-react";
import { useState } from "react";

const PriceAndFeature = ({ price }: { price: PriceType }) => {
  const [plan] = useState<string>(user.currentPlan);

  return (
    <section className="text-white grid grid-rows-[25px_1fr] max-w-150">
      {price.isPopular ? (
        <span className="text-sm text-[#F865B4]">Most Popular</span>
      ) : (
        <span></span>
      )}

      <div
        className={`bg-[#9711FB]/5 border hover:border-[#9711FB] border-[#3B3A3A] rounded-md transition-colors duration-300 ease-in-out py-10`}
      >
        <div className="p-5">
          <p className="text-lg">{price.plan}</p>
          <p className="text-4xl">
            ₹{price.price}
            <span className="font-light text-2xl">/{price.tokens} Tokens</span>
          </p>
          <p className="text-[#8F8F8F] text-sm">{price.description}</p>

          <div className="pt-5">
            <p className="text-sm">Core Capacity:</p>
            <div className="p-2">
              {price.CoreCapacity.map((capacity, index) => (
                <div key={index} className="flex pl-10">
                  <Check color="#9711FB" />
                  <p className="text-sm">{capacity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          {(() => {
            const buyButton = getBuyButtonText(price.plan, plan);

            if (buyButton.text === "Lower") return null;

            const isCurrent = price.plan === plan;

            return (
              <button
                disabled={isCurrent}
                className={`px-5 py-2.5 bg-linear-to-r from-[#D295FF] to-[#A1B5F7] text-xs text-[#9711FB] rounded-md transition-colors duration-300 ease-in-out  ${price.plan === plan ? "disabled" : " hover:from-[#D295FF]/50 hover:to-[#A1B5F7]/50 hover:text-white"} `}
              >
                {getBuyButtonText(price.plan, plan).text}
              </button>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export default PriceAndFeature;
