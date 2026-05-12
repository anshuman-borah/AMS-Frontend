import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ProposalDetails from "./ProposalDetails";
import SimilarityPanel from "./SimilarityPanel";

export default function ProposalModal({ proposal, onClose }) {
  const [review, setReview]       = useState("");
  const [isEditing, setIsEditing] = useState(false);

  if (!proposal) return null;

  return (
    <div className="flex-1 p-6 overflow-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Assigned Reviews</h2>
      <button
        onClick={onClose}
        className="flex items-center gap-1 text-blue-600 text-sm hover:underline mb-6"
      >
        <ArrowLeft size={14} /> Back to list
      </button>

      <div className="flex gap-4 items-start max-w-4xl">
        {/* Left */}
        <div className="flex-1 space-y-4">
          <ProposalDetails proposal={proposal} />

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 text-base mb-3">Review</h3>
            <textarea
              rows={5}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              disabled={!isEditing}
              placeholder="View the comment from the reviewer"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-50 resize-none"
            />
            <button
              onClick={() => setIsEditing((v) => !v)}
              className="mt-3 px-5 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {/* Right */}
        <SimilarityPanel similarity={proposal.similarity} />
      </div>
    </div>
  );
}