import { useQuery } from "@tanstack/react-query";
import { getAnalytics, type AnalyticsData } from "../../../lib/api/analytics/getAnalytics";
import Stats from "./Stats"
import TopPerformingAds from "./TopPerformingAds"
import ViewsOverview from "./ViewsOverview"
import Spinner from "../../icons/general/Spinner";

const AnalyticalDashboard = () => {
    const { data, isLoading } = useQuery<AnalyticsData>({
        queryKey: ["analytics"],
        queryFn: getAnalytics,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });

    if (isLoading) return <div className="flex items-center justify-center">
        <Spinner />
    </div>
    return (
        <section>
            <Stats analytics={data}/>
            <TopPerformingAds analytics={data}/>
            <ViewsOverview />
        </section>
    )
}

export default AnalyticalDashboard
