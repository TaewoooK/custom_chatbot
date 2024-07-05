import Image from "next/image";
import logo from "@/app/assets/logo.png"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OpenAIEmbeddings } from "@langchain/openai";
import { dbIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";

export default function Home() {
  return (
    <main className='flex flex-col h-screen items-center justify-center gap-5'>
      <div className='flex items-center gap-4'>
        <Image src={logo} alt='TaeBot logo' width={100} height={100} />
        <span className='font-extrabold tracking-tight text-4xl lg:text-5xl'>TaeBot</span>
      </div>
      <p className="max-w-prose text-center">
        An intelligent chatbot that has information about Tae's background, career, hobbies, etc. Built with AI Integration using OpenAI, Pinecone, Next.js, Shadcn UI, and more.
      </p>
      <Button asChild>
        <Link href="/taebot">Open</Link>
      </Button>
    </main>
  );
}
