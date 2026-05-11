import SimilarityBadge from "./SimilarityBadge";

const MOCK_REVIEWERS = [
  { title: "ML in HealthCare", name: "Dr. Verma (2020)", match: "78% match" },
  { title: "ML in HealthCare", name: "Dr. Verma (2020)", match: "50% match" },
];

export default function SimilarityPanel({ similarity = 45 }) {
  return (
    <div className="w-56 shrink-0 space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 p-4 text-sm">
        <p className="font-semibold text-gray-700 mb-3">Similarity Analysis</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500 text-xs">Similarity Score</span>
          <SimilarityBadge value={similarity} />
        </div>
        {similarity >= 40 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs rounded-lg px-3 py-1.5 text-center font-medium">
            ⚠ Similar Projects detected
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 text-sm">
        <p className="font-semibold text-gray-700 mb-3">Reviewer Details</p>
        <div className="space-y-2">
          {MOCK_REVIEWERS.map((r, i) => (
            <div key={i} className="bg-blue-50 rounded-lg px-3 py-2">
              <p className="font-semibold text-gray-800 text-xs">{r.title}</p>
              <p className="text-gray-500 text-xs">{r.name}</p>
              <p className="text-gray-400 text-xs">{r.match}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}