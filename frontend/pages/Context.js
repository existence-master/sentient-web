"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

const Context = ({pageScrollProgress}) => {
  const firstContextX = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.3, 0.4],
    [1000, 200]
  )

  const firstContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.3, 0.33, 0.38, 0.4],
    [0, 1, 1, 0]
  )

  const secondContextX = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.3, 0.4],
    [-500, 0]
  )

  const secondContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.3, 0.33, 0.38, 0.4],
    [0, 1, 1, 0]
  )

  const thirdContextX = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.4, 0.5],
    [0, 1000]
  )

  const thirdContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.4, 0.43, 0.48, 0.5],
    [0, 1, 1, 0]
  )

  const fourthContextX = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.4, 0.5],
    [0, -500]
  )

  const fourthContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.4, 0.43, 0.48, 0.5],
    [0, 1, 1, 0]
  )

  const fifthContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.5, 0.525, 0.55],
    [0, 1, 0]
  )

  const sixthContextOpacity = useTransform(
    pageScrollProgress.scrollYProgress,
    [0.55, 0.575, 0.6],
    [0, 1, 0]
  )

  return (
    <section className="flex justify-center items-center h-full">
      <div className="fixed sm:top-0 flex h-full sm:flex-row xs:flex-col lg:mr-20">
        <motion.div
          style={{ x: secondContextX, opacity: secondContextOpacity }}
          className="sm:w-1/2 fixed"
        >
          <Image
            src="/context-blob-1.svg"
            width={0}
            height={0}
            sizes="100vh"
            className="w-screen xs:max-sm:hidden sm:left-0 sm:right-0"
            alt="Context Blob 1"
          />
          <Image
            src="/context-blob-1-xs.svg"
            width={0}
            height={0}
            sizes="100vh"
            className="w-screen sm:hidden"
            alt="Context Blob 1"
          />
          <Image
            src="/human-chat.png"
            width={0}
            height={0}
            sizes="100vh"
            className="w-screen xs:max-sm:hidden absolute sm:left-0 lg:top-[150px] sm:top-[100px]"
            alt="Human Chat"
          />
          <Image
            src="/human-chat-xs.png"
            width={0}
            height={0}
            sizes="100vh"
            className="w-screen sm:hidden absolute top-0"
            alt="Human Chat"
          />
        </motion.div>
        <motion.div
          style={{ x: firstContextX, opacity: firstContextOpacity }}
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
      <div className="fixed sm:top-0 flex h-full sm:flex-row xs:flex-col-reverse lg:ml-20 sm:ml-16">
        <motion.div
          style={{ x: fourthContextX, opacity: fourthContextOpacity }}
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
          style={{ x: thirdContextX, opacity: thirdContextOpacity }}
          className="sm:w-1/2 fixed"
        >
          <Image
            src="/context-blob-2.svg"
            width={0}
            height={0}
            sizes="100vh"
            className="w-screen xs:max-sm:hidden sm:left-0 sm:right-0"
            alt="Context Blob 2"
          />
          <Image
            src="/context-blob-2-xs.svg"
            width={0}
            height={0}
            sizes="100vh"
            className="w-screen sm:hidden"
            alt="Context Blob 2"
          />
          <Image
            src="/ai-chat.png"
            width={0}
            height={0}
            sizes="100vh"
            className="w-screen xs:max-sm:hidden absolute sm:left-0 lg:top-[150px] sm:top-[100px]"
            alt="AI Chat"
          />
          <Image
            src="/ai-chat-xs.png"
            width={0}
            height={0}
            sizes="100vh"
            className="w-screen sm:hidden absolute top-0"
            alt="AI Chat"
          />
        </motion.div>
      </div>
        <motion.div className="fixed sm:-top-[15vh] flex flex-col xs:max-sm:h-screen  justify-center items-center" style={{ opacity: fifthContextOpacity }}>
          <Image
            src="/context-blob-3.svg"
            width={0}
            height={0}
            sizes="100vh"
            className="w-screen sm:left-0 sm:right-0"
            alt="Context Blob 3"
          />
          <Image
            src="/sentient-chat.png"
            width={0}
            height={0}
            sizes="100vh"
            className="w-screen absolute sm:left-0 top-0"
            alt="Sentient Chat"
          />
        </motion.div>
        <motion.div style={{ opacity: sixthContextOpacity }} className="fixed sm:top-[45vh] flex flex-col items-center justify-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px]">
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
