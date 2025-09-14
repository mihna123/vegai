import { auth, signIn } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  if (!session || !session.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Sign in</button>
      </form>
    );
  }
  return (
    <div>
      Hello {session.user.name}!
      <Image
        src={session.user.image ?? ""}
        className="rounded-full"
        width={50}
        height={50}
        alt="User image"
      />
    </div>
  );
}
