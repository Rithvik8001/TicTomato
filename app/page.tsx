import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <nav className="min-h-[10vh] flex justify-between items-center p-4 border-b">
        <span className="text-3xl font-extrabold">TicTomato</span>
        <Link href={"/sign-up"}>
          <Button variant="outline">Get Started</Button>
        </Link>
      </nav>
      <header className="min-h-[90vh] flex w-full justify-center items-center flex-col gap-4">
        <h1 className="text-7xl font-bold">TicTomato</h1>
        <h3 className="text-lg">
          Time flies when you're having productive fun
        </h3>
        <Link href={"/sign-up"}>
          <Button className="font-bold">Get Started</Button>
          <Button></Button>
        </Link>
      </header>
      <main>
        <section>
          <div>
            <h2>Features</h2>
            <ul>
              <li>Task Management</li>
              <li>Time Tracking</li>
              <li>Focus Mode</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
