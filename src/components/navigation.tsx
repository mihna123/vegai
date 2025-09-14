import { auth } from "@/auth";
import { UserRole } from "@/types";
import Link from "next/link";

interface PageType {
  name: string;
  url: string;
  roles: UserRole[];
}

const allRoles: UserRole[] = [
  "client",
  "advisor",
  "manager",
  "esmanager",
  "introducer",
  "admin",
];

const pages: PageType[] = [
  {
    name: "Home",
    roles: allRoles,
    url: "/",
  },
  {
    name: "Advisor portal",
    roles: ["advisor", "admin"],
    url: "/advisor",
  },
  {
    name: "Client portal",
    roles: ["client", "admin"],
    url: "/client",
  },
  {
    name: "Admin",
    roles: ["admin"],
    url: "/admin",
  },
];
export default async function Navigation() {
  const session = await auth();
  if (!session || !session.user) return <div />;
  return (
    <nav className="flex gap-4 p-4 bg-gray-200">
      {pages.map(
        (p) =>
          p.roles.includes((session?.user?.role ?? "") as UserRole) && (
            <Link key={p.url} href={p.url}>
              {p.name}
            </Link>
          ),
      )}
    </nav>
  );
}
