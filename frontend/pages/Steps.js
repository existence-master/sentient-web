"use client"

import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";

const Steps = () => {
  const firstTextRef = useRef()
  const secondTextRef = useRef()
  const thirdTextRef = useRef()

  const firstTextScroll = useScroll({
    target: firstTextRef,
    offset: ["start end", "end center"]
  })

  const firstTextX = useTransform(firstTextScroll.scrollYProgress, [0, 0.5], [-1000, 0])
  
  const secondTextScroll = useScroll({
    target: secondTextRef,
    offset: ["start end", "end center"]
  })

  const secondTextX = useTransform(secondTextScroll.scrollYProgress, [0, 0.5], [-2000, 0])
  
  const thirdTextScroll = useScroll({
    target: thirdTextRef,
    offset: ["start end", "end center"]
  })

  const thirdTextX = useTransform(thirdTextScroll.scrollYProgress, [0,  0.5], [-3000, 0 ])

  return (
    <section>
      <div className="flex flex-col lg:gap-[70px] sm:gap-[50px] xs:gap-[30px] lg:mr-20 sm:mr-16 xs:mr-10 lg:ml-20 sm:ml-16 xs:ml-10 xs:max-sm:h-[50vh] sm:h-[150vh] justify-center">
        <motion.h3 ref={firstTextRef} style={{ x: firstTextX }} className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] sm:text-left xs:text-center text-white">
          quick signup
        </motion.h3>
        <motion.h3 ref={secondTextRef} style={{ x: secondTextX }} className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-center text-white">
          give access permissions
        </motion.h3>
        <motion.h3 ref={thirdTextRef} style={{ x: thirdTextX }} className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] sm:text-right xs:text-center text-white">
          activate your friend and enjoy
        </motion.h3>
      </div>
    </section>
  );
};

export default Steps;
