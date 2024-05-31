import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <SignIn />
    </main>
  );
}