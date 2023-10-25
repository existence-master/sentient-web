"use client";

import { useTransform, motion, useScroll } from "framer-motion";
import Image from "next/image";

const Hero = ({ pageScrollProgress }) => {
  if (pageScrollProgress === undefined || pageScrollProgress === null) {
    pageScrollProgress = useScroll()
  }

  const imageOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0, 0.15],
    [1, 0]
  );
  const imageScale = useTransform(
    pageScrollProgress.scrollYProgress,
    [0, 0.15],
    [1, 2.5]
  );

  const textOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.15, 0.225, 0.3],
    [0, 1, 0]
  );
  const textScale = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.15, 0.225, 0.3],
    [2.5, 1, 0]
  );


  return (
    <section className="flex justify-center items-center h-full">
      <motion.div
        style={{scale: imageScale, opacity: imageOpacity}}
        className="fixed top-0 h-screen w-screen z-10 flex justify-center items-center"
      >
        <Image
          src="/human-robot-handshake.svg"
          width={0}
          height={0}
          sizes="100vh"
          className="w-screen"
          alt="Human Robot Handshake"
        />
      </motion.div>
      <motion.div
        style={{scale: textScale, opacity: textOpacity}}
        className="fixed h-screen w-screen top-0 flex flex-col justify-center items-center text-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px] lg:ml-20 sm:ml-16 xs:ml-10 lg:mr-20 sm:mr-16 xs:mr-10"
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

Hero.defaultProps = {
  pageScrollProgress: null
}

export default Hero;
