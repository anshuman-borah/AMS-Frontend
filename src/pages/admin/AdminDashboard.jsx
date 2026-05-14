import { useEffect, useState } from "react";
import axios from "axios";

import {
  FolderOpen,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck,
  Users,
  FlaskConical,
  TrendingUp,
  FileText,
  Activity,
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
        console.error("Failed to fetch admin dashboard:", err);
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
      label: "Submitted",
      value: dashboardData?.statistics?.projects?.submitted || 0,
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
    <div className="flex h-screen bg-gray-50">

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">

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

            {/* Platform Overview Banner */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Platform Overview
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Total Users */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="p-3 bg-violet-100 rounded-xl">
                    <Users className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData?.statistics?.users?.total || 0}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">Total Users</p>
                  </div>
                </div>

                {/* Scientists */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <FlaskConical className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData?.statistics?.users?.scientists || 0}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">Scientists</p>
                  </div>
                </div>

                {/* Admins */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <UserCheck className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData?.statistics?.users?.admins || 0}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">Admins</p>
                  </div>
                </div>

                {/* Review Stats */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardData?.statistics?.reviews?.total || 0}
                      </p>
                      <span className="text-sm font-semibold text-emerald-600">
                        {dashboardData?.statistics?.reviews?.approvalRate || 0}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                      Reviews <span className="text-emerald-600">• Approval Rate</span>
                    </p>
                  </div>
                </div>
              </div>
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