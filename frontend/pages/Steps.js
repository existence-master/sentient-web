"use client"

import { motion, useTransform } from "framer-motion";

const Steps = ({pageScrollProgress}) => {

  const firstTextX = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.6, 0.62],
    [-1000, 0]
  ) 

  const secondTextX = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.62, 0.64],
    [-1000, 150]
  )

  const thirdTextX = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.64, 0.66],
    [-1000, 300]
  )

  const textOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.66, 0.7], 
    [1, 0]
  )

  return (
    <section>
      <div className="fixed sm:top-[25vh] flex flex-col lg:gap-[70px] sm:gap-[50px] xs:gap-[30px] lg:mr-20 sm:mr-16 xs:mr-10 lg:ml-20 sm:ml-16 xs:ml-10 xs:max-sm:h-[50vh]  justify-center">
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
