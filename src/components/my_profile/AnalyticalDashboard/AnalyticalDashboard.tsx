import { useQuery } from "@tanstack/react-query";
import { getAnalytics, type AnalyticsData } from "../../../lib/api/analytics/getAnalytics";
import Stats from "./Stats"
import TopPerformingAds from "./TopPerformingAds"
import ViewsOverview from "./ViewsOverview"
import Spinner from "../../icons/general/Spinner";

const AnalyticalDashboard = () => {
  const today = new Date();
  const to_date = today.toISOString().split("T")[0];

  const from = new Date();
  from.setDate(today.getDate() - 30);
  const from_date = from.toISOString().split("T")[0];

    const { data, isLoading } = useQuery<AnalyticsData>({
        queryKey: ["analytics", from_date, to_date],
        queryFn: () => getAnalytics({ from_date, to_date }),
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
            <ViewsOverview analytics={data} />
        </section>
    )
}

export default AnalyticalDashboard
