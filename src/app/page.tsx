import { auth, signIn } from "@/auth";

export default async function Home() {
  const session = await auth();
  if (!session || !session.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <button type="submit">Sign in</button>
      </form>
    );
  }
  return <div>Hello world!</div>;
}
