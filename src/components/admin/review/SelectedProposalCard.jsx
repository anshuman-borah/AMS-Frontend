export default function SelectedProposalCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Selected Proposal
      </h2>

      <div className="space-y-5">

        <div>
          <p className="text-xs text-gray-400 uppercase mb-2">
            Select Proposal
          </p>

          <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>
              PRO-2026-001 - Machine Learning
            </option>
          </select>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase mb-2">
            Proposal Title
          </p>

          <p className="font-semibold text-gray-800">
            Machine Learning Applications in Climate Change Prediction
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase mb-2">
            Discipline
          </p>

          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            Computer Science
          </span>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase mb-2">
            Similarity Score
          </p>

          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
            85%
          </span>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase mb-2">
            Submitted By
          </p>

          <p className="font-semibold text-gray-800">
            Dr. Sarah Chen
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">

          <p className="text-xs text-gray-400 uppercase mb-3">
            Current Assigned Reviewers
          </p>

          <div className="border border-blue-100 rounded-xl p-4 bg-blue-50">

            <p className="font-semibold text-blue-700">
              Dr. James Wilson
            </p>

            <button className="text-xs text-red-500 mt-1">
              Remove
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}