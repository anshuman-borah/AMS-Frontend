import {
  Search,
  Filter,
} from "lucide-react";

export default function ProposalFilters() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-6">

      <div className="flex items-center justify-between gap-4">

        {/* Search */}
        <div className="relative w-full max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search proposals by title, ID, or scientist..."
            className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Filter */}
        <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">

          <Filter size={16} />

          All Status

        </button>

      </div>

    </div>
  );
}