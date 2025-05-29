"use client";
import { useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";
import { CardPattern } from "./CardPattern";

interface Snippet {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  lastUpdated: string;
  language: string;
  githubUrl?: string;
  demoUrl?: string;
}

interface CardProps {
  snippet: Snippet;
}

export const Card = ({ snippet }: CardProps) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: { currentTarget: HTMLDivElement; clientX: number; clientY: number }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div className="p-0.5 bg-transparent w-full h-full relative">
      <div
        onMouseMove={onMouseMove}
        className="group rounded-3xl w-full relative overflow-hidden bg-transparent h-full p-6 flex flex-col"
      >
        <CardPattern
          mouseX={mouseX.get()}
          mouseY={mouseY.get()}
          randomString={randomString}
        />
        <div className="relative z-10 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">{snippet.title}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{snippet.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {snippet.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-black/30 text-xs rounded-full text-gray-300">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-auto pt-4 flex justify-between items-center text-sm text-gray-400">
            <span>{snippet.language}</span>
            <span>Updated: {snippet.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

  const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomString = (length: number) => {
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};