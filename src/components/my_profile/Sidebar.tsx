import { useLocation } from "react-router";
import Profile from "../icons/header/Profile";
import Ads from "../icons/profile/Ads";
import Analytical from "../icons/profile/Analytical";
import Logout from "../icons/profile/Logout";
import Plans from "../icons/profile/Plans";

interface SidebarProps {
  onSelect: (id: string) => void;
}

const Sidebar = ({ onSelect }: SidebarProps) => {
  const location = useLocation();

  const pathname = location.pathname;

  const isActive = (id: string) => {
    if (id === "profile") return pathname === "/profile";
    return pathname.startsWith(`/profile/${id}`);
  };

  const sidebarLinks = [
    { title: "My Profile", icon: <Profile />, id: "profile" }, // /profile
    { title: "My ADs", icon: <Ads />, id: "ads" },              // /profile/ads
    { title: "Analytical Dashboard", icon: <Analytical />, id: "analytics" },
    { title: "My Plan", icon: <Plans />, id: "plan" },
  ];

  const logoutItem = {
    title: "Log out",
    icon: <Logout />,
    id: "logout",
  };

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

            <div
                onClick={() => onSelect(logoutItem.id)}
                className="flex items-center gap-3 py-3 cursor-pointer rounded-tl-[20px] rounded-bl-[20px] mt-6 px-2 hover:bg-[#E5E5E5]"
            >
                {logoutItem.icon}
                <span className="text-[#192540] text-base font-medium">
                    {logoutItem.title}
                </span>
            </div>
        </section>
    );
};

export default Sidebar;
