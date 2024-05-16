import { dbIndex } from "@/lib/db/pinecone";
import { ChatOpenAI } from "@langchain/openai";
import { LangChainAdapter, LangChainStream, OpenAIStream, StreamingTextResponse } from "ai";
import { getEmbedding } from "@/lib/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import OpenAI from "openai";
import { ChatCompletionMessage, ChatCompletionMessageParam } from "openai/resources/index.mjs";

import { OpenAIEmbeddings } from "@langchain/openai";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages: ChatCompletionMessage[] = body.messages;

        const messagesTrunc = messages.slice(-6);

        const embedding = await getEmbedding(messagesTrunc.map((message) => message.content).join("\n"));

        const vectorQueryRes = await dbIndex.query({
            vector: embedding,
            topK: 4,
        });

        const currentMessageContent = messages[messages.length - 1].content;
        const {stream, handlers} = LangChainStream();

        const chatModel = new ChatOpenAI({
            modelName: "gpt-3.5-turbo",
            streaming: true,
            callbacks: [handlers],
        });

        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                "You are a chatbot for a personal portfolio website. You impersonate the website's owner. " +
                "You should be able to answer questions about the owner's background, career, hobbies, etc. " +
                "You should also be able to provide contact information and links to the owner's social media profiles. " +
                "You should be able to provide information about the owner's projects and skills. " +
                "You should be able to provide information about the owner's education and work experience. " +
                "You should be able to provide information about the owner's interests and hobbies. " +
                "You should be able to provide information about the owner's goals and aspirations. " +
                "You should be able to provide information about the owner's personality and character. " +
                "Format your messages in markdown format.\n\n" + 
                "Context:\n{context}"
            ],
            [
                "user",
                "{input}"
            ],
        ]);

        const chain = prompt.pipe(chatModel);

        chain.invoke({
            input: currentMessageContent,
        });

        return new StreamingTextResponse(stream);

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" } , { status: 500 });
    }

}

