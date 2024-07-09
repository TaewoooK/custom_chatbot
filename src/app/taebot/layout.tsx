import NavBar from "./NavBar";
import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <NavBar />
        <main className="m-auto max-w-7xl p-4">
          {children}
          <Analytics />
        </main>
      </div>
    </div>
  );
}
