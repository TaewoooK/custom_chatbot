"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info as NoteModel } from "@prisma/client"
import { useState } from "react";
import AddEditNoteDialog from "./AddEditNoteDialog";

interface NoteProps {
    note: NoteModel;
}

export default function Note({ note }: NoteProps) { 
    const [showEditDialog, setShowEditDialog] = useState(false);

    const wasUpdated = note.updatedAt > note.createdAt;

    const createdUpdatedAtTimestamp = (
        wasUpdated ? note.updatedAt : note.createdAt
    ).toDateString();

    return (
        <>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowEditDialog(true)}>
                <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                    <CardDescription>
                        {createdUpdatedAtTimestamp}
                        {wasUpdated && " (updated)"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-line">{note.content}</p>
                </CardContent>
            </Card>
            <AddEditNoteDialog open={showEditDialog} setOpen={setShowEditDialog} noteToEdit={note} />
        </>
    )

}
