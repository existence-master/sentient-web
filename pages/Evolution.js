"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const Evolution = () => {
  const heading1 = "generative AI";
  const heading2 = "interactive AI";

  const firstTextRef = useRef();
  const secondTextRef = useRef();
  const firstControl = useAnimation();
  const secondControl = useAnimation();
  const firstInView = useInView(firstTextRef);
  const secondInView = useInView(secondTextRef);

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.5,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  useEffect(() => {
    if (firstInView) {
      firstControl.start("visible");
    }

    if (secondInView) {
      secondControl.start("visible");
    }
  }, [firstControl, firstInView, secondControl, secondInView]);

  return (
    <section>
      <div
        ref={firstTextRef}
        className="flex items-center justify-center h-screen"
      >
        <motion.h1
          variants={sentence}
          initial="hidden"
          animate={firstControl}
          className="font-Montserrat font-extrabold text-center lg:text-[100px] sm:text-[50px] xs:text-[25px] bg-clip-text text-transparent bg-gradient-to-b from-[#3D1DFF] from-20% via-[#D451FF] via-60% to-[#FFCA8B] to-100%"
        >
          {heading1.split("").map((char, index) => {
            return (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            );
          })}
        </motion.h1>
      </div>
      <div className="xs:h-screen sm:h-full relative items-center">
        <Image
          src="/evolution-blob.svg"
          width={0}
          height={0}
          sizes="100vh"
          className="w-screen sm:left-0 sm:right-0"
          alt="Evolution Blob"
        />
        <Image
          src="/evolution.svg"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[70vw] absolute left-[15vw] xs:top-[35%]"
          alt="Evolution"
        />
      </div>
      <div
        ref={secondTextRef}
        className="flex items-center justify-center h-screen"
      >
        <motion.h1
          variants={sentence}
          initial="hidden"
          animate={secondControl}
          className="font-Montserrat font-extrabold text-center lg:text-[100px] sm:text-[50px] xs:text-[25px] bg-clip-text text-transparent bg-gradient-to-b from-[#3D1DFF] from-20% via-[#D451FF] via-60% to-[#FFCA8B] to-100%"
        >
          {heading2.split("").map((char, index) => {
            return (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            );
          })}
        </motion.h1>
      </div>
    </section>
  );
};

export default Evolution;
