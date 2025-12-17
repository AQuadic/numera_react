import TotalAds from "../icons/profile/TotalAds";
import Active from "../icons/profile/Active";
import Sold from "../icons/profile/Sold";
import Paused from "../icons/profile/Paused";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";

interface AdsStatsProps {
  data?: {
    total: number;
    data: Array<{
      is_active: boolean;
      is_sold: boolean;
      paused_at?: string | null;
    }>;
  };
  isLoading: boolean;
}

type StatsData = AdsStatsProps["data"];

const AdsStats = ({ data, isLoading }: AdsStatsProps) => {
  const [cachedData, setCachedData] = useState<StatsData | undefined>(data);

  useEffect(() => {
    // Only update cache when we actually receive new data reference to avoid extra renders
    // Defer the setState to avoid calling setState synchronously inside the effect
    if (data && data !== cachedData) {
      const id = setTimeout(() => setCachedData(data), 0);
      return () => clearTimeout(id);
    }
    return;
  }, [data, cachedData]);

  const renderData = isLoading ? cachedData : data;
  const showSkeletons = isLoading && !cachedData;
  return (
    <div
      className={`flex flex-wrap items-center justify-center md:gap-[68px] gap-4 mb-8 ${
        isLoading ? "opacity-70" : ""
      }`}
    >
      {showSkeletons ? (
        [...Array(4)].map((_, i) => (
          <Skeleton key={i} className="md:w-60 w-40 h-[90px] rounded-lg" />
        ))
      ) : (
        <>
          <div className="w-[187px] md:px-6 px-2 py-5 bg-[#EEF6FF] rounded-lg flex items-center gap-3">
            <TotalAds />
            <div>
              <h2 className="text-[#155DFD] text-2xl font-semibold">
                {renderData?.total ?? "-"}
              </h2>
              <p className="text-[#717171] text-base font-medium mt-2">
                Total Ads
              </p>
            </div>
          </div>

          <div className="w-[187px] md:px-6 px-2 py-5 bg-[#ECF5F1] rounded-lg flex items-center gap-3">
            <Active />
            <div>
              <h2 className="text-[#19AA3D] text-2xl font-semibold">
                {renderData?.data?.filter((p) => p.is_active).length ?? 0}
              </h2>
              <p className="text-[#717171] text-base font-medium mt-2">
                Active
              </p>
            </div>
          </div>

          <div className="w-[187px] md:px-6 px-2 py-5 bg-[#FFF9E0] rounded-lg flex items-center gap-3">
            <Sold />
            <div>
              <h2 className="text-[#B48110] text-2xl font-semibold">
                {renderData?.data?.filter((p) => p.is_sold).length ?? 0}
              </h2>
              <p className="text-[#717171] text-base font-medium mt-2">Sold</p>
            </div>
          </div>

          <div className="w-[187px] md:px-6 px-2 py-5 bg-[#F0F0F080] rounded-lg flex items-center gap-3">
            <Paused />
            <div>
              <h2 className="text-[#717171] text-2xl font-semibold">
                {renderData?.data?.filter((p) => p.paused_at !== null).length ??
                  0}
              </h2>
              <p className="text-[#717171] text-base font-medium mt-2">
                Paused
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdsStats;
