import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store";
import Sidebar from "../components/my_profile/Sidebar";
import MyProfileComponent from "../components/my_profile/MyProfileComponent";
import WhyChooseNumra from "../components/home/WhyChooseNumra";
import MyAdsComponent from "../components/my_profile/MyAdsComponent";
import AnalyticalDashboard from "../components/my_profile/AnalyticalDashboard/AnalyticalDashboard";
import DiamondPlan from "../components/my_profile/plans/have_plans/DiamondPlan";
import { Menu } from "lucide-react";

const MyProfile = () => {
  const [selected, setSelected] = useState("profile");
  const [openDrawer, setOpenDrawer] = useState(false);

  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const handleSelect = (id: string) => {
    if (id === "logout") {
      // perform logout and redirect to sign in
      logout();
      navigate("/signin", { replace: true });
      return;
    }

    setSelected(id);
    setOpenDrawer(false);
  };

  const renderContent = () => {
    switch (selected) {
      case "profile":
        return <MyProfileComponent />;
      case "ads":
        return <MyAdsComponent />;
      case "analytics":
        return <AnalyticalDashboard />;
      case "plan":
        return <DiamondPlan />;
      case "settings":
        return <div className="p-6">App Settings Component</div>;
      case "support":
        return <div className="p-6">Support & Legal Component</div>;
      default:
        return null;
    }
  };

  return (
    <section>
      <div className="lg:hidden px-4 py-4">
        <button onClick={() => setOpenDrawer(true)} className="text-2xl">
          <Menu />
        </button>
      </div>

      {openDrawer && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpenDrawer(false)}
        ></div>
      )}

    <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 overflow-y-auto transform transition-transform duration-300
          ${openDrawer ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar selected={selected} onSelect={handleSelect} />
      </div>

      <div className="flex gap-6 py-6">
        <div className="hidden lg:block">
          <Sidebar selected={selected} onSelect={handleSelect} />
        </div>

        <div className="flex-1 lg:py-12 container">{renderContent()}</div>
      </div>

      <WhyChooseNumra />
    </section>
  );
};

export default MyProfile;
