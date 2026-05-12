import { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../../components/common/Sidebar";
import ProposalTable from "../../components/proposal/ProposalTable";
// import ProposalModal from "../components/ProposalModal";
import ProposalDetails from "../../components/proposal/ProposalDetails";

const MOCK_PROPOSALS = [
  { id: 1, projectCode: "FIG-123", title: "Optimizing Crop Yields and Soil Health", status: "Rejected", similarity: 100, submittedDate: "2026-04-25" },
  { id: 2, projectCode: "FIG-123", title: "Optimizing Crop Yields and Soil Health", status: "Accepted", similarity: 15, submittedDate: "2026-04-25" },
  { id: 3, projectCode: "FIG-123", title: "Optimizing Crop Yields and Soil Health", status: "Pending", similarity: 23, submittedDate: "2026-04-25" },
  { id: 4, projectCode: "FIG-123", title: "Optimizing Crop Yields and Soil Health", status: "Pending", similarity: 15, submittedDate: "2026-04-25" },
];

export default function MyProposals({ onLogout }) {
  const [search, setSearch] = useState("");
  const [selectedProposal, setSelected] = useState(null);

  const filtered = MOCK_PROPOSALS.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.projectCode.toLowerCase().includes(search.toLowerCase())
  );

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



      setProposals(response.data.proposals || []);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8">

          {
            !selectedProposal && (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  My Proposals
                </h1>

                <p className="text-gray-500 text-sm mb-6">
                  View and manage your research proposals.
                </p>
              </>
            )
          }

          {/* Search */}
          {
            !selectedProposal && (
              <div className="relative w-72 mb-6">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search assignments..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )
          }

          {
            !selectedProposal ? (
              <ProposalTable
                proposals={filtered}
                onView={setSelected}
              />
            ) : (
              <ProposalDetails
                proposal={selectedProposal}
                onBack={() => setSelected(null)}
              />
            )
          }
        </div>
      </main>

      {/* <ProposalModal proposal={selectedProposal} onClose={() => setSelected(null)} /> */}
    </div>
  );
}