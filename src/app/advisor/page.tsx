import { requireRole } from "@/lib/auth";
import {
  calculateCommission,
  getCommissionsByAdvisor,
} from "@/lib/commissions";
import { ObjectId } from "mongodb";

export default async function AdvisorPage() {
  const session = await requireRole(["advisor", "admin"]);
  if (!session || !session.user || !session.user.id) {
    return <div />;
  }
  const commissions = await getCommissionsByAdvisor(
    new ObjectId(session.user.id),
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Advisor Dashboard</h1>
      <p className="mb-4">Welcome, {session.user.name}</p>

      <h2 className="text-lg font-semibold mb-2">Your Commissions</h2>
      {(!commissions || commissions.length === 0) && (
        <p>You have no sales yet!</p>
      )}
      {commissions && commissions.length > 0 && (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">Product</th>
              <th className="px-3 py-2 border">Base</th>
              <th className="px-3 py-2 border">After Margin</th>
              <th className="px-3 py-2 border">Advisor Payout</th>
              <th className="px-3 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map(async (c) => {
              const breakdown = await calculateCommission(
                c.productId,
                c.APE,
                c.receipts,
              );
              return (
                breakdown && (
                  <tr key={c._id.toString()}>
                    <td className="px-3 py-2 border">Product name</td>
                    <td className="px-3 py-2 border">
                      {breakdown.base.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 border">
                      {breakdown.afterMargin.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 border">
                      {breakdown.payout.advisor.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 border">{c.status}</td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
