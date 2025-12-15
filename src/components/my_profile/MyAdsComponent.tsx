import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlateAds, type GetPlateAdsParams } from "../../lib/api/plates/getPlateAds";
import AdsStats from "./AdsStats";
import ADsCategories from "./ADsCategories";

const MyAdsComponent = () => {
  const [tab] = useState<"all" | "active" | "sold" | "paused">("all");
  const vehicleTypes: ("cars" | "fun" | "bikes" | "classic")[] = ["cars", "fun", "bikes", "classic"];
  const filterMap: Record<"all" | "active" | "sold" | "paused", GetPlateAdsParams["filter_type"]> = {
    all: "none",
    active: "active",
    sold: "sold",
    paused: "paused_at",
  };

  const { data, isLoading } = useQuery({
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
      <AdsStats data={data} isLoading={isLoading} />
      <ADsCategories />
    </section>
  )
}

export default MyAdsComponent
