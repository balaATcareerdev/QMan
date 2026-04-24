import { colorBg } from "@/assets/export";
import { pricing } from "@/assets/pricing";
import PriceAndFeature from "@/component/Pricing/PriceAndFeature";
import type { PriceType } from "@/types/types";
import { useState } from "react";

const PricingPage = () => {
  const [prices] = useState<PriceType[]>(pricing);

  return (
    <section className="bg-black min-h-screen pt-20 relative">
      <div
        className="absolute inset-0 bg-position-[-150%_130%] bg-size-[1200px] bg-no-repeat z-20 left-0 top-0"
        style={{ backgroundImage: `url("${colorBg}")` }}
      />

      <section className="relative z-30">
        <h1 className="text-5xl text-white px-20 py-10">Pricing</h1>
        <div
          className={`grid grid-cols-${prices.length} justify-center gap-10 px-20`}
        >
          {prices.map(
            (price) => !price.isDisabled && <PriceAndFeature price={price} />,
          )}
        </div>
      </section>
    </section>
  );
};

export default PricingPage;
