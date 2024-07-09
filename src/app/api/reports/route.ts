import prisma from "@/lib/db/prisma";
import { createReportSchema } from "@/lib/validation/report";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = createReportSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid Input" }, { status: 400 });
    }

    const { title, content } = parseResult.data;

    const report = await prisma.report.create({
      data: {
        title,
        content,
      },
    });
      
    return Response.json(report, { status: 201 });  
      
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
