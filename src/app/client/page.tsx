import { requireRole } from "@/lib/auth";
import ClientPage from "./components/ClientPage";

export default async function Page() {
  const session = await requireRole(["client", "admin"]);
  // TODO: come monday, make this more server based and db based. Also do a little of role based stuff and thats that
  if (!session || !session.user) {
    return <div />;
  }

  return <ClientPage userId={session.user.id?.toString() ?? ""} />;
}
