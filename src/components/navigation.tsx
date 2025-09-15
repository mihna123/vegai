import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Navigation() {
  const session = await auth();
  if (!session || !session.user) return <div />;
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-green-600">VegAI Portal</h1>
          <nav className="ml-8 flex space-x-8">
            <Link
              href="/advisor"
              className="text-gray-500 hover:text-green-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/client"
              className="text-gray-500 hover:text-green-600 font-medium"
            >
              Clients
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-green-600 font-medium"
            >
              Commissions
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-green-600 font-medium"
            >
              Performance
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-green-600 font-medium"
            >
              Documents
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <div className="ml-4 relative">
            <div className="flex items-center focus:outline-none gap-2">
              {session.user.image && (
                <Image
                  className="h-8 w-8 rounded-full"
                  src={session.user.image}
                  alt="User profile"
                  width={50}
                  height={50}
                />
              )}
              <span className="ml-2 text-gray-700 font-medium">
                {session.user.name}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="cursor-pointer bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-md text-xs">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
