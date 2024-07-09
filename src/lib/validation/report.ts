import { z } from "zod";

export const createReportSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export type CreateReportSchema = z.infer<typeof createReportSchema>;
