import { useEffect, useState } from "react";
import Profile from "../icons/header/Profile";
import Verified from "../icons/plates/Verified";
import ChangePassword from "../icons/profile/Change_password";
import { getAdsCounts } from "../../lib/api/analytics/getAnalytics";
import { useAuthStore } from "../../store/useAuthStore";
import type { AdsCounts } from "../../lib/api/analytics/getAnalytics";
import { Link } from "react-router";
import ArrowLeft from "../icons/profile/ArrowLeft";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Upload from "../icons/profile/Upload";

const MyProfileComponent = () => {
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

      <div className="border border-[#F0F0F0] rounded-md px-6 py-4 mt-6">
        <Link to='/profile/change_password' className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <ChangePassword />
                <p className="text-[#192540] text-base font-medium">
                  Change Password
                </p>
              </div>
            <ArrowLeft />
      </Link>
      </div>

        <Dialog>
            <DialogTrigger className="w-full">
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
            </DialogTrigger>
            <DialogContent className="w-[860px]">
                <DialogHeader>
                <DialogTitle ></DialogTitle>
                <DialogDescription>
                    <h2 className="text-[#192540] text-2xl font-medium">Account Verification</h2>
                    <p className="text-[#717171] text-lg font-medium mt-4">To verify your identity, please upload your ID ,Our team will review your submission and get back to you shortly.</p>

                    <div className="mt-10">
                      <label htmlFor="id" className="text-[#192540] text-base font-medium">Upload ID</label>
                      <div className="w-full h-[126px] border border-[#F0F0F0] rounded-md mt-4 flex flex-col items-center justify-center">
                          <Upload />
                          <p className="text-[#717171] text-sm font-normal mt-2">Upload a png or pdf of your ID document</p>
                      </div>
                    </div>

                    <div className="px-2 mt-8">
                      <label htmlFor="companyName" className="text-[#192540] text-base font-medium">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        className="w-full h-12 border rounded-md mt-2 px-2"
                        placeholder="Enter company name"
                      />
                    </div>

                    <button className="w-full h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold mt-8 cursor-pointer">
                      Submit
                    </button>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
          </Dialog>

    </section>
  );
};

export default MyProfileComponent;
