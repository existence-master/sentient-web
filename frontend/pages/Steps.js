"use client"

import { useScroll, motion, useTransform } from "framer-motion";

const Steps = ({ pageScrollProgress }) => {
  if (pageScrollProgress === undefined || pageScrollProgress === null) {
    pageScrollProgress = useScroll()
  }

  const firstTextX = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.6, 0.61],
    [-1000, 0]
  ) 

  const secondTextX = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.61, 0.62],
    [-1500, 0]
  )

  const thirdTextX = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.62, 0.63],
    [-2000, 0]
  )

  const textOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.63, 0.65], 
    [1, 0]
  )

  return (
    <section>
      <div className="fixed top-0 h-screen flex flex-col lg:gap-[70px] sm:gap-[50px] xs:gap-[30px] lg:pr-20 sm:pr-16 xs:pr-10 lg:pl-20 sm:pl-16 xs:pl-10 justify-center w-screen">
        <motion.h3 style={{ x: firstTextX, opacity: textOpacity}} className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] sm:text-left xs:text-center text-white">
          quick signup
        </motion.h3>
        <motion.h3 style={{ x: secondTextX, opacity: textOpacity }} className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-center text-white">
          give access permissions
        </motion.h3>
        <motion.h3 style={{ x: thirdTextX, opacity: textOpacity }} className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] sm:text-right xs:text-center text-white">
          activate your friend and enjoy
        </motion.h3>
      </div>
    </section>
  );
};

export default Steps;