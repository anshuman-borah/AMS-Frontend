import { ArrowLeft } from "lucide-react";

export default function ProposalDetails({ proposal, onBack }) {
  const objectives = proposal.objectives?.length
    ? proposal.objectives
    : [
      "Develop machine learning models for disease prediction",
      "Create an intuitive interface for medical professionals",
      "Validate the system with clinical trials",
    ];

  return (
    <div>

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Assigned Reviews
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
                value={proposal.title}
              />

              <Block
                label="Discipline"
                value={proposal.discipline?.replaceAll("_", " ") || "N/A"}
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

          {/* Review Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

            <h3 className="font-semibold text-gray-800 text-base mb-4">
              Review
            </h3>

            <textarea
              value={proposal.finalComment || "No review comment available"}
              readOnly
              className="w-full h-40 border border-gray-200 rounded-lg p-4 resize-none focus:outline-none bg-gray-50"
            />


          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-3 space-y-6">

          {/* Similarity */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">

            <h3 className="font-semibold text-gray-800 mb-4">
              Similarity Analysis
            </h3>

            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600">Similarity Score</span>

              <span className="text-red-500 font-semibold">
                {proposal.similarityScore || 0}%
              </span>
            </div>

            <div
              className={`text-xs px-3 py-2 rounded-full ${proposal.similarityScore > 20
                  ? "bg-red-100 text-red-700"
                  : proposal.similarityScore > 0
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
            >
              {proposal.similarityScore > 20
                ? "⚠ High Similarity Detected"
                : proposal.similarityScore > 0
                  ? "⚠ Similar Projects Detected"
                  : "✓ No Significant Similarity"}
            </div>
          </div>

          {/* Reviewer Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">

            <h3 className="font-semibold text-gray-800 mb-4">
              Reviewer Details
            </h3>

            <div className="space-y-4">

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-sm">
                   {proposal.assignedReviewer?.name || "No Reviewer Assigned"}
                </p>

                <p className="text-xs text-gray-500">
                {proposal.assignedReviewer?.email || "N/A"}
                </p>

                <p className="text-orange-500 text-xs mt-1">
                     {proposal.status?.replaceAll("_", " ")}
                </p>
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