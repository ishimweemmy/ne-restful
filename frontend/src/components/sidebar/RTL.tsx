/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "src/components/sidebar/components/SidebarCard";
import routes from "src/routes";

const Sidebar = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose } = props;
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute block cursor-pointer top-4 end-4 xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 ms-1 dark:text-white">
          Book Haven
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="pt-1 mb-auto">
        <Links routes={routes} />
      </ul>
    </div>
  );
};

export default Sidebar;
