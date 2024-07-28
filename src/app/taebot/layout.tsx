import NavBar from "./NavBar";
import { Analytics } from "@vercel/analytics/react";
import SideBar from "./SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="grid flex-grow grid-cols-6">
        <div className="col-start-1 col-end-2 hidden xl:block">
          <SideBar />
        </div>
        <div className="col-span-4 col-start-2">
          <main className="max-w-8xl m-auto p-1">
            {children}
            <Analytics />
          </main>
        </div>
      </div>
    </div>
  );
}
