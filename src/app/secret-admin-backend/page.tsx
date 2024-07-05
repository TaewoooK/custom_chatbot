import prisma from "@/lib/db/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "TaeBot",
    description: "AI bot of Tae's background, career, hobbies, etc",
};
    
export default async function NotesPage() {    

    const allNotes = await prisma.info.findMany();

    return (
        <div>
           {JSON.stringify(allNotes)}
        </div>
    );
}