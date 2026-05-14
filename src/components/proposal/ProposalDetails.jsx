import { ArrowLeft } from "lucide-react";

export default function ProposalDetails({ proposal, onBack }) {
  const objectives = proposal.objectives?.length
    ? proposal.objectives
    : [
        "Develop machine learning models for disease prediction",
        "Create an intuitive interface for medical professionals",
        "Validate the system with clinical trials",
      ];

  // Determine if reviewer details should be shown
  const shouldShowReviewer = ["UNDER_REVIEW", "APPROVED", "REJECTED", "REVISION_REQUIRED"].includes(proposal.status);
  
  // Determine if final decision should be shown
  const isFinalDecision = ["APPROVED", "REJECTED", "REVISION_REQUIRED"].includes(proposal.status);

  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Proposal Details
      </h1>

      <button
        onClick={onBack}
        className="flex items-center gap-1 text-blue-500 text-sm mb-6"
      >
        <ArrowLeft size={16} />
        Back to list
      </button>

      {/* Layout */}
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT SECTION */}
        <div className="col-span-9 space-y-6">

          {/* Proposal Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-sm text-gray-700 shadow-sm">

            <h3 className="font-semibold text-gray-800 text-base border-b pb-3 mb-5">
              Proposal Details
            </h3>

            <div className="space-y-7">

              <Block
                label="Principal Scientist"
                value={proposal.submittedBy?.name || "N/A"}
              />

              <Block
                label="Project Title"
                value={proposal.title || "N/A"}
              />

              <Block
                label="Discipline"
                value={
                  proposal.discipline?.replaceAll("_", " ") || "N/A"
                }
              />

              <div>
                <p className="font-semibold text-gray-600 mb-2">
                  Introduction & Rationale
                </p>

                <p className="text-gray-700 leading-7">
                  {proposal.introduction || "No introduction available"}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-600 mb-2">
                  Objectives
                </p>

                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>

              <Block
                label="Budget"
                value={`₹ ${proposal.budget?.grandTotal || 0}`}
              />

            </div>
          </div>

          {/* Review Section - Only show when review is available */}
          {isFinalDecision && proposal.finalComment && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 text-base mb-4">
                Review Decision
              </h3>

              <div className={`mb-4 inline-block text-xs px-3 py-1 rounded-full font-medium
                ${
                  proposal.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : proposal.status === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }
              `}>
                {proposal.status?.replaceAll("_", " ") || "PENDING"}
              </div>

              <textarea
                value={proposal.finalComment || "No review comment available"}
                readOnly
                className="w-full h-40 border border-gray-200 rounded-lg p-4 resize-none focus:outline-none bg-gray-50"
              />
            </div>
          )}

          {/* Under Review Message */}
          {proposal.status === "UNDER_REVIEW" && (
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 shadow-sm">
              <h3 className="font-semibold text-blue-800 text-base mb-2">
                Under Review
              </h3>
              <p className="text-blue-700 text-sm">
                Your proposal is currently being reviewed by the assigned reviewer. 
                You will be notified once the review is complete.
              </p>
            </div>
          )}

          {/* Submitted Message */}
          {proposal.status === "SUBMITTED" && (
            <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6 shadow-sm">
              <h3 className="font-semibold text-yellow-800 text-base mb-2">
                Awaiting Reviewer Assignment
              </h3>
              <p className="text-yellow-700 text-sm">
                Your proposal has been submitted and is waiting for an admin to assign a reviewer.
              </p>
            </div>
          )}

        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-3 space-y-6">

          {/* Similarity */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">

            <h3 className="font-semibold text-gray-800 mb-4">
              Similarity Analysis
            </h3>

            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600">
                Similarity Score
              </span>

              <span className={`font-semibold ${
                proposal.similarityScore >= 70 
                  ? "text-red-500" 
                  : proposal.similarityScore >= 40 
                  ? "text-yellow-500" 
                  : "text-green-500"
              }`}>
                {proposal.similarityScore || 0}%
              </span>
            </div>

            <div
              className={`text-xs px-3 py-2 rounded-full ${
                proposal.similarityScore >= 70
                  ? "bg-red-100 text-red-700"
                  : proposal.similarityScore >= 40
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {proposal.similarityScore >= 70
                ? "⚠ High Similarity Detected"
                : proposal.similarityScore >= 40
                ? "⚠ Moderate Similarity Detected"
                : "✓ No Significant Similarity"}
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">

            <h3 className="font-semibold text-gray-800 mb-4">
              Proposal Status
            </h3>

            <div className="space-y-4">

              <div className="bg-gray-50 rounded-lg p-4">

                {/* Status Badge */}
                <div
                  className={`inline-block text-xs px-3 py-1 rounded-full font-medium
                    ${
                      proposal.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : proposal.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : proposal.status === "REVISION_REQUIRED"
                        ? "bg-yellow-100 text-yellow-700"
                        : proposal.status === "UNDER_REVIEW"
                        ? "bg-blue-100 text-blue-700"
                        : proposal.status === "SUBMITTED"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {proposal.status?.replaceAll("_", " ") || "DRAFT"}
                </div>

                {/* Reviewer Details - Only show when shouldShowReviewer is true */}
                {shouldShowReviewer && proposal.assignedReviewer && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Assigned Reviewer</p>
                    <p className="font-semibold text-sm text-gray-800">
                      {proposal.assignedReviewer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {proposal.assignedReviewer.email}
                    </p>
                    {proposal.assignedReviewer.institution && (
                      <p className="text-xs text-gray-500 mt-1">
                        {proposal.assignedReviewer.institution}
                      </p>
                    )}
                  </div>
                )}

                {/* Show message when reviewer is assigned but not yet reviewed */}
                {proposal.status === "UNDER_REVIEW" && proposal.assignedReviewer && (
                  <p className="text-xs text-blue-600 mt-3">
                    Review in progress...
                  </p>
                )}

                {/* Timestamps */}
                {proposal.submittedAt && (
                  <p className="text-xs text-gray-400 mt-3">
                    Submitted: {new Date(proposal.submittedAt).toLocaleDateString()}
                  </p>
                )}
                
                {proposal.approvedAt && (
                  <p className="text-xs text-green-600 mt-1">
                    Approved: {new Date(proposal.approvedAt).toLocaleDateString()}
                  </p>
                )}
                
                {proposal.rejectedAt && (
                  <p className="text-xs text-red-600 mt-1">
                    Rejected: {new Date(proposal.rejectedAt).toLocaleDateString()}
                  </p>
                )}
                
                {proposal.revisionRequestedAt && (
                  <p className="text-xs text-yellow-600 mt-1">
                    Revision Requested: {new Date(proposal.revisionRequestedAt).toLocaleDateString()}
                  </p>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Block({ label, value }) {
  return (
    <div>
      <p className="font-semibold text-gray-600 mb-1">
        {label}
      </p>

      <p className="text-gray-700">
        {value}
      </p>
    </div>
  );
}