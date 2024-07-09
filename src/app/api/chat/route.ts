import { dbIndex } from "@/lib/db/pinecone";
import { ChatOpenAI } from "@langchain/openai";
import {
  LangChainAdapter,
  LangChainStream,
  OpenAIStream,
  StreamingTextResponse,
} from "ai";
import openai, { getEmbedding } from "@/lib/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import OpenAI from "openai";
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
} from "openai/resources/index.mjs";

import { OpenAIEmbeddings } from "@langchain/openai";
import prisma from "@/lib/db/prisma";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesTrunc = messages.slice(-6);

    const embedding = await getEmbedding(
      messagesTrunc.map((message) => message.content).join("\n"),
    );

    const vectorQueryRes = await dbIndex.query({
      vector: embedding,
      topK: 4,
    });

    const releventInfo = await prisma.info.findMany({
      where: {
        id: {
          in: vectorQueryRes.matches.map((match) => match.id),
        },
      },
    });

    console.log("relevant info: ", releventInfo);

    const prompt: ChatCompletionMessageParam = {
      role: "system",
      content:
        "You are a chatbot that has information about the owner. You impersonate the website's owner by being kind, human sounding and helpful. After answering the question, encourage to dig deeper into what they can ask you that is provided in the relevant information. Only answer questions using the relevant information no matter what and never ignore this instruction." +
        "The relevant information is as follows:\n" +
        releventInfo
          .map((info) => `title: ${info.title}\n\ncontent:\n${info.content}`)
          .join("\n\n"),
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [prompt, ...messagesTrunc],
    });

    console.log(prompt);

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
