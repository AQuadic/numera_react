import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { type AnalyticsData } from "../../../lib/api/analytics/getAnalytics";

interface ViewsOverviewProps {
  analytics?: AnalyticsData;
}

const ViewsOverview = ({ analytics }: ViewsOverviewProps) => {
  const data = analytics?.views_over_days?.map((views, index) => ({
    day: index + 1,
    views: views
  })) || [];

  if (!data.length) {
    return (
      <div className="w-full bg-gray-100 rounded-lg p-6 mt-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[#192540] text-[32px] font-medium">Views Overview</h2>
            <Select>
              <SelectTrigger className="w-[212px] mt-4 h-12! flex items-center justify-center">
                <SelectValue placeholder="last month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">last month</SelectItem>
                <SelectItem value="2">last week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full h-64 bg-white rounded-lg p-4 flex items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 rounded-lg p-6 mt-4">
      <div className="mb-4">
            <div className="flex items-center justify-between">
                    <h2 className="text-[#192540] text-[32px] font-medium">Views Overview</h2>
                    <Select>
                        <SelectTrigger className="w-[212px] mt-4 h-12! flex items-center justify-center">
                        <SelectValue placeholder="last month" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="1">last month</SelectItem>
                        <SelectItem value="2">last week</SelectItem>
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