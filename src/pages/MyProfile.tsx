import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store";
import Sidebar from "../components/my_profile/Sidebar";
import MyProfileComponent from "../components/my_profile/MyProfileComponent";
import WhyChooseNumra from "../components/home/WhyChooseNumra";
import MyAdsComponent from "../components/my_profile/MyAdsComponent";
import AnalyticalDashboard from "../components/my_profile/AnalyticalDashboard/AnalyticalDashboard";
// import MyPlan from "../components/my_profile/plans/MyPlan";
// import HavePlans from "../components/my_profile/plans/have_plans/HavePlans";
import DiamondPlan from "../components/my_profile/plans/have_plans/DiamondPlan";

const MyProfile = () => {
  const [selected, setSelected] = useState("profile");
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
      <div className="flex gap-6 py-6">
        <Sidebar selected={selected} onSelect={handleSelect} />
        <div className="flex-1 py-12 container">{renderContent()}</div>
      </div>

      <WhyChooseNumra />
    </section>
  );
};

export default MyProfile;
