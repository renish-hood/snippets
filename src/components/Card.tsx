"use client";
import { useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";
import { CardPattern } from "./CardPattern";

export const Card = () => {
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
      <a
        href={`https://aceternity.com/templates?ref=stackblitz`}
        target="\_\_blank"
        className="p-0.5 bg-transparent aspect-square flex items-center justify-center w-full h-full relative"
      >
        <div
          onMouseMove={onMouseMove}
          className="group rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
        >
          <CardPattern
            mouseX={mouseX.get()}
            mouseY={mouseY.get()}
            randomString={randomString}
          />
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative h-44 w-44  rounded-full flex items-center justify-center text-white font-bold text-4xl">
              <div className="absolute w-full h-full bg-black/[0.8] blur-sm rounded-full" />
              <span className="text-white z-20">Humaans</span>
            </div>
          </div>
        </div>
      </a>
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