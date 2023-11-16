"use client";

import { useTransform, motion, useScroll } from "framer-motion";
import Image from "next/image";

const Context = ({ pageScrollProgress }) => {
  if (pageScrollProgress === undefined || pageScrollProgress === null) {
    pageScrollProgress = useScroll()
  }

  const firstContextXLarge = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.3, 0.35, 0.4],
    [500, 0, -100]
  );

  const firstContextXSmall = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.3, 0.4],
    [100, 0]
  );

  const firstContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.3, 0.33, 0.39, 0.4],
    [0, 1, 1, 0]
  );

  const secondContextXLarge = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.3, 0.35, 0.4],
    [-250, 0, 100]
  );

  const secondContextXSmall = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.3, 0.4],
    [-100, 0]
  );

  const secondContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.3, 0.33, 0.39, 0.4],
    [0, 1, 1, 0]
  );

  const thirdContextXLarge = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.4, 0.45, 0.5],
    [0, 100, 500]
  );

  const thirdContextXSmall = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.4, 0.45, 0.5],
    [0, 100, 200]
  );

  const thirdContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.4, 0.41, 0.49, 0.5],
    [0, 1, 1, 0]
  );

  const fourthContextXLarge = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.4, 0.45, 0.5],
    [0, -100, -300]
  );

  const fourthContextXSmall = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.4, 0.45, 0.5],
    [0, -100, -200]
  );

  const fourthContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.4, 0.41, 0.49, 0.5],
    [0, 1, 1, 0]
  );

  const fifthContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.5, 0.525, 0.55],
    [0, 1, 0]
  );

  const sixthContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.55, 0.575, 0.6],
    [0, 1, 0]
  );

  return (
    <section>
      <div className="xs:max-sm:hidden fixed top-0 flex justify-center items-center w-screen h-screen sm:flex-row xs:flex-col xs:max-sm:gap-[50px]">
        <motion.div
          style={{ x: secondContextXLarge, opacity: secondContextOpacity }}
          className="sm:w-1/2 flex justify-center items-end"
        >
          <Image
            src="/human-chat.svg"
            width={0}
            height={0}
            sizes="100vh"
            className="xs:w-[200px] sm:w-[250px] lg:w-[300px]"
            alt="Human Chat"
          />
        </motion.div>
        <motion.div
          style={{ x: firstContextXLarge, opacity: firstContextOpacity }}
          className="flex sm:w-1/2 flex-col sm:items-start xs:items-center justify-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px]"
        >
          <h3 className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-white">
            the problem with humans
          </h3>
          <h4 className="font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px] text-gray-300">
            know you well, but are limited to their own views
          </h4>
        </motion.div>
      </div>
      <div className="fixed top-0 flex w-screen justify-center items-center h-screen sm:flex-row xs:flex-col-reverse lg:ml-20 sm:ml-16 xs:max-sm:gap-[50px]">
        <motion.div
          style={{ x: fourthContextXLarge, opacity: fourthContextOpacity }}
          className="flex sm:w-1/2 flex-col sm:items-start xs:items-center justify-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px]"
        >
          <h3 className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-white">
            the problem with AI
          </h3>
          <h4 className="font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px] text-gray-300">
            not limited cognitively, but doesn’t know you at all
          </h4>
        </motion.div>
        <motion.div
          style={{ x: thirdContextXLarge, opacity: thirdContextOpacity }}
          className="sm:w-1/2"
        >
          <Image
            src="/ai-chat.svg"
            width={0}
            height={0}
            sizes="100vh"
            className="xs:w-[200px] sm:w-[250px] lg:w-[300px]"
            alt="AI Chat"
          />
        </motion.div>
      </div>
      <motion.div
        className="fixed top-0 w-screen flex flex-col h-screen justify-center items-center"
        style={{ opacity: fifthContextOpacity }}
      >
        <Image
          src="/sentient-chat.svg"
          width={0}
          height={0}
          sizes="100vh"
          className="xs:w-[400px] sm:w-[650px] lg:w-[900px]"
          alt="Sentient Chat"
        />
      </motion.div>
      <motion.div
        style={{ opacity: sixthContextOpacity }}
        className="fixed w-screen h-screen top-0 flex flex-col items-center justify-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px]"
      >
        <h3 className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-white">
          sentient comes to the rescue
        </h3>
        <h4 className="font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px] text-gray-300">
          the power of cognition + personal knowledge base
        </h4>
      </motion.div>
      <div className="sm:hidden fixed top-0 flex justify-center items-center w-screen h-screen sm:flex-row xs:flex-col xs:max-sm:gap-[50px]">
        <motion.div
          style={{ x: secondContextXSmall, opacity: secondContextOpacity }}
          className="sm:w-1/2 flex justify-center items-end"
        >
          <Image
            src="/human-chat.svg"
            width={0}
            height={0}
            sizes="100vh"
            className="xs:w-[200px] sm:w-[250px] lg:w-[300px]"
            alt="Human Chat"
          />
        </motion.div>
        <motion.div
          style={{ x: firstContextXSmall, opacity: firstContextOpacity }}
          className="flex sm:w-1/2 flex-col sm:items-start xs:items-center justify-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px]"
        >
          <h3 className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-white">
            the problem with humans
          </h3>
          <h4 className="font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px] text-gray-300">
            know you well, but are limited to their own views
          </h4>
        </motion.div>
      </div>
      <div className="fixed top-0 flex w-screen justify-center items-center h-screen sm:flex-row xs:flex-col-reverse lg:ml-20 sm:ml-16 xs:max-sm:gap-[50px]">
        <motion.div
          style={{ x: fourthContextXSmall, opacity: fourthContextOpacity }}
          className="flex sm:w-1/2 flex-col sm:items-start xs:items-center justify-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px]"
        >
          <h3 className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-white">
            the problem with AI
          </h3>
          <h4 className="font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px] text-gray-300">
            not limited cognitively, but doesn’t know you at all
          </h4>
        </motion.div>
        <motion.div
          style={{ x: thirdContextXSmall, opacity: thirdContextOpacity }}
          className="sm:w-1/2"
        >
          <Image
            src="/ai-chat.svg"
            width={0}
            height={0}
            sizes="100vh"
            className="xs:w-[200px] sm:w-[250px] lg:w-[300px]"
            alt="AI Chat"
          />
        </motion.div>
      </div>
      <motion.div
        className="fixed top-0 w-screen flex flex-col h-screen justify-center items-center"
        style={{ opacity: fifthContextOpacity }}
      >
        <Image
          src="/sentient-chat.svg"
          width={0}
          height={0}
          sizes="100vh"
          className="xs:w-[400px] sm:w-[650px] lg:w-[900px]"
          alt="Sentient Chat"
        />
      </motion.div>
      <motion.div
        style={{ opacity: sixthContextOpacity }}
        className="fixed w-screen h-screen top-0 flex flex-col items-center justify-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px]"
      >
        <h3 className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-white">
          sentient comes to the rescue
        </h3>
        <h4 className="font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px] text-gray-300">
          the power of cognition + personal knowledge base
        </h4>
      </motion.div>
    </section>
  );
};

export default Context;
