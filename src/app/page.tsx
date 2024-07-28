import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OpenAIEmbeddings } from "@langchain/openai";
import { dbIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <main className="flex flex-grow flex-col items-center justify-center gap-5">
        <div className="flex items-center gap-4">
          <Image src={logo} alt="TaeBot logo" width={100} height={100} />
          <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            TaeBot
          </span>
        </div>
        <p className="max-w-prose text-center">
          An intelligent chatbot that has information about Tae&apos;s
          background, career, hobbies, etc. Built with AI Integration using
          OpenAI, Pinecone, Next.js, Shadcn UI, and more.
        </p>
        <div className="flex space-x-4 p-4 ">
          <Button
            asChild
            className="rounded-3xl transition-all duration-300 ease-linear hover:h-16 hover:w-40 hover:rounded-xl hover:text-2xl"
          >
            <Link href="/taebot">Open</Link>
          </Button>
        </div>
      </main>
      <footer className="m-4 rounded-lg bg-white shadow dark:bg-gray-800">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2024{" "}
            <a
              href="https://www.linkedin.com/in/taewookim8829/"
              className="hover:underline"
              target="_blank"
            >
              Tae Woo Kim
            </a>
            . All Rights Reserved.
          </span>
          <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="/taebot" className="me-4 hover:underline md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="/taebot" className="me-4 hover:underline md:me-6">
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://buymeacoffee.com/eddiekim11f"
                className="me-4 hover:underline md:me-6"
                target="_blank"
              >
                Developer Help
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
