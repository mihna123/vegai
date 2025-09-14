import { requireRole } from "@/lib/auth";
import { getCommissionsByAdvisor } from "@/lib/commissions";
import { getNotificationsForUser } from "@/lib/notifications";
import { ObjectId } from "mongodb";
import StatsGrid from "./components/StatsGrid";
import { PerformanceMetric } from "@/types";
import CommissionSummary from "./components/CommissionSummary";
import Notifications from "./components/Notifications";
import QuickActions from "./components/QuickActions";

export default async function AdvisorPage() {
  const session = await requireRole(["advisor", "admin"]);
  if (!session || !session.user || !session.user.id) {
    return <div />;
  }
  const commissions = await getCommissionsByAdvisor(
    new ObjectId(session.user.id),
  );
  const notifications = await getNotificationsForUser(
    new ObjectId(session.user.id),
  );

  const commissionData = commissions?.map((c) => ({
    period: c._id.getTimestamp().toUTCString().slice(4, 16),
    amount: c.payout,
    status: c.status,
  }));

  const performanceMetrics: Omit<PerformanceMetric, "_id">[] = [
    { name: "New Clients", value: 12, target: 10, trend: "up" },
    { name: "Policies Sold", value: 18, target: 15, trend: "up" },
    { name: "Client Satisfaction", value: 94, target: 90, trend: "stable" },
    { name: "Revenue", value: 84500, target: 80000, trend: "up" },
  ];

  return (
    <div className="p-6">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {session.user.name}
          </h2>
          <p className="text-gray-600">
            Here&apos;s your performance overview for today
          </p>
        </div>

        <StatsGrid metrics={performanceMetrics} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CommissionSummary data={commissionData} />
          <div className="space-y-8">
            <Notifications notifications={notifications} />
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
}
