import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store";
import Sidebar from "../components/my_profile/Sidebar";
import WhyChooseNumra from "../components/home/WhyChooseNumra";
import { Menu } from "lucide-react";
// import MyPlan from "../components/my_profile/plans/MyPlan";
import DownloadApp from "../components/general/DownloadApp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  // DialogTitle,
  DialogDescription,
} from "../components/ui/dialog"; 

const MyProfile = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const handleSelect = (id: string) => {
    if (id === "logout") {
      // perform logout and redirect to sign in
      logout();
      navigate("/signin", { replace: true });
      return;
    }

    if (id === "plan") {
      setShowDownloadDialog(true);
      return;
    }

  if (id === "profile") {
    navigate("/profile");
  } else {
    navigate(`/profile/${id}`);
  }

  setOpenDrawer(false);
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
        />
      )}

    <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 overflow-y-auto transform transition-transform duration-300
          ${openDrawer ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onSelect={handleSelect} />
      </div>

      {/* Desktop layout */}
      <div className="flex gap-6 py-6">
        <div className="hidden lg:block">
          <Sidebar onSelect={handleSelect} />
        </div>

        <div className="flex-1 container">
          <Outlet />
        </div>
      </div>

      {showDownloadDialog && (
        <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
          <DialogContent className="w-[860px] max-w-full px-0">
            <DialogHeader>
              <DialogDescription>
                <DownloadApp />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <WhyChooseNumra />
    </section>
  );
};

export default MyProfile;
