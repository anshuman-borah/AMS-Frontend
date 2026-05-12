import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/admin/AdminSidebar";
import SelectedProposalCard from "../../components/admin/review/SelectedProposalCard";
import ReviewerTable from "../../components/admin/review/ReviewerTable";
import LoadingScreen from "../../components/common/Loadingscreen";

export default function ReviewerAssignment({ onLogout, user }) {

  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchReviewers = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/reviewers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);

        setReviewers(res.data.reviewers || []);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    };

    fetchReviewers();

  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <AdminSidebar
        onLogout={onLogout}
        user={user}
      />

      {/* Main Content */}
      <main className="flex-1 px-8 py-8 overflow-y-auto">

        {loading ? (

          <div className="h-full flex items-center justify-center">
            <LoadingScreen />
          </div>

        ) : (

          <>
            {/* Header */}
            <div className="mb-8">

              <h1 className="text-3xl font-bold text-gray-800">
                Reviewer Assignment
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Assign reviewers to research proposals
              </p>

            </div>

            {/* Content */}
            <div className="grid lg:grid-cols-3 gap-6">

              <SelectedProposalCard />

              <ReviewerTable reviewers={reviewers} />

            </div>
          </>

        )}

      </main>

    </div>
  );
}