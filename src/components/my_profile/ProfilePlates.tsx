import { useEffect, useState } from "react";
import { pauseSim } from "../../lib/api/plates/pauseSim";
import { continuePlate } from "../../lib/api/plates/continuePlate";
import { republishPlate } from "../../lib/api/plates/republishPlate";
import Chat from "../icons/profile/Chat";
import Delete from "../icons/profile/Delete";
// import Edit from "../icons/profile/Edit";
import Heart from "../icons/profile/Heart";
import MeatballsMenu from "../icons/profile/MeatballsMenu";
import PlatePaused from "../icons/profile/PlatePaused";
import Republish from "../icons/profile/Republish";
import Share from "../icons/profile/Share";
import SoldActions from "../icons/profile/SoldActions";
import Views from "../icons/profile/Views";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface ProfilePlatesProps {
  plate: any;
  refetch?: () => void;
}

const ProfilePlates = ({ plate, refetch }: ProfilePlatesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRepublishing, setIsRepublishing] = useState(false);
  const [isPaused, setIsPaused] = useState(!plate.paused_at);
  const [isPauseDialogOpen, setIsPauseDialogOpen] = useState(false);
  const [isSoldDialogOpen, setIsSoldDialogOpen] = useState(false);
  const [isMarkingSold, setIsMarkingSold] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsPaused(!plate.paused_at);
  }, [plate.paused_at]);

  if (!plate) return null;

  const handleTogglePause = async (plateId: number) => {
    setIsLoading(true);
    try {
      if (!isPaused) {
        await continuePlate({ plate_id: plateId });
      } else {
        await pauseSim({ plate_id: plateId });
      }
      setIsPaused(!isPaused);
      setIsPauseDialogOpen(false);
      refetch?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepublish = async () => {
    setIsRepublishing(true);
    try {
      const response = await republishPlate({
        plate_id: plate.id,
        package_user_id: plate.package_user_id,
      });

      if (response.success) {
        console.log(response.message || "Plate republished successfully");
        refetch?.();
      }
    } catch (error) {
      console.error("Failed to republish plate:", error);
    } finally {
      setIsRepublishing(false);
    }
  };

  const handleMarkAsSold = async () => {
    setIsMarkingSold(true);
    try {
      console.log("Plate marked as sold");
      setIsSoldDialogOpen(false);
      refetch?.();
    } catch (error) {
      console.error("Failed to mark plate as sold:", error);
    } finally {
      setIsMarkingSold(false);
    }
  };

  return (
    <section>
      <div className="md:w-[348px] w-full bg-[#F0F0F0] rounded-md px-4 py-3 bg-[url('/images/plates/plate_stars.png')] bg-no-repeat bg-position-[center_-0px]">
        <div className="flex flew items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-6 py-2 bg-[#B2E3C4] rounded-[20px] text-[#1E7634] font-medium">
              {plate.is_active
                ? "Active"
                : plate.is_sold
                ? "Sold"
                : plate.paused_at
                ? "Paused"
                : "Continue"} 
            </div>
            <p className="text-[#717171] text-[10px]">Expires in 25 days</p>
          </div>

          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <MeatballsMenu />
            </PopoverTrigger>
            <PopoverContent className="w-[155px]">
              {/* <div className="flex items-center gap-2 cursor-pointer">
                <Edit />
                <p className="text-[#192540] text-lg font-medium">Edit</p>
              </div> */}
              <div className="flex items-center gap-2 cursor-pointer mt-4">
                <Share />
                <p className="text-[#192540] text-lg font-medium">Share</p>
              </div>
              <Dialog open={isSoldDialogOpen} onOpenChange={setIsSoldDialogOpen}>
                <DialogTrigger className="w-full">
                  <div className="flex items-center gap-2 cursor-pointer mt-4">
                    <SoldActions />
                    <p className="text-[#192540] text-lg font-medium">Sold</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-[860px] px-0!">
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                      <div>
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src="../../../public/images/sold.png"
                            alt="sold"
                            className="w-[245px] h-[245px]"
                          />
                          <h2 className="text-[#192540] text-2xl font-semibold mt-4">
                            Mark as Sold?
                          </h2>
                          <p className="text-[#717171] text-lg font-medium mt-4">
                            Are you sure you want to mark this ad as sold?
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-6 mt-7 px-8">
                          <button
                            onClick={() => setIsSoldDialogOpen(false)}
                            className="w-full h-14 border border-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleMarkAsSold}
                            disabled={isMarkingSold}
                            className="w-full h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isMarkingSold ? "Processing..." : "Mark as Sold"}
                          </button>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger className="w-full">
                  <div className="flex items-center gap-2 cursor-pointer mt-4">
                    <Delete />
                    <p className="text-[#D71F1F] text-lg font-medium">Delete</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-[860px] px-0!">
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                      <div>
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src="../../../public/images/delete_account.png"
                            alt="delete"
                            className="w-[245px] h-[245px]"
                          />
                          <h2 className="text-[#192540] text-2xl font-semibold mt-4">
                            Delete Your Ad?
                          </h2>
                          <p className="text-[#717171] text-lg font-medium mt-4">
                            Are you sure you want to delete this ad? 
                          </p>
                          <p className="text-[#717171] text-lg font-medium">
                            This action is permanent and cannot be undone.
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-6 mt-7 px-8">
                          <button
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="w-full h-14 border border-[#F0F0F0] rounded-md text-[#192540] text-lg font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            disabled={isDeleting}
                            className="w-full h-14 bg-[#D71F1F] rounded-md text-white text-lg font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </PopoverContent>
          </Popover>
        </div>

        <div className="mt-3 flex flex-wrap gap-4">
          <img src={plate.image_url} alt="plate" />
          <div>
            <h2 className="text-[#192540] text-base font-medium">
              {plate.price}{" "}
              <span className="text-base relative top-1">AED</span>
            </h2>

            {plate.old_price && (
              <h2 className="text-[#A3A3A3] text-sm font-medium">
                {plate.old_price}{" "}
                <span className="text-sm relative top-1">AED</span>
              </h2>
            )}

          </div>
        </div>

        <div className="mt-2 relative">
          {/* <img src="/images/plates/available_img.png" alt="bg" /> */}
          {/* Removed 'Available' overlay text from profile card */}
        </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-[#192540] text-2xl font-semibold">
              {plate.price} <span className="text-base font-medium">AED</span>
            </p>
            {plate.old_price && (
              <p className="text-[#8E8E93] text-xl font-medium line-through">
                {plate.old_price} <span className="text-sm">AED</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <Views />
            <p className="text-[#192540] text-base font-normal">
              {plate.views_count} Views
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Heart />
            <p className="text-[#192540] text-base font-normal">
              {plate.favorites_count} Favorites
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Chat />
            <p className="text-[#192540] text-base font-normal">
              {plate.chats_count} Chats
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Dialog>
            <DialogTrigger className="w-full">
              <button className="xl:w-[152px] w-full h-11 rounded-[10px] bg-[#EBAF29] flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                <Republish />
                <p className="text-[#192540] text-base font-medium">
                  Republish
                </p>
              </button>
            </DialogTrigger>
            <DialogContent className="w-[860px] px-0!">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <div>
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src="../../../public/images/republish.png"
                        alt="republish"
                      />
                      <h2 className="text-[#192540] text-2xl font-semibold mt-4">
                        Republish Your Ad ?
                      </h2>
                      <p className="text-[#717171] text-lg font-medium mt-4">
                        Would you like to republish it to keep it active and
                        visible to buyers?
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-6 mt-7 px-8">
                      <button className="w-full h-14 border border-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold cursor-pointer">
                        Cancel
                      </button>
                      <button
                        onClick={handleRepublish}
                        disabled={isRepublishing}
                        className="w-full h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold cursor-pointer"
                      >
                        {isRepublishing ? "Publishing..." : "Republish Now"}
                      </button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog open={isPauseDialogOpen} onOpenChange={setIsPauseDialogOpen}>
            <DialogTrigger className="w-full">
              <button className="xl:w-[152px] w-full h-11 rounded-[10px] bg-[#E4E4E4] flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <PlatePaused />
                <p className="text-[#192540] text-base font-medium">
                  {isPaused ? "Continue" : "Pause"}
                </p>
              </button>
            </DialogTrigger>
            <DialogContent className="w-[860px] px-0!">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <div>
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src="../../../public/images/pause.png"
                        alt="pause"
                        className="w-[245px] h-[245px]"
                      />
                      <h2 className="text-[#192540] text-2xl font-semibold mt-4">
                        {isPaused ? "Continue Your Ad?" : "Pause Your Ad?"}
                      </h2>
                      <p className="text-[#717171] text-lg font-medium mt-4">
                        {isPaused
                          ? "Are you sure you want to continue this ad?"
                          : "Are you sure you want to pause this ad? It will no longer appear to buyers until you reactivate it."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-6 mt-7 px-8">
                      <button
                        onClick={() => setIsPauseDialogOpen(false)}
                        className="w-full h-14 border border-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleTogglePause(plate.id)}
                        disabled={isLoading}
                        className="w-full h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading
                          ? "Loading..."
                          : isPaused
                          ? "Continue Now"
                          : "Pause Now"}
                      </button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
    </section>
  );
};

export default ProfilePlates; 