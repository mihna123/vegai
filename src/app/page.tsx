import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session || !session.user) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <form
          className="text-center"
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <h2 className="mb-5 text-2xl text-green-600 font-bold">
            Welcome to the VegAI Portal!
          </h2>
          <button
            className="cursor-pointer bg-green-100 hover:bg-green-200 text-green-800 border transition-all hover:scale-105 font-medium py-2 px-4 rounded-md text-sm"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }
  redirect("/advisor");
}
