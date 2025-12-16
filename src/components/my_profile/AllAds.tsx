import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPlateAds, type GetPlateAdsParams } from "../../lib/api/plates/getPlateAds";
import AdsStats from "./AdsStats";
import ProfilePlates from "./ProfilePlates";
import AdsEmptyState from "../general/AdsEmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Skeleton } from "../ui/skeleton";

const AllAds = () => {
  const [tab, setTab] = useState<"all" | "active" | "sold" | "paused">("all");
  const [searchParams] = useSearchParams();

  const vehicleTypes = useMemo(() => {
    const typesFromUrl = searchParams.get("types");
    if (!typesFromUrl) return ["cars", "fun", "bikes", "classic"];
    return typesFromUrl.split(",") as ("cars" | "fun" | "bikes" | "classic")[];
  }, [searchParams]);

  const filterMap: Record<"all" | "active" | "sold" | "paused", GetPlateAdsParams["filter_type"]> = {
    all: "none",
    active: "active",
    sold: "sold",
    paused: "paused_at",
  };

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
    <div className="mt-12">
      <AdsStats data={data} isLoading={isLoading} />

      <div className="flex items-center justify-center">
        <Tabs value={tab} onValueChange={(val) => setTab(val as any)} className="flex items-center justify-center">
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
                  <Skeleton key={i} className="h-[220px] w-full rounded-lg" />
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
    </div>
  );
};

export default AllAds;
