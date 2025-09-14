import { requireRole } from "@/lib/auth";

export default async function ClientPage() {
  const session = await requireRole(["client", "admin"]);
  if (!session || !session.user) {
    return <div />;
  }

  // Fake case data for demo
  const cases = [
    { id: 1, status: "Pending Approval", lastUpdate: "2025-09-10" },
    { id: 2, status: "Approved", lastUpdate: "2025-09-05" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Client Portal</h1>
      <p className="mb-4">Welcome, {session.user.email}</p>

      <h2 className="text-lg font-semibold mb-2">Your Cases</h2>
      <ul className="space-y-2">
        {cases.map((c) => (
          <li key={c.id} className="p-3 border rounded">
            <p>Case #{c.id}</p>
            <p>Status: {c.status}</p>
            <p>Last Update: {c.lastUpdate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
