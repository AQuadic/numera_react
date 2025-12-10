// import { Link } from "react-router"
import { useQuery } from "@tanstack/react-query"
import Active from "../icons/profile/Active"
import Paused from "../icons/profile/Paused"
import Sold from "../icons/profile/Sold"
import TotalAds from "../icons/profile/TotalAds"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import ProfilePlates from "./ProfilePlates"
import { getPlateAds } from "../../lib/api/plates/getPlateAds"
import Spinner from "../icons/general/Spinner"

const MyAdsComponent = () => {

const { data, isLoading } = useQuery({
    queryKey: ["plateAds", { per_page: 15, filter_type: "active" }],
    queryFn: () =>
        getPlateAds({
        per_page: 15,
        filter_type: "active",
        pagination: "normal",
        vehicle_types: ["Car", "Fun"],
        }),
    });

    if (isLoading)
        return (
        <div className="flex items-center justify-center">
            <Spinner />
        </div>
        );

    return (
        <section>
            <div className="flex flex-wrap items-center justify-center md:gap-[68px] gap-4">
                <div className="md:px-6 px-2 py-5 bg-[#EEF6FF] rounded-md flex items-center gap-3">
                    <TotalAds />
                    <div>
                        <h2 className="text-[#155DFD] text-2xl font-semibold">14</h2>
                        <p className="text-[#717171] text-base font-medium mt-2">Total Ads</p>
                    </div>
                </div>

                <div className="md:px-6 px-2 py-5 bg-[#ECF5F1] rounded-md flex items-center gap-3">
                    <Active />
                    <div>
                        <h2 className="text-[#19AA3D] text-2xl font-semibold">6</h2>
                        <p className="text-[#717171] text-base font-medium mt-2">Total Ads</p>
                    </div>
                </div>

                <div className="md:px-6 px-2 py-5 bg-[#FFF9E0] rounded-md flex items-center gap-3">
                    <Sold />
                    <div>
                        <h2 className="text-[#B48110] text-2xl font-semibold">4</h2>
                        <p className="text-[#717171] text-base font-medium mt-2">Total Ads</p>
                    </div>
                </div>

                <div className="md:px-6 px-2 py-5 bg-[#F0F0F080] rounded-md flex items-center gap-3">
                    <Paused />
                    <div>
                        <h2 className="text-[#717171] text-2xl font-semibold">4</h2>
                        <p className="text-[#717171] text-base font-medium mt-2">Total Ads</p>
                    </div>
                </div>
            </div>

            <div className="mt-12 flex items-center justify-center">
                <Tabs defaultValue="ads" className="flex items-center justify-center">
                    <TabsList className="bg-transparent flex md:gap-[68px] mb-12">
                        <TabsTrigger value="ads">All ADs</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="sold">Sold</TabsTrigger>
                        <TabsTrigger value="paused">Paused</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ads">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            <ProfilePlates />
                            <ProfilePlates />
                            <ProfilePlates />
                            <ProfilePlates />
                            <ProfilePlates />
                            <ProfilePlates />
                        </div>
                    </TabsContent>
                    <TabsContent value="active">
                        <ProfilePlates />
                    </TabsContent>
                    <TabsContent value="sold">
                        Sold
                    </TabsContent>
                    <TabsContent value="paused">
                        Paused
                    </TabsContent>
                </Tabs>
            </div>

            {/* <Link to='/sell_plates' className="md:w-[440px] h-14 bg-[#EBAF29] rounded-md text-[#192540] text-lg font-semibold mt-8 flex items-center justify-center mx-auto">
                Add  New ADs
            </Link> */}
        </section>
    )
}

export default MyAdsComponent
