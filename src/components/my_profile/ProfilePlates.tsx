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

interface ProfilePlatesProps {
  plate: any;
  refetch?: () => void;
}

const ProfilePlates = ({ plate, refetch }: ProfilePlatesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRepublishing, setIsRepublishing] = useState(false);
  const [isPaused, setIsPaused] = useState(!plate.is_active);

  useEffect(() => {
    setIsPaused(!plate.is_active);
  }, [plate.is_active]);

  if (!plate) return null;

  const handleTogglePause = async (plateId: number) => {
    setIsLoading(true);
    try {
      if (!isPaused) {
        await pauseSim({ plate_id: plateId });
      } else {
        await continuePlate({ plate_id: plateId });
      }
      setIsPaused(!isPaused);
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
      <div className="md:w-[348px] w-full bg-[#F0F0F0] rounded-md px-4 py-3 bg-[url('/images/plates/plate_stars.png')] bg-no-repeat bg-position-[center_-0px]">
        <div className="flex flew items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-6 py-2 bg-[#B2E3C4] rounded-[20px] text-[#1E7634] font-medium">
              {plate.is_active ? "Active" : plate.is_sold ? "Sold" : "Paused"}
            </div>
            <p className="text-[#717171] text-[10px]">Expires in 25 days</p>
          </div>

          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <MeatballsMenu />
            </PopoverTrigger>
            <PopoverContent className="w-[155px]">
              <div className="flex items-center gap-2 cursor-pointer">
                <Edit />
                <p className="text-[#192540] text-lg font-medium">Edit</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer mt-4">
                <Share />
                <p className="text-[#192540] text-lg font-medium">Share</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer mt-4">
                <SoldActions />
                <p className="text-[#192540] text-lg font-medium">Sold</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer mt-4">
                <Delete />
                <p className="text-[#D71F1F] text-lg font-medium">Delete</p>
              </div>
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

            {/* Negotiable tag removed from profile card */}
          </div>
        </div>

        <div className="mt-2 relative">
          <img src="/images/plates/available_img.png" alt="bg" />
          {/* Removed 'Available' overlay text from profile card */}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Views />
            <p className="text-[#717171] text-[10px] font-medium">
              {plate.views_count} Views
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Heart />
            <p className="text-[#717171] text-[10px] font-medium">
              {plate.favorites_count} Favorites
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Chat />
            <p className="text-[#717171] text-[10px] font-medium">
              {plate.chats_count} Chats
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleRepublish}
            disabled={isRepublishing}
            className="xl:w-[152px] w-full h-11 rounded-[10px] bg-[#EBAF29] flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Republish />
            <p className="text-[#192540] text-base font-medium">
              {isRepublishing ? "Publishing..." : "Republish"}
            </p>
          </button>

          <button
            onClick={() => handleTogglePause(plate.id)}
            disabled={isLoading}
            className="xl:w-[152px] w-full h-11 rounded-[10px] bg-[#E4E4E4] flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlatePaused />
            <p className="text-[#192540] text-base font-medium">
              {isLoading ? "Loading..." : isPaused ? "Continue" : "Pause"}
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePlates;
