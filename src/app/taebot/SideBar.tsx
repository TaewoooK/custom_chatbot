"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";

export default function SideBar() {
  const [cards, setCards] = useState([
    {
      id: 0,
      title: "Ask about me",
      description: "Who are you?",
      color: "",
    },
    {
      id: 1,
      title: "Ask about my work experience",
      description: "Tell me about your work experience.",
      color: "",
    },
    {
      id: 2,
      title: "Ask about my leadership experience",
      description: "Tell me about your leadership experience.",
      color: "",
    },
    {
      id: 3,
      title: "Ask about my projects",
      description: "Tell me about your projects",
      color: "",
    },
    {
      id: 4,
      title: "Continue diving deeper",
      description: "Ask about details",
      color: "",
    },
  ]);

  const makeGreen = (id: number) => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.id === id) {
          if (card.color === "green") {
            return { ...card, color: "" };
          } else {
            return { ...card, color: "green" };
          }
        }
        return card;
      });
    });
  };

  return (
    <>
      {/* Left Sidebar for Cards */}
      <div className="m-auto max-w-7xl p-1 pl-6">
        <div className="flex flex-col gap-4 pt-1">
          <h2 className="scroll-m-20 border-b p-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Objectives
          </h2>
          {/* Example Cards */}
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center rounded-lg border bg-background p-4 shadow-md"
            >
              <div className="flex-1">
                <h2 className="text-lg font-bold">{card.title}</h2>
                <p className="text-sm">{card.description}</p>
              </div>
              <Button
                className={`${card.color === "green" ? "bg-green-600" : ""} ml-4 rounded-3xl text-2xl transition-all duration-200 ease-linear hover:rounded-xl hover:bg-green-300`}
                onClick={() => makeGreen(card.id)}
              >
                <CiCircleCheck />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
