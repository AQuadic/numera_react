import type { AnalyticsData } from "../../../lib/api/analytics/getAnalytics";
import AdsInquiries from "../../icons/profile/AdsInquiries"
import AdsStar from "../../icons/profile/AdsStar"
import AdsViews from "../../icons/profile/AdsViews"
import DonutChart from "../DonutChart"

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
                        {[1, 2, 3].map((_, index) => (
                            <div
                            key={index}
                            className="border border-[#E5E5E5] rounded-[8px] md:h-[74px] md:px-5 px-2 py-3 flex items-center justify-between"
                            >
                            <div className="relative flex items-center gap-2">
                                <div className="w-[50px] h-[50px] bg-[#192540] rounded-[8px] text-[#FEFEFE] flex items-center justify-center">
                                A123
                                </div>
                                <div className="absolute -top-3 -left-4">
                                <AdsStar />
                                </div>
                                <div>
                                <h2 className="text-[#192540] md:text-base text-sm font-medium">Plate A-123-ABC</h2>
                                <p className="text-[#A3A3A3] md:text-sm text-sm mt-1">Posted 5 days ago</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                <AdsViews />
                                <p className="text-[#192540] text-sm font-medium">
                                {analytics?.views ?? 0} views
                                </p>
                                </div>
                                <div className="flex items-center gap-1">
                                <AdsInquiries />
                                <p className="text-[#EBAF29] text-sm font-medium">
                                {analytics?.inquiries ?? 0} inquiries
                                </p>
                            </div>
                            </div>
                            </div>
                        ))}
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
