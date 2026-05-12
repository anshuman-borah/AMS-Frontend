import { useEffect, useState } from "react";
import axios from "axios";

import {
  FolderOpen,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck,
} from "lucide-react";

import StatCard from "../../components/common/StatCard";
import LoadingScreen from "../../components/common/Loadingscreen";

import AdminSidebar from "../../components/admin/AdminSidebar";
import DashboardHeader from "../../components/admin/DashboardHeader";
import DashboardCharts from "../../components/admin/DashboardCharts";
import RecentProjects from "../../components/admin/RecentProjects";
import RecentReviews from "../../components/admin/RecentReviews";
import ReviewerWorkload from "../../components/admin/ReviewerWorkload";

export default function AdminDashboard({ onLogout, user }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // API Calling
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/dashboard/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDashboardData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const STATS = [
    {
      label: "Projects",
      value: dashboardData?.statistics?.projects?.total || 0,
      icon: FolderOpen,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Draft",
      value: dashboardData?.statistics?.projects?.draft || 0,
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "Pending",
      value: dashboardData?.statistics?.projects?.pending || 0,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      label: "Approved",
      value: dashboardData?.statistics?.projects?.approved || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Rejected",
      value: dashboardData?.statistics?.projects?.rejected || 0,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      label: "Reviewers",
      value: dashboardData?.statistics?.users?.reviewers || 0,
      icon: UserCheck,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <AdminSidebar
        onLogout={onLogout}
        user={user}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-8 py-8">

        {loading ? (

          <div className="h-full flex items-center justify-center">
            <LoadingScreen />
          </div>

        ) : !dashboardData ? (

          <div className="p-10 text-red-500 font-semibold">
            Failed to load dashboard data
          </div>

        ) : (

          <>
            {/* Header */}
            <DashboardHeader />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">

              {STATS.map((s) => (
                <StatCard
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  icon={s.icon}
                  color={s.color}
                  bg={s.bg}
                />
              ))}

            </div>

            {/* Charts */}
            <DashboardCharts
              charts={dashboardData?.charts}
            />

            {/* Projects + Reviews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

              <RecentProjects
                projects={dashboardData?.recentProjects || []}
              />

              <RecentReviews
                reviews={dashboardData?.recentReviews || []}
              />

            </div>

            {/* Reviewer Workload */}
            <ReviewerWorkload
              reviewers={dashboardData?.reviewerWorkload || []}
            />
          </>

        )}

      </main>
    </div>
  );
}