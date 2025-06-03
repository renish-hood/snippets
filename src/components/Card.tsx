"use client";

import { useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";
import { CardPattern } from "./CardPattern";
import { useRouter } from "next/navigation";
import { CardProps } from "@/types/snippet.types";
import { withLogger } from "@/utils/withLogger";

const Card = ({ snippet }: CardProps) => {
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const componentName = 'CardComponent';

  useEffect(() => {
    const str = generateRandomString(1500);
    setRandomString(str);
    console.log(`🎯 [${componentName}] Random string generated on mount`);
  }, []);

  // Log state changes
  useEffect(() => {
    console.log(`🎯 [${componentName}] Hover state changed:`, isHovered);
  }, [isHovered]);

  useEffect(() => {
    console.log(`🎯 [${componentName}] Random string updated:`, randomString.length, 'characters');
  }, [randomString]);

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: {
    currentTarget: HTMLDivElement;
    clientX: number;
    clientY: number;
  }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    const str = generateRandomString(1500);
    setRandomString(str);
    
    console.log(`🖱️ [${componentName}] Mouse moved:`, { x: mouseX, y: mouseY });
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`🔗  Card clicked, navigating to:`, `/snippets/${snippet.id}`);
    router.push(`/snippets/${snippet.id}`, { scroll: false });
  };

  return (
    <div 
      className="p-0.5 bg-transparent w-full h-full relative cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View details for ${snippet.title}`}
    >
      <div
        onMouseMove={onMouseMove}
        className={`group rounded-3xl w-full relative overflow-hidden bg-transparent h-full p-6 flex flex-col transition-all duration-300 ${
          isHovered ? 'ring-2 ring-blue-500 scale-[1.02]' : 'ring-1 ring-gray-700'
        }`}
      >
        <CardPattern
          mouseX={mouseX.get()}
          mouseY={mouseY.get()}
          randomString={randomString}
        />
        
        <div className="relative z-10 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {snippet.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {snippet.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {snippet.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-black/30 text-xs rounded-full text-gray-300 group-hover:bg-blue-900/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-auto pt-4 pb-4 flex justify-between items-center text-sm text-gray-400">
            <span className="px-2 py-1 bg-gray-800 rounded-md text-xs">
              {snippet.language}
            </span>
            <span className="text-xs">Updated: {snippet.lastUpdated}</span>
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4`}>
          <span className="text-sm text-white font-medium">
            Read more →
          </span>
        </div>
      </div>
    </div>
  );
};

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateRandomString(length: number) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

Card.displayName = 'CardComponent';

export default withLogger(Card);