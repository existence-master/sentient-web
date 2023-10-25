"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const Hero = () => {
  const heroImageRef = useRef();
  const heroTextRef = useRef();

  const heroImageScroll = useScroll({
    target: heroImageRef,
    offset: ["start end", "end start"],
  });

  const heroTextScroll = useScroll({
    target: heroTextRef,
    offset: ["start end", "end start"],
  });

  const imageTranslate = useTransform(
    heroImageScroll.scrollYProgress,
    [0, 1],
    [-1000, 0]
  )
  const { scrollYProgress } = useScroll()

  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 0]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 2.5]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5],
    [0, 1, 0]
  );
  const textScale = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5],
    [2.5, 1, 0]
  );


  return (
    <section className = "h-[800vh]">
      <motion.div
        //style={{ opacity: imageOpacity, scale: imageScale }}
        style={{scale: imageScale, opacity: imageOpacity, x: imageTranslate}}
        ref={heroImageRef}
        className="fixed z-10 left-[30vw] top-[25vw]"
      >
        {/* <Image
          src="/hero-blob.svg"
          width={0}
          height={0}
          sizes="100vh"
          className="w-[50%] left-[50%] right-0"
          alt="Hero Blob"
        /> */}
        <Image
          src="/evolution.svg"
          width={0}
          height={0}
          sizes="100vh"
          className="w-[50vw]"
          alt="Human Robot Handshake"
        />
      </motion.div>
      <motion.div
        style={{scale: textScale, opacity: textOpacity}}
        ref={heroTextRef}
        className="fixed right-[5%] top-[30vh] flex flex-col justify-center items-center text-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px] lg:ml-20 sm:ml-16 xs:ml-10 lg:mr-20 sm:mr-16 xs:mr-10"
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
