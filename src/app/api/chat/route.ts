import { dbIndex } from "@/lib/db/pinecone";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getEmbedding } from "@/lib/openai";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages = body.messages;

        const openai = new OpenAI();

        const systemMessage: ChatCompletionMessageParam = {
            role: "system",
            content: "You are a fun bot. You answer all questions in a fun way."
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            stream: true,
            messages: [systemMessage, ...messages]
        });
        
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" } , { status: 500 });
    }

}

async function getEmbeddingFromData(question: string, content: string | undefined) {
    return getEmbedding(question + "\n\n" + content ?? "");
}