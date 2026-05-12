export default function ReviewerWorkload({ reviewers = [] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

      <p className="px-6 py-4 border-b border-gray-100 text-sm font-semibold text-gray-700">
        Reviewer Workload
      </p>

      <table className="w-full text-xs">

        <thead>
          <tr className="bg-gray-50 text-gray-400 uppercase tracking-wide">

            <th className="px-6 py-2.5 text-left font-medium">
              Reviewer
            </th>

            <th className="px-6 py-2.5 text-left font-medium">
              Assigned Projects
            </th>

            <th className="px-6 py-2.5 text-left font-medium">
              Pending Reviews
            </th>

          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">

          {reviewers.map((r, i) => (

            <tr
              key={i}
              className="hover:bg-gray-50 transition-colors"
            >

              <td className="px-6 py-3 font-medium text-gray-800">
                {r.name}
              </td>

              <td className="px-6 py-3 text-gray-600">
                {r.assignedProjects}
              </td>

              <td className="px-6 py-3">

                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    r.pendingReviews > 0
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {r.pendingReviews}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}