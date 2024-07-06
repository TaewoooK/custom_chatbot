"use client"

import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo.png"
import { Button } from "@/components/ui/button";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { useState } from "react";
import AddEditNoteDialog from "../components/AddEditNoteDialog";
import { Plus } from "lucide-react";


export default function NavBar() {
    const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);

    return ( 
        <>
        <div className="p-4 shadow">
            <div className="flex flex-wrap gap-3 items-center justify-between">
                <Link href="taebot" className="flex items-center gap-1">
                    <Image src={logo} alt="TaeBot logo" width={40} height={40} />
                    <span className="font-bold">Super Secret Backend</span>
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggleButton />
                    <Button onClick={() => setShowAddEditNoteDialog(true)}>
                        <Plus size={20} className="mr=2" />
                        Add Note    
                    </Button>
                </div>
            </div>
        </div>
            <AddEditNoteDialog open={showAddEditNoteDialog} setOpen={setShowAddEditNoteDialog} />
        </>
    );
}