import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
const ViewsOverview = () => {
  const data = [
    { day: 1, views: 420 },
    { day: 2, views: 480 },
    { day: 3, views: 450 },
    { day: 4, views: 520 },
    { day: 5, views: 490 },
    { day: 6, views: 560 },
    { day: 7, views: 530 },
    { day: 8, views: 600 },
    { day: 9, views: 580 },
    { day: 10, views: 620 },
    { day: 11, views: 610 },
    { day: 12, views: 640 },
    { day: 13, views: 630 },
    { day: 14, views: 650 },
    { day: 15, views: 640 },
    { day: 16, views: 660 },
    { day: 17, views: 650 },
    { day: 18, views: 670 },
    { day: 19, views: 680 },
    { day: 20, views: 690 },
    { day: 21, views: 700 },
    { day: 22, views: 710 },
    { day: 23, views: 720 },
    { day: 24, views: 710 },
    { day: 25, views: 730 },
    { day: 26, views: 740 },
    { day: 27, views: 750 },
    { day: 28, views: 760 },
    { day: 29, views: 780 },
    { day: 30, views: 820 },
  ];

  return (
    <div className="w-full bg-gray-100 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-between">
                    <h2 className="text-[#192540] text-[32px] font-medium">Views Overview</h2>
                    <Select>
                        <SelectTrigger className="w-[212px] mt-4 h-12! flex items-center justify-center">
                        <SelectValue placeholder="last mounth" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="1">last mounth</SelectItem>
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
              interval={0}
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