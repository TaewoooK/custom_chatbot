import { dbIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getEmbedding } from "@/lib/openai";
import { createNoteSchema, deleteNodeSchema, updateNoteSchema } from "@/lib/validation/info";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parseResult = createNoteSchema.safeParse(body);

        if (!parseResult.success) {
            console.error(parseResult.error);
            return Response.json({ error: "Invalid Input" }, { status: 400 });
        }

        const { title, content } = parseResult.data;

        const embedding = await getEmbeddingForNote(title, content);

        const note = await prisma.$transaction(async (tx) => {
            const note = await tx.info.create({
                data: {
                    title,
                    content,
                }
            });

            await dbIndex.upsert([
                {
                    id: note.id,
                    values: embedding,
                }
            ])

            return note;
        })

        return Response.json(note, { status: 201 });
        
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();

        const parseResult = updateNoteSchema.safeParse(body);

        if (!parseResult.success) {
            console.error(parseResult.error);
            return Response.json({ error: "Invalid Input" }, { status: 400 });
        }

        const { id, title, content } = parseResult.data;

        const note = await prisma.info.findUnique({
            where: {
                id,
            }
        });

        if (!note) {
            return Response.json({ error: "Note not found" }, { status: 404 });
        }

        const embedding = await getEmbeddingForNote(title, content);

        const updatedNote = await prisma.$transaction(async (tx) => { 
            const updatedNote = await prisma.info.update({
                where: {
                    id,
                },
                data: {
                    title,
                    content,
                }
            });

            await dbIndex.upsert([
                {
                    id,
                    values: embedding,
                }
            ]);

            return updatedNote;
        });

      

        return Response.json(updatedNote, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}


export async function DELETE(req: Request) {
    try {
        const body = await req.json();

        const parseResult = deleteNodeSchema.safeParse(body);

        if (!parseResult.success) {
            console.error(parseResult.error);
            return Response.json({ error: "Invalid Input" }, { status: 400 });
        }

        const { id } = parseResult.data;

        const note = await prisma.info.findUnique({
            where: {
                id,
            }
        });

        if (!note) {
            return Response.json({ error: "Note not found" }, { status: 404 });
        }

        await prisma.$transaction(async (tx) => {   
            await prisma.info.delete({
                where: {
                    id,
                }
            });

            await dbIndex.deleteOne(id);
        });

      

        return Response.json({ message: "Note deleted" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

async function getEmbeddingForNote(title: string, content: string | undefined) {
    return getEmbedding(title + "\n\n" + content ?? "");
}