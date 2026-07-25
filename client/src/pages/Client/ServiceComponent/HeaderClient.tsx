import { Stethoscope } from "lucide-react";

const HeaderClient = ({
  serviceName,
  description,
}: {
  serviceName: string;
  description: string;
}) => {
  return (
    <div className="mt-8 flex gap-5">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50">
        <Stethoscope className="h-10 w-10 text-blue-600" />
      </div>

      <div>
        <h3 className="text-[34px] font-bold text-slate-900 line-clamp-2">
          {serviceName}
        </h3>

        <p className="mt-2 text-xl leading-9 text-slate-500 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeaderClient;
