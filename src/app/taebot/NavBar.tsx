"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo.png";
import { Button } from "@/components/ui/button";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { useState } from "react";
import { Plus } from "lucide-react";
import ReportDialog from "../components/ReportDialog";
import { Toaster } from "@/components/ui/sonner";

export default function NavBar() {
  const [showReportDialog, setShowReportDialog] = useState(false);

  function openNewTab(url: string) {
    window.open(url, "_blank");
  }

  return (
    <>
      <div className="p-4 shadow">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-1">
            <Image src={logo} alt="TaeBot logo" width={40} height={40} />
            <span className="font-bold">TaeBot</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <Button onClick={() => setShowReportDialog(true)}>Report</Button>
            <Button
              onClick={() =>
                openNewTab(
                  "https://drive.google.com/file/d/1fX3DpoQt-TyVnpLstdx3-SMca8T-u1lg/view?usp=sharing",
                )
              }
            >
              Reference Tae&apos;s Resume
            </Button>
          </div>
        </div>
      </div>
      <ReportDialog open={showReportDialog} setOpen={setShowReportDialog} />
    </>
  );
}
