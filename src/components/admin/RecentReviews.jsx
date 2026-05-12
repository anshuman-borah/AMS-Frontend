export default function RecentReviews({ reviews }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

      <p className="px-6 py-4 border-b border-gray-100 text-sm font-semibold text-gray-700">
        Recent Reviews
      </p>

      <div className="divide-y divide-gray-50">

        {reviews.map((r, i) => (

          <div
            key={i}
            className="px-6 py-4 hover:bg-gray-50 transition-colors"
          >

            <div className="flex items-start justify-between gap-3 mb-1.5">

              <p className="text-xs font-medium text-gray-800 leading-snug">
                {r.title}
              </p>

              <span
                className={`shrink-0 px-2 py-0.5 rounded text-xs font-bold ${r.decisionColor}`}
              >
                {r.decision}
              </span>

            </div>

            <p className="text-xs text-gray-500 italic mb-1.5 line-clamp-2">
              {r.comment}
            </p>

            <p className="text-xs text-gray-400">
              Reviewer:

              <span className="font-medium text-gray-600">
                {" "}
                {r.reviewer}
              </span>
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}