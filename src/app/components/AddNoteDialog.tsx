import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/info";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";


interface AddNoteDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function AddNoteDialog({ open, setOpen }: AddNoteDialogProps) {
    
    const form = useForm<CreateNoteSchema>({
        resolver: zodResolver(createNoteSchema),
    })

    async function onSubmit(input: CreateNoteSchema) {
        alert(input);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}