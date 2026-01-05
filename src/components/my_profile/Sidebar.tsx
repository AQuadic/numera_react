import { useLocation } from "react-router";
import Profile from "../icons/header/Profile";
import Ads from "../icons/profile/Ads";
import Analytical from "../icons/profile/Analytical";
import Logout from "../icons/profile/Logout";
import Plans from "../icons/profile/Plans";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import Settings from "../icons/profile/Settings";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  onSelect: (id: string) => void;
}

const Sidebar = ({ onSelect }: SidebarProps) => {
  const { t } = useTranslation("profile");
  const { pathname } = useLocation();

  const isActive = (id: string) => {
    if (id === "profile") return pathname === "/profile";
    return pathname.startsWith(`/profile/${id}`);
  };

  const sidebarLinks = [
    { title: t('profile'), icon: <Profile />, id: "profile" },
    { title: t('my_ads'), icon: <Ads />, id: "ads" },
    { title: t('analytical'), icon: <Analytical />, id: "analytics" },
    { title: t('app_setting'), icon: <Settings />, id: "settings" },
    { title: t('my_plan'), icon: <Plans />, id: "plan" },
  ];

    return (
        <section className="w-[260px] md:w-[300px] h-full bg-[#F0F0F0] pl-6 lg:py-12 flex flex-col justify-between">
            <div>
                {sidebarLinks.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={`
                            flex items-center gap-3 py-3 cursor-pointer rounded-tl-[20px] rounded-bl-[20px] mt-6 px-2 transition
                            ${isActive(item.id) ? "bg-[#FEFEFE]" : "hover:bg-[#E5E5E5]"}
                        `}
                    >
                        {item.icon}
                        <span className="text-[#192540] text-base font-medium">
                            {item.title}
                        </span>
                    </div>
                ))}
            </div>

      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-3 py-3 cursor-pointer rounded-tl-[20px] rounded-bl-[20px] mt-6 px-2 hover:bg-[#E5E5E5]">
            <Logout />
            <span className="text-[#192540] text-base font-medium">
              {t('logout')}
            </span>
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-start">
              {t('confirm_logout')}
            </DialogTitle>
            <DialogDescription className="text-[#717171] text-start">
              {t('confirm_desc')}
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-6">
            <DialogClose asChild>
              <button
                className="px-5 h-11 rounded-md border border-[#E5E5E5] text-[#192540] cursor-pointer"
              >
                {t('cancel')}
              </button>
            </DialogClose>

            <DialogClose asChild>
              <button
                onClick={() => onSelect("logout")}
                className="px-5 h-11 rounded-md bg-[#192540] text-white cursor-pointer"
              >
                {t('logout')}
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Sidebar;
