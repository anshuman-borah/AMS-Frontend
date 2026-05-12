export default function RecentProjects({ projects }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

      <p className="px-6 py-4 border-b border-gray-100 text-sm font-semibold text-gray-700">
        Recent Projects
      </p>

      <table className="w-full text-xs">

        <thead>
          <tr className="bg-gray-50 text-gray-400 uppercase tracking-wide">
            <th className="px-6 py-2.5 text-left font-medium">
              Title
            </th>

            <th className="px-4 py-2.5 text-left font-medium">
              Discipline
            </th>

            <th className="px-4 py-2.5 text-left font-medium">
              Status
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">

          {projects.map((p, i) => (

            <tr
              key={i}
              className="hover:bg-gray-50 transition-colors"
            >

              <td className="px-6 py-3">

                <p className="font-medium text-gray-800 truncate max-w-[160px]">
                  {p.title}
                </p>

                <p className="text-gray-400 mt-0.5">
                  by {p.author}
                </p>

              </td>

              <td className="px-4 py-3 text-gray-600">
                {p.discipline}
              </td>

              <td className="px-4 py-3">

                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${p.statusColor}`}
                >
                  {p.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}