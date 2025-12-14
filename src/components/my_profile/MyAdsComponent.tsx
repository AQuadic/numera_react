import { useState } from "react";
// import { Link } from "react-router"
import { useQuery } from "@tanstack/react-query"
import Active from "../icons/profile/Active"
import Paused from "../icons/profile/Paused"
import Sold from "../icons/profile/Sold"
import TotalAds from "../icons/profile/TotalAds"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import ProfilePlates from "./ProfilePlates"
import { getPlateAds, type GetPlateAdsParams } from "../../lib/api/plates/getPlateAds"
import AdsEmptyState from "../general/AdsEmptyState";
import { Skeleton } from "../ui/skeleton";

const MyAdsComponent = () => {
  const [tab, setTab] = useState<"all" | "active" | "sold" | "paused">("all");

    const filterMap: Record<"all" | "active" | "sold" | "paused", GetPlateAdsParams["filter_type"]> = {
    all: "none",
    active: "active",
    sold: "sold",
    paused: "paused_at",
    };

    const vehicleTypes: ("cars" | "fun" | "bikes" | "classic")[] = ["cars", "fun", "bikes", "classic"];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["plateAds", tab, vehicleTypes],
    queryFn: () =>
      getPlateAds({
        filter_type: filterMap[tab],
        pagination: "normal",
        vehicle_types: vehicleTypes,
      }),
  });

    return (
        <section>
            <div className="flex flex-wrap items-center justify-center md:gap-[68px] gap-4">
            {isLoading ? (
            [...Array(4)].map((_, i) => (
                <Skeleton
                key={i}
                className="md:w-60 w-40 h-[90px] rounded-lg"
                />
            ))
            ) : (
            <>
                <div className="md:px-6 px-2 py-5 bg-[#EEF6FF] rounded-lg flex items-center gap-3">
                    <TotalAds />
                    <div>
                        <h2 className="text-[#155DFD] text-2xl font-semibold">
                        {data?.total ?? "-"}
                        </h2>
                        <p className="text-[#717171] text-base font-medium mt-2">Total Ads</p>
                    </div>
                </div>

                <div className="md:px-6 px-2 py-5 bg-[#ECF5F1] rounded-lg flex items-center gap-3">
                    <Active />
                    <div>
                        <h2 className="text-[#19AA3D] text-2xl font-semibold">
                        {data?.data?.filter((p) => p.is_active).length ?? 0}
                        </h2>
                        <p className="text-[#717171] text-base font-medium mt-2">Active</p>
                    </div>
                </div>

                <div className="md:px-6 px-2 py-5 bg-[#FFF9E0] rounded-lg flex items-center gap-3">
                    <Sold />
                    <div>
                        <h2 className="text-[#B48110] text-2xl font-semibold">
                        {data?.data?.filter((p) => p.is_sold).length ?? 0}
                        </h2>
                        <p className="text-[#717171] text-base font-medium mt-2">Sold</p>
                    </div>
                </div>

                <div className="md:px-6 px-2 py-5 bg-[#F0F0F080] rounded-lg flex items-center gap-3">
                    <Paused />
                    <div>
                        <h2 className="text-[#717171] text-2xl font-semibold">
                        {data?.data?.filter((p) => p.paused_at !== null).length ?? 0}
                        </h2>
                        <p className="text-[#717171] text-base font-medium mt-2">Paused</p>
                    </div>
                </div>
                </>
                )}
            </div>

            <div className="mt-12 flex items-center justify-center">
                <Tabs
                    value={tab}
                    onValueChange={(val) => setTab(val as any)}
                    className="flex items-center justify-center"
                    >
                    <TabsList className="bg-transparent flex md:gap-[68px] mb-12">
                        <TabsTrigger value="all">All ADs</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="sold">Sold</TabsTrigger>
                        <TabsTrigger value="paused">Paused</TabsTrigger>
                    </TabsList>
                    <TabsContent value={tab}>
                        {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-[220px] w-full rounded-lg"
                            />
                            ))}
                        </div>
                        ) : data?.data && data.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {data.data.map((plate) => (
                            <ProfilePlates key={plate.id} plate={plate} refetch={refetch} />
                            ))}
                        </div>
                            ) : (
                                <AdsEmptyState />
                            )}
                        </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export default MyAdsComponent
