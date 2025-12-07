import { useState } from "react";
import Sidebar from "../components/my_profile/Sidebar";
import MyProfileComponent from "../components/my_profile/MyProfileComponent";
import WhyChooseNumra from "../components/home/WhyChooseNumra";

const MyProfile = () => {
    const [selected, setSelected] = useState("profile");

    const renderContent = () => {
        switch (selected) {
            case "profile":
                return <MyProfileComponent />
            case "ads":
                return <div className="p-6">My Ads Component</div>;
            case "analytics":
                return <div className="p-6">Analytics Dashboard</div>;
            case "plan":
                return <div className="p-6">My Plan Component</div>;
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
                <Sidebar selected={selected} onSelect={setSelected} />
                <div className="flex-1 py-12 container">
                    {renderContent()}
                </div>
            </div>

            <WhyChooseNumra />
        </section>
    );
};

export default MyProfile;
