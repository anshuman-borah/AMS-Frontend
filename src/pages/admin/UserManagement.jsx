import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/admin/AdminSidebar";
import UserFilters from "../../components/admin/usermanagement/UserFilters";
import UserTable from "../../components/admin/usermanagement/UserTable";

export default function UserManagement({ onLogout, user }) {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 5;

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/users?page=${currentPage}&limit=${LIMIT}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(res.data.users || []);

        setTotalPages(res.data.pagination?.totalPages || 1);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    };

    fetchUsers();

  }, [currentPage]);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <AdminSidebar
        onLogout={onLogout}
        user={user}
      />

      {/* Main Content */}
      <main className="flex-1 px-8 py-8 overflow-y-auto">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            User Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all users in the system and assign roles.
          </p>

        </div>

        {/* Filters */}
        <UserFilters />

        {/* Table */}
        {loading ? (

          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">

            <div className="px-6 py-4 border-b border-gray-100">
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="divide-y divide-gray-100">

              {[...Array(5)].map((_, i) => (

                <div
                  key={i}
                  className="flex items-center gap-4 px-6 py-4"
                >

                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />

                  <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse" />

                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />

                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />

                  <div className="h-8 w-16 bg-gray-200 rounded-lg animate-pulse" />

                </div>

              ))}

            </div>

          </div>

        ) : (

          <UserTable users={users} />

        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages || loading}
            className="px-4 py-2 border rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>

        </div>

      </main>

    </div>
  );
}