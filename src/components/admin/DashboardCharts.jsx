import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const BAR_DATA = [
  { discipline: "Health Science", projects: 12 },
  { discipline: "CSE", projects: 11 },
  { discipline: "NLP", projects: 1 },
  { discipline: "Not specified", projects: 3 },
];

const PIE_DATA = [
  { name: "Health Science", value: 46, color: "#3b82f6" },
  { name: "CSE", value: 42, color: "#8b5cf6" },
  { name: "NLP", value: 4, color: "#f59e0b" },
  { name: "Not specified", value: 4, color: "#10b981" },
  { name: "Computer Sci.", value: 4, color: "#f97316" },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">

      {/* Bar Chart */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">

        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Top Disciplines by Project Count
        </h3>

        <ResponsiveContainer width="100%" height={210}>
          <BarChart
            data={BAR_DATA}
            margin={{ top: 4, right: 8, left: -22, bottom: 4 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
            />

            <XAxis
              dataKey="discipline"
              tick={{ fontSize: 11, fill: "#6b7280" }}
            />

            <YAxis
              tick={{ fontSize: 11, fill: "#6b7280" }}
              domain={[0, 13]}
              ticks={[0, 3, 6, 9, 12]}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 8,
                fontSize: 12,
                border: "1px solid #e5e7eb",
              }}
              cursor={{ fill: "#eff6ff" }}
            />

            <Bar
              dataKey="projects"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="Projects"
            />
          </BarChart>
        </ResponsiveContainer>

        <div className="flex items-center gap-2 mt-2 justify-center">
          <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />

          <span className="text-xs text-gray-500">
            Projects
          </span>
        </div>

      </div>

      {/* Pie Chart */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">

        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Discipline Distribution
        </h3>

        <ResponsiveContainer width="100%" height={210}>
          <PieChart>

            <Pie
              data={PIE_DATA}
              cx="40%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              labelLine={false}
            >
              {PIE_DATA.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={8}
              formatter={(value, entry) => (
                <span
                  style={{
                    fontSize: 11,
                    color: "#374151",
                  }}
                >
                  {value}: {entry.payload.value}%
                </span>
              )}
            />

            <Tooltip
              formatter={(v, n) => [`${v}%`, n]}
              contentStyle={{
                borderRadius: 8,
                fontSize: 12,
                border: "1px solid #e5e7eb",
              }}
            />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}