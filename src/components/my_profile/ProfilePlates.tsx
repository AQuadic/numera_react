import { useEffect, useState } from "react";
import { pauseSim } from "../../lib/api/plates/pauseSim";
import { continuePlate } from "../../lib/api/plates/continuePlate";
import { republishPlate } from "../../lib/api/plates/republishPlate";
import Chat from "../icons/profile/Chat";
import Delete from "../icons/profile/Delete";
import Edit from "../icons/profile/Edit";
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

  return (
    <section>
    <div className="bg-white p-3 rounded-[20px] shadow-custom-sm flex flex-col gap-4">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="bg-[#EBAF29] px-3 py-1 rounded-[5px]">
          <p className="text-xs font-medium text-[#192540]">
            {plate.is_active
              ? "Active"
              : plate.is_sold
              ? "Sold"
              : plate.paused_at
              ? "Paused"
              : "Continue"}
          </p>
        </div>
        <p className="text-sm font-normal text-[#717171]">
          Expires in 25 days
        </p>
        <Popover>
          <PopoverTrigger>
            <MeatballsMenu />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <div className="bg-white flex flex-col gap-4 px-6 py-5 rounded-md w-52">
              <button className="flex items-center gap-2">
                <Edit />
                <p className="text-[#192540] text-base font-medium">Edit</p>
              </button>
              <button className="flex items-center gap-2">
                <Share />
                <p className="text-[#192540] text-base font-medium">Share</p>
              </button>
              <button className="flex items-center gap-2">
                <SoldActions />
                <p className="text-[#192540] text-base font-medium">Sold</p>
              </button>
              <button className="flex items-center gap-2">
                <Delete />
                <p className="text-[#F53535] text-base font-medium">Delete</p>
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-full relative">
       <img src={plate.image_url} alt="plate" />
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
