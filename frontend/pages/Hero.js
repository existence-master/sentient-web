"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const Hero = () => {
  const heroImageRef = useRef();
  const heroTextRef = useRef();

  const heroImageScroll = useScroll({
    target: heroImageRef,
    offset: ["center end", "end start"],
  });

  const heroTextScroll = useScroll({
    target: heroTextRef,
    offset: ["start end", "end start"],
  });

  const imageOpacity = useTransform(
    heroImageScroll.scrollYProgress,
    [0, 0.5],
    [1, 0]
  );
  const imageScale = useTransform(
    heroImageScroll.scrollYProgress,
    [0, 0.5],
    [1, 1.5]
  );

  const textOpacity = useTransform(
    heroTextScroll.scrollYProgress,
    [0, 0.5, 1],
    [0, 1, 0]
  );
  const textScale = useTransform(
    heroTextScroll.scrollYProgress,
    [0, 0.5, 1],
    [2.5, 1, 0.5]
  );

  return (
    <section>
      <motion.div
        style={{ opacity: imageOpacity, scale: imageScale }}
        ref={heroImageRef}
        className="relative"
      >
        <Image
          src="/hero-blob.svg"
          width={0}
          height={0}
          sizes="100vh"
          className="w-screen left-0 right-0"
          alt="Hero Blob"
        />
        <Image
          src="/human-robot-handshake.png"
          width={0}
          height={0}
          sizes="100vh"
          className="w-screen absolute left-0 right-0 lg:top-[200px] sm:top-[125px] xs:top-[75px]"
          alt="Human Robot Handshake"
        />
      </motion.div>
      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        ref={heroTextRef}
        className="flex flex-col justify-center items-center text-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px] lg:ml-20 sm:ml-16 xs:ml-10 lg:mr-20 sm:mr-16 xs:mr-10"
      >
        <h1 className="font-Montserrat font-extrabold lg:text-[100px] sm:text-[50px] xs:text-[25px] text-white">
          your personal AI
        </h1>
        <h2 className="font-Sanchez lg:text-[50px] sm:text-[25px] xs:text-[15px] text-gray-300">
          who feels human
        </h2>
      </motion.div>
    </section>
  );
};

export default Hero;
