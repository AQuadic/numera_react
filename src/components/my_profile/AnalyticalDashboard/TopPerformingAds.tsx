import type { AnalyticsData } from "../../../lib/api/analytics/getAnalytics";
import AdsInquiries from "../../icons/profile/AdsInquiries";
import AdsStar from "../../icons/profile/AdsStar";
import AdsViews from "../../icons/profile/AdsViews";
import DonutChart from "../DonutChart";

interface TopPerformingAdsProps {
  analytics: AnalyticsData | undefined;
}

const  TopPerformingAds = ({ analytics }: TopPerformingAdsProps) => {
    return (
        <div>
            <div className="mt-6 flex md:flex-row flex-col items-center justify-between gap-6">
                <div className="xl:w-1/2 xl:h-[332px] w-full h-full bg-[#F0F0F0] rounded-md p-4">
                    <h2 className="text-[#192540] md:text-[32px] text-xl font-medium">Top Performing Ads</h2>
                    <div className="mt-1 flex flex-col gap-4">
                        {analytics?.top_three_performing_ads?.length ? (
                        analytics.top_three_performing_ads.map((ad, index) => (
                            <div
                            key={index}
                            className="border border-[#E5E5E5] rounded-[8px] lg:h-[74px] md:px-5 px-2 py-3 flex flex-wrap items-center justify-between relative"
                            >
                            <div className=" flex items-center gap-2">
                                <img 
                                    src="/images/plates/plate_image.png"
                                    alt="plate image"
                                    className="w-28 h-[30px]"
                                />
                                <div className="absolute -top-3 -left-4">
                                <AdsStar />
                                </div>
                                <div>
                                <h2 className="text-[#192540] md:text-base text-sm font-medium">
                                    {ad.ad_model}
                                </h2>
                                <p className="text-[#A3A3A3] md:text-sm text-sm mt-1">
                                    Best performing ad #{index + 1}
                                </p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                <AdsViews />
                                <p className="text-[#192540] text-sm font-medium">
                                {ad.views_count} views
                                </p>
                                </div>
                                <div className="flex items-center gap-1">
                                <AdsInquiries />
                                <p className="text-[#EBAF29] text-sm font-medium">
                                {ad.inquiries_count} inquiries
                                </p>
                            </div>
                            </div>
                            </div>
                        ))
                        ) : (
                        <p className="text-[#A3A3A3] text-sm mt-3">No data available</p>
                        )}
                    </div>
                    
            </div>

                <div className="xl:w-1/2 xl:h-[332px] w-full h-full bg-[#F0F0F0] rounded-md p-4">
                    <h2 className="text-[#192540] md:text-[32px] text-xl font-medium">Traffic Sources</h2>
                    <DonutChart
                        views={analytics?.views ?? 0}
                        visitor={analytics?.visitor ?? 0}
                    />
            </div>
            </div>
        </div>
    )
}

export default TopPerformingAds
