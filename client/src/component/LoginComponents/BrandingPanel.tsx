import { authIllustration, shieldImage } from "@/assets/export";
import NavLogo from "@/component/NavBarComponents/NavLogo";

const BrandingPanel = () => {
  return (
    <section className="hidden flex-col justify-between border-r border-slate-200 bg-white p-10 lg:flex">
      {/* Top */}
      <div>
        {/* Logo */}
        <NavLogo />

        {/* Heading */}
        <div className="mt-14 space-y-6">
          <h2 className="max-w-sm text-6xl font-bold leading-tight text-slate-900">
            Smart Queue
            <br />
            Management,
            <br />
            Simplified.
          </h2>

          <p className="max-w-md text-2xl leading-relaxed text-slate-500">
            Manage your services, slots and customers effortlessly.
          </p>
        </div>

        {/* Illustration */}
        <div className="mt-16 flex justify-center">
          <img
            src={authIllustration}
            alt="Dashboard Illustration"
            className="w-full max-w-lg object-contain"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 flex items-start gap-5 rounded-2xl bg-slate-50 p-5">
        <img src={shieldImage} alt="Security" className="h-16 w-16" />

        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            Your data is safe with us.
          </h3>

          <p className="mt-2 text-lg leading-8 text-slate-500">
            We use industry-standard security
            <br />
            to keep your data protected.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandingPanel;
