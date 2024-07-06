import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/info";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/ui/loading-button";
import { useRouter } from "next/navigation";
import { Info } from "@prisma/client";
import { useState } from "react";

interface AddEditNoteDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    noteToEdit?: Info
}

export default function AddEditNoteDialog({ open, setOpen, noteToEdit }: AddEditNoteDialogProps) {
    const [deleteInProgress, setDeleteInProgress] = useState(false);
    const router = useRouter();
    
    const form = useForm<CreateNoteSchema>({
        resolver: zodResolver(createNoteSchema),
        defaultValues: {
            title: noteToEdit?.title || "",
            content: noteToEdit?.content || "",
        }
    })

    async function onSubmit(input: CreateNoteSchema) {
        try {

            if (noteToEdit) {
                const response = await fetch("/api/notes", {
                    method: "PUT",
                    body: JSON.stringify({ id: noteToEdit.id, ...input}),
                })
                if (!response.ok) {
                    throw new Error("Failed to add the note" + response.status);
                }
            } else {
                const response = await fetch("/api/notes", {
                    method: "POST",
                    body: JSON.stringify(input),
                });

                if (!response.ok) {
                    throw new Error("Failed to add the note" + response.status);
                }
                form.reset();
            }
            router.refresh();
            setOpen(false);
        } catch (error) {
            console.error(error);
            alert("An error occurred while adding the note");
        }
    }

    async function deleteNote() {
        if (!noteToEdit) return;
        setDeleteInProgress(true);
        try {
            const response = await fetch("/api/notes", {
                method: "DELETE",
                body: JSON.stringify({ id: noteToEdit.id }),
            })
            if (!response.ok) {
                throw new Error("Failed to add the note" + response.status);
            }
            router.refresh();
            setOpen(false);
        } catch (error) {
            console.error(error);
            alert("An error occurred while deleting the note");
        } finally {
            setDeleteInProgress(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{noteToEdit ? "Edit Note" : "Add Note"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Note title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Note title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Note content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Note content" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="gap-1 sm:gap-0">
                            {noteToEdit && (
                                <LoadingButton
                                    variant="destructive"
                                    loading={deleteInProgress}
                                    disabled={form.formState.isSubmitting}
                                    onClick={deleteNote}
                                    type="button"
                                >
                                    Delete note
                                </LoadingButton>
                            )}
                            <LoadingButton type="submit" loading={form.formState.isSubmitting} disabled={form.formState.isSubmitting}>
                                Submit
                            </LoadingButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}