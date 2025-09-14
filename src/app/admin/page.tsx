import { requireRole } from "@/lib/auth";
import { approveCommission, getAllCommissions } from "@/lib/commissions";
import { getProductById } from "@/lib/products";
import { getUserById } from "@/lib/users";

export default async function AdminPage() {
  const session = await requireRole(["admin", "advisor"]);
  if (!session || !session.user) {
    return <div />;
  }
  const commissions = await getAllCommissions();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <p className="mb-4">Welcome, {session.user.email}</p>

      <h2 className="text-lg font-semibold mb-2">All Commissions</h2>
      {!commissions ||
        (commissions.length === 0 && <p>No commissions to show</p>)}
      {commissions && commissions.length > 0 && (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">Advisor</th>
              <th className="px-3 py-2 border">Product</th>
              <th className="px-3 py-2 border">APE</th>
              <th className="px-3 py-2 border">Receipts</th>
              <th className="px-3 py-2 border">Status</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map(async (c) => {
              const advisor = await getUserById(c.advisorId);
              const product = await getProductById(c.productId);
              return (
                <tr key={c._id.toString()}>
                  <td className="px-3 py-2 border">
                    {advisor?.email ?? "Unknown advisor"}
                  </td>
                  <td className="px-3 py-2 border">
                    {product?.name ?? "Unknown product"}
                  </td>
                  <td className="px-3 py-2 border">{c.APE}</td>
                  <td className="px-3 py-2 border">{c.receipts}</td>
                  <td className="px-3 py-2 border">{c.status}</td>
                  <td className="px-3 py-2 border">
                    {c.status === "pending" && (
                      <form
                        action={async () => {
                          "use server";
                          await approveCommission(c._id);
                        }}
                      >
                        <button
                          type="submit"
                          className="px-2 py-1 bg-green-600 text-white rounded"
                        >
                          Approve
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
