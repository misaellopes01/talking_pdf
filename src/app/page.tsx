import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {

  const {userId} = await auth()
  const isAuthenticated = !!userId

  return (
    <main className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-3xl font-semibold text-slate-900">Converse com qualquer PDF</h1>
            <UserButton afterSignOutUrl="/"  />
          </div>
          <div className="flex mt-2">
            {isAuthenticated && <Button>Ir para Conversas</Button>}
          </div>

          <p className="max-w-xl mt-2 text-lg text-slate-800">Junta-te aos vários estudantes e profissionais que utilizam a nossa plataforma para conversar com seus PDFs e assim multiplicar a sua produtividade</p>

          <div className="w-full mt-4 flex items-center justify-center">
            {isAuthenticated ? <h1>fileupload</h1> : <Link href={'/sign-in'}>
            <Button className="flex flex-row gap-2">Que tal começar a usar? <LogIn size={18} /></Button>
            </Link>}
          </div>
        </div>
      </section>
    </main>
  );
}
