import DownArrow from "../../icons/profile/DownArrow"
import Inquiries from "../../icons/profile/Inquiries"
import ResponseRate from "../../icons/profile/ResponseRate"
import TotalViews from "../../icons/profile/TotalViews"
import UpArrow from "../../icons/profile/UpArrow"
import Filter from "../../icons/home/Filter"
import Search from "../../icons/home/Search"
import ActiveAds from "../../icons/profile/ActiveAds"
const Stats = () => {
    return (
        <div>
            <div className="flex items-center gap-6">
                <div className="bg-[#FFF9E0] px-3 py-4 w-full rounded-md">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                            <TotalViews />
                            <p className="text-[#192540] text-[32px] font-medium">1.247</p>
                        </div>
                        <div className="w-[51px] h-5 bg-[#E4FBDE] rounded-md flex items-center justify-center gap-0.5">
                            <UpArrow />
                            <p className="text-[#19AA3D] text-[10px] font-medium">12%</p>
                        </div>
                    </div>
                    <p className="text-[#717171] text-sm font-medium mt-3">Total Views</p>
                </div>

                <div className="bg-[#F9F9F9] px-3 py-4 w-full rounded-md">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                            <Inquiries />
                            <p className="text-[#192540] text-[32px] font-medium">35</p>
                        </div>
                        <div className="w-[51px] h-5 bg-[#E4FBDE] rounded-md flex items-center justify-center gap-0.5">
                            <UpArrow />
                            <p className="text-[#19AA3D] text-[10px] font-medium">12%</p>
                        </div>
                    </div>
                    <p className="text-[#717171] text-sm font-medium mt-3">Inquiries</p>
                </div>

                <div className="bg-[#EEF6FF] px-3 py-4 w-full rounded-md">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                            <ResponseRate />
                            <p className="text-[#192540] text-[32px] font-medium">80%</p>
                        </div>
                        <div className="w-[51px] h-5 bg-[#E4FBDE] rounded-md flex items-center justify-center gap-0.5">
                            <UpArrow />
                            <p className="text-[#19AA3D] text-[10px] font-medium">12%</p>
                        </div>
                    </div>
                    <p className="text-[#717171] text-sm font-medium mt-3">Response Rate</p>
                </div>

                <div className="bg-[#E4FBDE] px-3 py-4 w-full rounded-md">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                            <ActiveAds />
                            <p className="text-[#192540] text-[32px] font-medium">5</p>
                        </div>
                        <div className="w-[51px] h-5 bg-[#FFF4F4] rounded-md flex items-center justify-center gap-0.5">
                            <DownArrow />
                            <p className="text-[#D71F1F] text-[10px] font-medium">12%</p>
                        </div>
                    </div>
                    <p className="text-[#717171] text-sm font-medium mt-3">Active Ads</p>
                </div>


            </div>

            <div className="flex items-center gap-6 mt-6">
                <div className="relative w-full">
                    <input 
                        type="text"
                        className=" w-full h-14 border border-[#F0F0F0] rounded-md px-12"
                        placeholder="Search"
                    />
                    <div className="absolute top-4 left-4">
                        <Search />
                    </div>
                </div>

                <div className="lg:w-[78px] w-full h-14 border border-[#F0F0F0] rounded-md flex items-center justify-center gap-3">
                    <Filter />
                </div>
            </div>
        </div>
    )
}

export default Stats
