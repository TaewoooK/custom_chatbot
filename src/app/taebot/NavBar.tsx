"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo.png";
import { Button } from "@/components/ui/button";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { useState } from "react";
import { Plus } from "lucide-react";
import ReportDialog from "../components/ReportDialog";

export default function NavBar() {
  const [showReportDialog, setShowReportDialog] = useState(false);

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
          </div>
        </div>
      </div>
      <ReportDialog open={showReportDialog} setOpen={setShowReportDialog} />
    </>
  );
}
