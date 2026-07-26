import { Heart } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 text-center md:flex-row md:text-left">
        {/* Left */}

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Qman</h3>

          <p className="mt-1 text-sm text-slate-500">
            Queue management made simple.
          </p>
        </div>

        {/* Center */}

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <a href="#" className="transition hover:text-blue-600">
            Privacy Policy
          </a>

          <a href="#" className="transition hover:text-blue-600">
            Terms of Service
          </a>

          <a
            href="mailto:bala.career@gmail.com"
            className="transition hover:text-blue-600"
          >
            Support
          </a>
        </div>

        {/* Right */}

        <div className="text-right">
          <p className="flex items-center justify-center gap-1 text-sm text-slate-600 md:justify-end">
            Built with <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            by
            <span className="font-semibold text-slate-900">Balaji S</span>
          </p>

          <a
            href="mailto:bala.career@gmail.com"
            className="mt-1 block text-sm text-slate-500 transition hover:text-blue-600"
          >
            bala.career@gmail.com
          </a>

          <p className="mt-2 text-xs text-slate-400">
            © {year} Qman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
