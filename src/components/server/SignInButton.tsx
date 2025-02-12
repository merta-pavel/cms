import { signIn, auth } from "@/libs/auth";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}
const SignInButton = async () => {
  const session = await auth();
  if (!session) {
    return (
      <form action={async () => {
        "use server";
        const user : User = await signIn("github");
        console.log(user);
      }}>
        <button type="submit">Signin with GitHub</button>
      </form>
    );
  }

  return <p>Přihlášen jako: {session.user!.email}</p>;
};

export default SignInButton;