import {
  Eye,
  Trash2,
} from "lucide-react";

export default function ProposalTable({ proposals }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">

      <table className="min-w-[900px] w-full text-sm">

        <thead>
          <tr className="bg-gray-50 text-gray-400 uppercase text-xs tracking-wide">

            <th className="px-6 py-4 text-left">
              Proposal ID
            </th>

            <th className="px-6 py-4 text-left">
              Proposal Title
            </th>

            <th className="px-6 py-4 text-left">
              Scientist Name
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Submitted Date
            </th>

            <th className="px-6 py-4 text-left">
              Actions
            </th>

          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">

          {proposals.map((p, i) => (

            <tr
              key={i}
              className="hover:bg-gray-50 transition"
            >

              <td className="px-6 py-5 font-semibold text-gray-700">
                {p.id?.slice(-6).toUpperCase() || "0"}
              </td>

              <td className="px-6 py-5">

                <p className="font-semibold text-gray-800">
                  {p.title}
                </p>

              </td>

              <td className="px-6 py-5">

                <p className="font-medium text-gray-800">
                  {p.scientist}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {p.email}
                </p>

              </td>

              <td className="px-6 py-5">

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.statusColor}`}>
                  {p.status}
                </span>

              </td>

              <td className="px-6 py-5 text-gray-500">
                {p.date}
              </td>

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <button className="text-blue-500 hover:text-blue-700">
                    <Eye size={16} />
                  </button>

                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}