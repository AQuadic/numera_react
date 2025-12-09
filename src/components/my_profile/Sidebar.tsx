import Profile from "../icons/header/Profile";
import Ads from "../icons/profile/Ads";
import Analytical from "../icons/profile/Analytical";
import Logout from "../icons/profile/Logout";
import Plans from "../icons/profile/Plans";
import Settings from "../icons/profile/Settings";
import Support from "../icons/profile/Support";

interface SidebarProps {
    onSelect: (id: string) => void;
    selected: string;
}

const Sidebar = ({ onSelect, selected }: SidebarProps) => {

    const sidebar_links = [
        { title: "My Profile", icon: <Profile />, id: "profile" },
        { title: "My ADs", icon: <Ads />, id: "ads" },
        { title: "Analytical Dashboard", icon: <Analytical />, id: "analytics" },
        { title: "My Plan", icon: <Plans />, id: "plan" },
        { title: "App Setting", icon: <Settings />, id: "settings" },
        { title: "Support & Legal", icon: <Support />, id: "support" },
    ];

    const logout_item = { title: "Log out", icon: <Logout />, id: "logout" };

    return (
        <section className="w-[260px] md:w-[300px] h-full bg-[#F0F0F0] pl-6 lg:py-12 flex flex-col justify-between">
            <div>
                {sidebar_links.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={`
                            flex items-center gap-3 py-3 cursor-pointer rounded-tl-[20px] rounded-bl-[20px] mt-6 px-2
                            ${selected === item.id ? "bg-[#FEFEFE]" : "hover:bg-[#E5E5E5]"}
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
                onClick={() => onSelect(logout_item.id)}
                className={`
                    flex items-center gap-3 py-3 cursor-pointer rounded-tl-[20px] rounded-bl-[20px] mt-6 px-2
                    ${selected === logout_item.id ? "bg-[#FEFEFE]" : "hover:bg-[#E5E5E5]"}
                `}
            >
                {logout_item.icon}
                <span className="text-[#192540] text-base font-medium">
                    {logout_item.title}
                </span>
            </div>
        </section>
    );
};

export default Sidebar;
