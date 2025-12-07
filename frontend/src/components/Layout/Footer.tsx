import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-background text-secondary flex w-full justify-center border-t px-[30px] md:pt-1">
      <div className="flex w-full flex-col items-center gap-2 py-3 md:mb-2 md:flex-row md:items-center md:justify-between">
        <span className="order-2 text-sm md:order-1 md:text-base">
          © 2025 Prism Protocol. All rights reserved.
        </span>

        <div className="text-secondary order-1 flex items-center gap-6 md:order-2">
          <FaXTwitter size={20} />
          <FaTelegramPlane size={20} />
          <FaDiscord size={22} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
