import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateReportSchema,
  createReportSchema,
} from "@/lib/validation/report";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface ReportDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ReportDialog({ open, setOpen }: ReportDialogProps) {
  const router = useRouter();

  const form = useForm<CreateReportSchema>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(input: CreateReportSchema) {
    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to send the report" + response.status);
      }

      form.reset();
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred while sending the report");
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Report</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report title</FormLabel>
                  <FormControl>
                    <Input placeholder="Report title" {...field} />
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
                  <FormLabel>Report content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Report content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-1 sm:gap-0">
              <LoadingButton
                type="submit"
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
              >
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
