import { Search } from "lucide-react";
export default function ReviewerTable({ reviewers }) {
  return (
    <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      {/* Top */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          Available Reviewers
        </h2>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search reviewers..."
              className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Filters */}
          <div className="grid grid-cols-2 gap-4">
            <select className="border border-gray-200 rounded-xl px-4 py-3 text-sm">
              <option>All Expertise</option>
            </select>

            <select className="border border-gray-200 rounded-xl px-4 py-3 text-sm">
              <option>All Availability</option>
            </select>

          </div>

        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[950px] w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-400 uppercase text-xs tracking-wide">
              <th className="px-6 py-4 text-left">
                Reviewer
              </th>
              <th className="px-6 py-4 text-left">
                Expertise
              </th>
              <th className="px-6 py-4 text-left">
                Assigned
              </th>
              <th className="px-6 py-4 text-left">
                Pending
              </th>
              <th className="px-6 py-4 text-left">
                Workload
              </th>
              <th className="px-6 py-4 text-left">
                Status
              </th>
              <th className="px-6 py-4 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reviewers.map((r, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-5 font-semibold text-gray-800 whitespace-nowrap">
                  {r.name}
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {(r.expertise || []).map((e, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold whitespace-nowrap"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5">
                  {r.assigned}
                </td>
                <td className="px-6 py-5">
                  {r.pending}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <div className="w-16 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full ${r.workloadColor}`}
                        style={{
                          width: r.workload,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {r.workload}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${r.statusColor}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-5">

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap">
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}