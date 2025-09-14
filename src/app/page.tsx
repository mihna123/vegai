import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";

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
          <h2 className="mb-5 text-xl">Welcome to the VegAI challenge!</h2>
          <button
            className="rounded-lg p-2 cursor-pointer hover:bg-gray-200 hover:scale-105 transition-all border"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="flex w-full justify-center mt-20">
      <form
        className="text-center"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <h2 className="text-xl mb-2">Hello {session.user.name}!</h2>
        {session.user.image && (
          <Image
            src={session.user.image}
            className="rounded-full"
            width={50}
            height={50}
            alt="User image"
          />
        )}
        <button
          className="rounded-lg p-2 cursor-pointer hover:bg-gray-200 hover:scale-105 transition-all border"
          type="submit"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
