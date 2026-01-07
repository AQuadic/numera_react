import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { type AnalyticsData } from "../../../lib/api/analytics/getAnalytics";
import { useTranslation } from 'react-i18next';

interface ViewsOverviewProps {
  analytics?: AnalyticsData;
}

const ViewsOverview = ({ analytics }: ViewsOverviewProps) => {
  const { t } = useTranslation("profile");
  const rawViews = analytics?.views_over_days;

  const data = Array.isArray(rawViews)
    ? rawViews.map((views, index) => ({
        day: index + 1,
        views,
      }))
    : rawViews && typeof rawViews === "object"
    ? Object.values(rawViews).map((views, index) => ({
        day: index + 1,
        views: Number(views),
      }))
    : [];

  if (!data.length) {
    return (
      <div className="w-full bg-gray-100 rounded-lg p-6 mt-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[#192540] text-[32px] font-medium">{t("views_overview_title")}</h2>
            <Select>
              <SelectTrigger className="w-[212px] mt-4 h-12! flex items-center justify-center">
                <SelectValue placeholder={t("filter_last_month")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t("filter_last_month")}</SelectItem>
                <SelectItem value="2">{t("filter_last_week")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full h-64 bg-white rounded-lg p-4 flex items-center justify-center">
          <p className="text-gray-500">{t("no_data_available")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 rounded-lg p-6 mt-4">
      <div className="mb-4">
            <div className="flex items-center justify-between">
                    <h2 className="text-[#192540] text-[32px] font-medium">{t("views_overview_title")}</h2>
                    <Select>
                        <SelectTrigger className="w-[212px] mt-4 h-12! flex items-center justify-center">
                        <SelectValue placeholder={t("filter_last_month")} />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="1">{t("filter_last_month")}</SelectItem>
                        <SelectItem value="2">{t("filter_last_week")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
      </div>

      <div className="w-full h-64 bg-white rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
              interval={Math.floor(data.length / 10) || 0}
            />
            <YAxis hide={true} />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="views"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ViewsOverview;