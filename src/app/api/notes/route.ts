import prisma from "@/lib/db/prisma";
import { createNoteSchema } from "@/lib/validation/info";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parseResult = createNoteSchema.safeParse(body);

        if (!parseResult.success) {
            console.error(parseResult.error);
            return Response.json({ error: "Invalid Input" }, { status: 400 });
        }

        const { title, content } = parseResult.data;

        const note = await prisma.info.create({
            data: {
                title,
                content,
            }
        });

        return Response.json(note, { status: 201 });
        
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}