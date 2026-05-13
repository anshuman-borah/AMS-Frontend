import SimilarityBadge from "./SimilarityBadge";


const STATUS_STYLES = {
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  SUBMITTED: "bg-blue-100 text-blue-700",
  DRAFT: "bg-yellow-100 text-yellow-700",
  REVISION_REQUIRED: "bg-orange-100 text-orange-700",
  UNDER_REVIEW: "bg-purple-100 text-purple-700",
};

export default function ProposalTable({ proposals, onView }) {
  return (
    <div className="border border-blue-300 rounded-xl overflow-hidden">
      <div className="bg-white px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-800">Review Proposals</h2>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
            <th className="px-6 py-3 text-left font-semibold">Project Code</th>
            <th className="px-6 py-3 text-left font-semibold">Title</th>
            <th className="px-6 py-3 text-left font-semibold">Status</th>
            <th className="px-6 py-3 text-left font-semibold">Similarity</th>
            <th className="px-6 py-3 text-left font-semibold">Submitted</th>
            <th className="px-6 py-3 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <tr key={proposal.uniqueCode} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-700">
                  {proposal.uniqueCode || "N/A"}
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                  {proposal.title}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[proposal.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {proposal.status?.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <SimilarityBadge value={proposal.similarityScore || 0} />
                </td>
                <td className="px-6 py-4 text-gray-500">{proposal.createdAt
                  ? new Date(proposal.createdAt).toLocaleDateString()
                  : "N/A"}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onView(proposal.id)}
                    className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">
                No proposals found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}