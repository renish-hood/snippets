import { motion, useMotionTemplate } from "framer-motion";

export function CardPattern({ mouseX, mouseY, randomString }: { mouseX: number; mouseY: number; randomString: string }) {
    let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
    let style = { maskImage, WebkitMaskImage: maskImage };
  
    return (
      <div className="pointer-events-none">
        <div className="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50"></div>
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0  group-hover:opacity-100 backdrop-blur-xl transition duration-500"
          style={style}
        />
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover:opacity-100"
          style={style}
        >
          <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
            {randomString}
          </p>
        </motion.div>
      </div>
    );
  }