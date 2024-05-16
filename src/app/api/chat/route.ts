import { dbIndex } from "@/lib/db/pinecone";
import { ChatOpenAI } from "@langchain/openai";
import { LangChainAdapter, LangChainStream, OpenAIStream, StreamingTextResponse } from "ai";
import openai, { getEmbedding } from "@/lib/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import OpenAI from "openai";
import { ChatCompletionMessage, ChatCompletionMessageParam } from "openai/resources/index.mjs";

import { OpenAIEmbeddings } from "@langchain/openai";
import prisma from "@/lib/db/prisma";

export async function POSTMONGO() { 
    try {

        const info = await prisma.info.create({
            data: {
                title: "Phone Number",
                content: "646-581-8829",
            }
        });

        return Response.json(info, { status: 200 })

    } catch(error) {
        console.error(error);
            return Response.json({ error: "Internal server error" } , { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages: ChatCompletionMessage[] = body.messages;

        const messagesTrunc = messages.slice(-6);

        const embedding = await getEmbedding(messagesTrunc.map((message) => message.content).join("\n"));

        const vectorQueryRes = await dbIndex.query({
            vector: embedding,
            topK: 1,
        });

        const releventInfo = await prisma.info.findMany({
            where: {
                id: {
                    in: vectorQueryRes.matches.map((match) => match.id),
                }
            }
        })

        const prompt: ChatCompletionMessageParam = {
            role: 'system',
            content: "You are a chatbot for a personal portfolio website. You impersonate the website's owner. " +
            "You should be able to answer questions about the owner's background, career, hobbies, etc. " +
            "You should also be able to provide contact information and links to the owner's social media profiles. " +
            "You should be able to provide information about the owner's projects and skills. " +
            "You should be able to provide information about the owner's education and work experience. " +
            "You should be able to provide information about the owner's interests and hobbies. " +
            "You should be able to provide information about the owner's goals and aspirations. " +
            "You should be able to provide information about the owner's personality and character. " +
            "Format your messages in markdown format.\n\n" + 
            "The relevant information is as follows:\n" +
            releventInfo.map((info) => 'question: ${info.question}\n\nanswer:\n${info.answer}').join("\n\n")
        }

        
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            stream: true,
            messages: [prompt, ...messagesTrunc],
        });

        console.log(prompt)


        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" } , { status: 500 });
    }

}

