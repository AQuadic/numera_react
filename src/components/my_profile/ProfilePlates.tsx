import Chat from "../icons/profile/Chat"
import Heart from "../icons/profile/Heart"
import MeatballsMenu from "../icons/profile/MeatballsMenu"
import PlatePaused from "../icons/profile/PlatePaused"
import Republish from "../icons/profile/Republish"
import Views from "../icons/profile/Views"

const ProfilePlates = () => {
    return (
        <section>
            <div className="w-[348px] bg-[#F0F0F0] rounded-md px-4 py-3 bg-[url('/images/plates/plate_stars.png')] bg-no-repeat bg- bg-position-[center_-0px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="px-6 py-2 bg-[#B2E3C4] rounded-[20px] text-[#1E7634] font-medium">Active</div>
                        <p className="text-[#717171] text-[10px]">Expires in 25 days</p>
                    </div>
                    <MeatballsMenu />
                </div>

                <div className="mt-3 flex gap-4">
                    <img src="/images/plates/plate_img.png" />
                    <div>
                        <h2 className="text-[#192540] text-base font-medium">
                            5,000 <span className="text-base relative top-1">AED</span>
                        </h2>
                        <h2 className="text-[#A3A3A3] text-sm font-medium">
                            6,000 <span className="text-sm relative top-1">AED</span>
                        </h2>
                        <p className="text-[#0B7726] text-sm font-normal mt-2">Negotiable</p>
                    </div>
                </div>
                <div className="mt-2 relative">
                    <img src="/images/plates/available_img.png" alt="bg"/> 
                    <p className="text-[#155DFD] text-sm font-medium absolute -top-1 left-4">Available</p>
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Views />
                        <p className="text-[#717171] text-[10px] font-medium">999 Views</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Heart />
                        <p className="text-[#717171] text-[10px] font-medium">999 Views</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Chat />
                        <p className="text-[#717171] text-[10px] font-medium">999 Views</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                    <button className="w-[152px] h-11 rounded-[10px] bg-[#EBAF29] flex items-center justify-center gap-1">
                        <Republish />
                        <p className="text-[#192540] text-base font-medium">Republish</p>
                    </button>

                    <button className="w-[152px] h-11 rounded-[10px] bg-[#E4E4E4] flex items-center justify-center gap-1">
                        <PlatePaused />
                        <p className="text-[#192540] text-base font-medium">Pause</p>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProfilePlates
