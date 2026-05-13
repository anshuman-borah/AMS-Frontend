import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";

import Sidebar from "../../components/common/Sidebar";
import ProposalTable from "../../components/proposal/ProposalTable";
import ProposalDetails from "../../components/proposal/ProposalDetails";
export default function MyProposals({ onLogout }) {

  // Search
  const [search, setSearch] = useState("");
  // Selected proposal
  const [selectedProposal, setSelected] = useState(null);
  // API data
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 5;
  // Fetch proposals
  useEffect(() => {
    fetchProposals();
  }, [currentPage]);
  const fetchProposals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/scientist/my-proposals?page=${currentPage}&limit=${LIMIT}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setProposals(response.data.proposals || []);
      setTotalPages(
        response.data.pagination?.totalPages || 1
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // Search filter
  const filtered = proposals.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.projectCode?.toLowerCase().includes(search.toLowerCase())
  );

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

          {/* Search */}
          {!selectedProposal && (
            <div className="relative w-72 mb-6">

              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                id="search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search proposals..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

            </div>
          )}

          {/* Loading */}
          {loading ? (

            <div className="space-y-4">

              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-200 rounded-xl animate-pulse"
                />
              ))}

            </div>

          ) : !selectedProposal ? (

            <>
              {/* Table */}
              <ProposalTable
                proposals={filtered}
                onView={setSelected}
              />
              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-6">

                {/* Previous */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>

                {/* Page */}
                <span className="font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                  disabled={
                    currentPage >= totalPages || loading
                  }
                  className="px-4 py-2 border rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>

              </div>
            </>

          ) : (
            <ProposalDetails
              proposal={selectedProposal}
              onBack={() => setSelected(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
}