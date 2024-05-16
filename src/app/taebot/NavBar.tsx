import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo.png"
import { Button } from "@/components/ui/button";
import ThemeToggleButton from "../components/ThemeToggleButton";


export default function NavBar() {

    return ( 
        <div className="p-4 shadow">
            <div className="flex flex-wrap gap-3 items-center justify-between">
                <Link href="taebot" className="flex items-center gap-1">
                    <Image src={logo} alt="TaeBot logo" width={40} height={40} />
                    <span className="font-bold">TaeBot</span>
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggleButton />
                    <Button asChild>
                        <Link href="/taebot">Report</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}