import {
  Pencil,
  Trash2,
} from "lucide-react";

export default function UserTable({ users }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">

      <table className="min-w-[1000px] w-full text-sm">

        <thead>
          <tr className="bg-gray-50 text-gray-400 uppercase text-xs tracking-wide">

            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Role
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Assigned Proposals
            </th>

            <th className="px-6 py-4 text-left">
              Created Date
            </th>

            <th className="px-6 py-4 text-left">
              Actions
            </th>

          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">

          {users.map((u, i) => (

            <tr
              key={i}
              className="hover:bg-gray-50 transition"
            >

              <td className="px-6 py-5 font-semibold text-gray-800">
                {u.name}
              </td>

              <td className="px-6 py-5 text-gray-500">
                {u.email}
              </td>

              <td className="px-6 py-5">

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${u.roleColor}`}>
                  {u.role}
                </span>

              </td>

              <td className="px-6 py-5">

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${u.statusColor}`}>
                  {u.status}
                </span>

              </td>

              <td className="px-6 py-5 text-gray-700">
                {u.proposals}
              </td>

              <td className="px-6 py-5 text-gray-500">
                {u.created}
              </td>

              <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                  <button className="text-blue-500 hover:text-blue-700">
                    <Pencil size={16} />
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