import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getPlateAds,
  type GetPlateAdsParams,
} from "../../lib/api/plates/getPlateAds";
import { getSims } from "../../lib/api/sims";
import { useAuthStore } from "../../store/useAuthStore";
import AdsStats from "./AdsStats";
import ProfilePlates from "./ProfilePlates";
import AdsEmptyState from "../general/AdsEmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Skeleton } from "../ui/skeleton";
import { useTranslation } from "react-i18next";
import SimCard from "../home/SimCard";

const AllAds = () => {
  const { t, i18n } = useTranslation("profile");
  const { user } = useAuthStore();
  const [tab, setTab] = useState<"all" | "active" | "sold" | "paused">("all");
  const [searchParams] = useSearchParams();

  const vehicleTypes = useMemo(() => {
    const typesFromUrl = searchParams.get("types");
    if (!typesFromUrl)
      return ["cars", "fun", "bikes", "classic"] as string[];
    return typesFromUrl.split(",");
  }, [searchParams]);

  const isSims = vehicleTypes.includes("sims");

  const filterMap: Record<
    "all" | "active" | "sold" | "paused",
    GetPlateAdsParams["filter_type"]
  > = {
    all: "none",
    active: "active",
    sold: "sold",
    paused: "paused_at",
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allAds", tab, vehicleTypes, user?.id],
    queryFn: async () => {
      if (isSims) {
        return getSims({
          filter_type: filterMap[tab],
          user_id: user?.id,
        });
      }

      return getPlateAds({
        filter_type: filterMap[tab],
        pagination: "normal",
        vehicle_types: vehicleTypes as any,
      });
    },
    enabled: !!user,
  });

  return (
    <div className="mt-12">
      <AdsStats data={data} isLoading={isLoading} />

      <div className="flex items-center justify-center">
        <Tabs
          value={tab}
          onValueChange={(val) =>
            setTab(val as "all" | "active" | "sold" | "paused")
          }
          className="flex items-center justify-center"
        >
          <TabsList
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            className="bg-transparent flex md:gap-[68px] mb-12"
          >
            <TabsTrigger value="all">{t("tab_all_ads")}</TabsTrigger>
            <TabsTrigger value="active">{t("tab_active")}</TabsTrigger>
            <TabsTrigger value="sold">{t("tab_sold")}</TabsTrigger>
            <TabsTrigger value="paused">{t("tab_paused")}</TabsTrigger>
          </TabsList>

          <TabsContent value={tab}>
            {isLoading ? (
              <div
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-[220px] w-full rounded-lg" />
                ))}
              </div>
            ) : data?.data && data.data.length > 0 ? (
              <div
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              >
            {isSims
              ? data.data.map((sim: any) => (
                  <SimCard key={sim.id} sim={sim} />
                ))
              : data.data.map((plate: any) => (
                  <ProfilePlates
                    key={plate.id}
                    plate={plate}
                    refetch={refetch}
                  />
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
