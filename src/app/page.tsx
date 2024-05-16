import Image from "next/image";
import logo from "@/app/assets/logo.png"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OpenAIEmbeddings } from "@langchain/openai";
import { dbIndex } from "@/lib/db/pinecone";

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
/*
async function generateEmbedding() {
  
    const embeddings = new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY,
        model: "text-embedding-ada-002",
    });

    const vectors = await embeddings.embedDocuments([
        "646-581-8829 | kim3434@purdue.edu | linkedin.com/in/taewookim8829 | github.com/TaewoooK",
        "Education: Purdue University West Lafayette",
        "IN: B. Sci. Computer Science, Minor: Management, Certificate: Entrepreneurship Aug. 2020 – May 2024",
        "Current GPA: 3.51, Dean’s List",
        "Coursework: OOP, Programming in C, Computer Architecture, Data Structures, Analysis of Algorithms, Systems Programming, OS, Database and Information Systems",
    ]);

    console.log(vectors[0].length);

    await dbIndex.upsert([
        {
          id: "myinformation",
          values: vectors[0],
        }
    ])
    
}

generateEmbedding();
*/
