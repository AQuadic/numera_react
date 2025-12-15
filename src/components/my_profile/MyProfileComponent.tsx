import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Profile from "../icons/header/Profile";
import Verified from "../icons/plates/Verified";
import ChangePassword from "../icons/profile/Change_password";
// import Crown from "../icons/profile/Crown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { changePassword } from "../../lib/api/auth";
import { getAdsCounts } from "../../lib/api/analytics/getAnalytics";
import { useAuthStore } from "../../store/useAuthStore";
import type { AdsCounts } from "../../lib/api/analytics/getAnalytics";
import { Link } from "react-router";
import ArrowLeft from "../icons/profile/ArrowLeft";

const MyProfileComponent = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adsCounts, setAdsCounts] = useState<AdsCounts | null>(null);
  const [adsLoading, setAdsLoading] = useState(false);

  const user = useAuthStore((s) => s.user);

  // Fetch ads counts
  useEffect(() => {
    const fetchAdsCounts = async () => {
      setAdsLoading(true);
      try {
        const counts = await getAdsCounts();
        setAdsCounts(counts);
      } catch {
        // Error handling - silently fail for now
      } finally {
        setAdsLoading(false);
      }
    };

    fetchAdsCounts();
  }, []);

  // Calculate "Member since" from created_at
  const getMemberSince = () => {
    if (!user?.created_at) return "Member since unknown";
    const date = new Date(user.created_at);
    return `Member since ${date.getFullYear()}`;
  };

  // Get verification status badge
  const getVerificationStatusText = () => {
    if (user?.verification_status === "verified") {
      return "Verified";
    }
    if (user?.verification_status === "pending") {
      return "Pending";
    }
    return "Not Verified";
  };

  const getVerificationStatusStyle = () => {
    if (user?.verification_status === "verified") {
      return "bg-[#D5DCF2] text-[#002083]";
    }
    if (user?.verification_status === "pending") {
      return "bg-[#FFF4E6] text-[#FF9800]";
    }
    return "bg-[#F5F5F5] text-[#717171]";
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      await changePassword({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      // Success toast is handled by axios interceptor if API returns message
      // Otherwise show our own
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      // Error toast is handled by axios interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="lg:py-[72px]">
      <div className="w-full p-6 bg-[#F0F0F0] rounded-lg flex flex-col items-center justify-center">
        <img
          src={user?.image || "/images/plates/owner_img.jpg"}
          alt={user?.name ?? "Profile avatar"}
          className="w-[116px] h-[116px] rounded-full object-cover"
        />
        <div className="mt-4 flex items-center gap-3">
          <h2 className="text-[#192540] text-2xl font-medium">
            {user?.name ?? "User"}
          </h2>
          {user?.verification_status === "verified" && <Verified />}
        </div>

        <p className="text-[#717171] text-base font-medium mt-2">
          {user?.type === "personal" ? "Personal User" : "Business User"}
        </p>
        <p className="text-[#717171] text-base font-medium mt-1">
          {getMemberSince()}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 mt-4 lg:mt-6">
          <div className="w-[180px] h-[75px] bg-[#FEFEFE] rounded-[10px] flex flex-col items-center justify-center gap-1">
            <p className="text-[#192540] text-xl font-medium">
              {adsLoading ? "-" : adsCounts?.sold_ads ?? 0}
            </p>
            <p className="text-[#717171] text-base font-medium">Sold Plate</p>
          </div>

          <div className="w-[180px] h-[75px] bg-[#FEFEFE] rounded-[10px] flex flex-col items-center justify-center gap-1">
            <p className="text-[#EBAF29] text-xl font-medium">
              {adsLoading ? "-" : adsCounts?.active_ads ?? 0}
            </p>
            <p className="text-[#717171] text-base font-medium">Active ADs</p>
          </div>

          <div className="w-[180px] h-[75px] bg-[#FEFEFE] rounded-[10px] flex flex-col items-center justify-center gap-1">
            <p className="text-[#192540] text-xl font-medium">
              {user?.created_at
                ? new Date().getFullYear() -
                  new Date(user.created_at).getFullYear()
                : 0}
            </p>
            <p className="text-[#717171] text-base font-medium">Active Years</p>
          </div>
        </div>
      </div>

      {/* <div className="w-full py-4 px-6 bg-[#EBAF29] rounded-md mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Crown />
          <div>
            <h2 className="text-[#192540] text-base font-medium leading-[100%]">
              Gold Plan
            </h2>
            <p className="text-[#4A4848] text-sm font-normal leading-[100%] mt-2">
              Active until Dec 15, 2024
            </p>
          </div>
        </div>

        <button className="w-[100px] h-10 bg-[#192540] rounded-md text-[#FEFEFE] text-sm font-semibold cursor-pointer">
          Manage
        </button>
      </div> */}

      <div className="border border-[#F0F0F0] rounded-md px-6 py-4 mt-6">
        <Link to='/profile/personal_info' className="flex items-center justify-between">
          <div className="flex items-center gap-2">
              <Profile />
              <p className="text-[#192540] text-base font-medium">
                Personal Information{" "}
              </p>
            </div>
            <ArrowLeft />
      </Link>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-2"
            className="border border-[#F0F0F0] rounded-md px-6"
          >
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <ChangePassword />
                <p className="text-[#192540] text-base font-medium">
                  Change Password
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <form onSubmit={handleChangePassword} autoComplete="off">
                <div className="px-2">
                  <label
                    htmlFor="current_password"
                    className="text-[#192540] text-base"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current_password"
                    name="current_password"
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-12 border rounded-md mt-2 px-2"
                    placeholder="Enter your current password"
                  />
                </div>

                <div className="px-2 mt-4">
                  <label
                    htmlFor="new_password"
                    className="text-[#192540] text-base"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-12 border rounded-md mt-2 px-2"
                    placeholder="Enter your new password"
                  />
                </div>

                <div className="px-2 mt-4">
                  <label
                    htmlFor="confirm_password"
                    className="text-[#192540] text-base"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-12 border rounded-md mt-2 px-2"
                    placeholder="Confirm your new password"
                  />
                </div>

                <div className="px-2 mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#EBAF29] rounded-md text-[#192540] text-base font-semibold cursor-pointer hover:bg-[#d9a025] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-6 border border-[#F0F0F0] rounded-md px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {user?.verification_status === "verified" && <Verified />}
          <p className="text-[#192540] text-base font-medium">
            Account Verification
          </p>
        </div>

        <button
          className={`p-2 text-sm font-medium rounded-xl ${getVerificationStatusStyle()}`}
        >
          {getVerificationStatusText()}
        </button>
      </div>
    </section>
  );
};

export default MyProfileComponent;
