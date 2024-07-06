import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import Note from "../components/Note";

export const metadata: Metadata = {
    title: "TaeBot",
    description: "AI bot of Tae's background, career, hobbies, etc",
};
    
export default async function NotesPage() {    

    const allNotes = await prisma.info.findMany();

    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allNotes.map((note) => (
               <Note note={note} key={note.id}></Note>
            ))}
            {allNotes.length === 0 && (
                <div className="col-span-full text-center">{"No notes found"}</div>
            )}
        </div>
    );
}