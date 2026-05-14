import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, X } from "lucide-react";

import Sidebar from "../../components/common/Sidebar";
import ProposalTable from "../../components/proposal/ProposalTable";
import ProposalDetails from "../../components/proposal/ProposalDetails";

export default function MyProposals({ onLogout }) {
  // Search and Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Selected proposal
  const [selectedProposal, setSelectedProposal] = useState(null);
  
  // API data
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const LIMIT = 5;

  // Available statuses for filter
  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "DRAFT", label: "Draft" },
    { value: "SUBMITTED", label: "Submitted" },
    { value: "UNDER_REVIEW", label: "Under Review" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
    { value: "REVISION_REQUIRED", label: "Revision Required" },
  ];

  // Fetch proposals when page, search, or status filter changes
  useEffect(() => {
    fetchProposals();
  }, [currentPage, search, statusFilter]);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("limit", LIMIT);
      
      if (search.trim()) {
        params.append("search", search.trim());
      }
      
      if (statusFilter) {
        params.append("status", statusFilter);
      }
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/scientist/my-proposals?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("my proposal------>", response.data);
      setProposals(response.data.proposals || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setTotalItems(response.data.pagination?.totalItems || 0);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProposalDetails = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/scientist/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedProposal(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          
          {/* Header */}
          {!selectedProposal && (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                My Proposals
              </h1>
              <p className="text-gray-500 text-sm mb-6">
                View and manage your research proposals.
              </p>
            </>
          )}

          {/* Search and Filters - Only show when not in detail view */}
          {!selectedProposal && (
            <div className="mb-6 space-y-4">
              {/* Search Bar */}
              <div className="flex gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by title, unique code, discipline..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-colors ${
                    showFilters || statusFilter
                      ? "bg-blue-50 border-blue-300 text-blue-600"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Filter size={16} />
                  Filters
                  {statusFilter && (
                    <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                      1
                    </span>
                  )}
                </button>
                
                {(search || statusFilter) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                    Clear
                  </button>
                )}
              </div>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={statusFilter}
                        onChange={(e) => {
                          setStatusFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Results Count */}
                    <div className="flex items-end">
                      <p className="text-sm text-gray-500">
                        Showing {proposals.length} of {totalItems} proposals
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(LIMIT)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : !selectedProposal ? (
            <>
              {/* No Results */}
              {proposals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-2">No proposals found</p>
                  {(search || statusFilter) && (
                    <button
                      onClick={clearFilters}
                      className="text-blue-500 text-sm hover:underline"
                    >
                      Clear filters to see all proposals
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Table */}
                  <ProposalTable
                    proposals={proposals}
                    onView={fetchProposalDetails}
                  />
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-6">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1 || loading}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      
                      <span className="font-medium">
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage >= totalPages || loading}
                        className="px-4 py-2 border rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <ProposalDetails
              proposal={selectedProposal}
              onBack={() => setSelectedProposal(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
}