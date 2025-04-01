"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";
// Supports weights 300-700
import "@fontsource-variable/quicksand";
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    const animationSequence = async () => {
      // Forward animation
      await animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2),
        }
      );

      // Wait for 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reverse animation from end to start
      await animate(
        "span",
        {
          opacity: 0,
          filter: filter ? "blur(10px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2, { startDelay: 0.2, direction: "reverse" }),
        }
      );

      // Loop the sequence
      animationSequence();
    };

    animationSequence();
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="dark:text-white text-black opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn(className)}>
      <div className="mt-4">
        <div className="text-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent md:text-[20px] text-[16px] sm:text-xl md:text-xl text-gray-400 mt-10 md:mt3  homedefination leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
