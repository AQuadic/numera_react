import { useEffect, useState } from "react";
import Profile from "../icons/header/Profile";
import Verified from "../icons/plates/Verified";
import ChangePassword from "../icons/profile/Change_password";
import { getAdsCounts } from "../../lib/api/analytics/getAnalytics";
import { useAuthStore } from "../../store/useAuthStore";
import type { AdsCounts } from "../../lib/api/analytics/getAnalytics";
import { Link } from "react-router";
import ArrowLeft from "../icons/profile/ArrowLeft";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AccountVerificationDialog from "./AccountVerificationDialog";
import DeleteAccount from "../icons/profile/DeleteAccount";
import DeleteAccountDialog from "./DeleteAccountDialog";
import Heart from "../icons/home/Heart";
import type { UserImage } from "../../lib/api/auth";

const MyProfileComponent = () => {
  const [adsCounts, setAdsCounts] = useState<AdsCounts | null>(null);
  const [adsLoading, setAdsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
  const handleVerificationSubmit = () => {
    setIsFormOpen(false);
    setIsConfirmationOpen(true);
  };

  // Helper to safely extract image URL from `user.image` which may be a string or an object
  const getUserImage = (img?: string | UserImage | null): string | null => {
    if (!img) return null;
    if (typeof img === "string") return img;
    const ui = img as UserImage;
    if (Array.isArray(ui.responsive_urls)) return ui.responsive_urls[0] ?? null;
    if (typeof ui.url === "string") return ui.url;
    return null;
  };

  const getInitials = (fullName?: string | null) => {
    const parts = (fullName || user?.name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const imageUrl = getUserImage(user?.image);

  return (
    <section className="lg:py-[72px]">
      <div className="w-full p-6 bg-[#F0F0F0] rounded-lg flex flex-col items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={user?.name ?? "Profile avatar"}
            className="w-[116px] h-[116px] rounded-full object-cover"
          />
        ) : (
          <div className="w-[116px] h-[116px] rounded-full bg-[#F3F4F6] flex items-center justify-center text-2xl font-semibold text-[#192540]">
            {getInitials(user?.name)}
          </div>
        )}

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
        <Link
          to="/profile/personal_info"
          className="flex items-center justify-between"
        >
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
        <Link
          to="/profile/change_password"
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <ChangePassword />
            <p className="text-[#192540] text-base font-medium">
              Change Password
            </p>
          </div>
          <ArrowLeft />
        </Link>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger className="w-full">
          <div className="mt-6 border border-[#F0F0F0] rounded-md px-6 py-3 flex items-center justify-between cursor-pointer">
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
          <AccountVerificationDialog onSubmit={handleVerificationSubmit} />
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="w-[860px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <img
                src="/images/VerificationSubmitted.png"
                alt="verification submitted"
              />
            </DialogTitle>
            <DialogDescription className="mt-14 text-center">
              <h2 className="text-[#192540] text-2xl font-semibold">
                Verification Submitted!
              </h2>
              <p className="text-[#717171] text-lg font-medium mt-4">
                Your verification has been submitted. We’ll notify you once it’s
                reviewed.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center">
            <Link
              to="/"
              className="w-full h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold flex items-center justify-center"
              onClick={() => setIsConfirmationOpen(false)}
            >
              Back to home
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="w-[860px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <img
                src="/images/VerificationRejected.png"
                alt="verification rejected"
              />
            </DialogTitle>
            <DialogDescription className="mt-6 text-center">
              <h2 className="text-[#192540] text-2xl font-semibold">
                Verification Rejected !
              </h2>
              <p className="text-[#717171] text-lg font-medium mt-4">
                Your verification request has been rejected, please contact our
                support team.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center gap-6">
            <Link
              to="/"
              className="w-full h-14 border border-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold flex items-center justify-center"
            >
              Cancel
            </Link>
            <Link
              to="/contact_us"
              className="w-full h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold flex items-center justify-center"
              onClick={() => setIsConfirmationOpen(false)}
            >
              Contact support
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <div className="border border-[#F0F0F0] rounded-md px-6 py-4 mt-6">
        <Link
          to="/profile/favorite_plates"
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Heart />
            <p className="text-[#192540] text-base font-medium">
              Favorite Plate
            </p>
          </div>
          <ArrowLeft />
        </Link>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger className="w-full">
          <div className="border border-[#F0F0F0] rounded-md px-6 py-4 mt-6 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DeleteAccount />
                <p className="text-[#D71F1F] text-base font-medium">
                  Delete Account
                </p>
              </div>
              <ArrowLeft />
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="w-3xl">
          <DeleteAccountDialog onClose={() => setIsDeleteDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MyProfileComponent;
