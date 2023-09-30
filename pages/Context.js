"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

const Context = () => {
    const firstContextRef = useRef()
    const firstContextScroll = useScroll({
        target: firstContextRef,
        offset: ["start end", "end start"]
    })

    const firstContextX = useTransform(firstContextScroll.scrollYProgress, [0, 0.5], [1000, 0])

    const secondContextRef = useRef()
    const secondContextScroll = useScroll({
        target: secondContextRef,
        offset: ["start end", "end start"]
    })

    const secondContextX = useTransform(secondContextScroll.scrollYProgress, [0, 0.5], [-1000, 0])
    
    const thirdContextRef = useRef()
    const thirdContextScroll = useScroll({
        target: thirdContextRef,
        offset: ["start end", "end start"]
    })

    const thirdContextX = useTransform(thirdContextScroll.scrollYProgress, [0, 0.5], [1000, 0])

    const fourthContextRef = useRef()
    const fourthContextScroll = useScroll({
        target: fourthContextRef,
        offset: ["start end", "end start"]
    })

    const fourthContextX = useTransform(fourthContextScroll.scrollYProgress, [0,  0.5], [-1000, 0 ])

    const fifthContextRef = useRef()
    const fifthContextScroll = useScroll({
        target: fifthContextRef,
        offset: ["start end", "end start"]
    })

    const fifthContextOpacity = useTransform(fifthContextScroll.scrollYProgress, [0, 0.5], [0, 1])

    return (
        <section>
            <div className="flex xs:h-screen sm:h-full sm:flex-row xs:flex-col lg:mr-20 sm:mr-16">
                <motion.div ref={secondContextRef } style={{ x: secondContextX }} className="sm:w-1/2 relative">
                    <Image src={typeof window != "undefined" ? window.innerWidth > 640 ? "/sentient-web/context-blob-1.svg" : "/sentient-web/context-blob-1-xs.svg" : "/sentient-web/context-blob-1.svg"} width = {0} height={0} sizes="100vh" className="w-screen sm:left-0 sm:right-0" alt="Context Blob 1" />
                    <Image src={typeof window != "undefined" ? window.innerWidth > 640 ? "/sentient-web/human-chat.png" : "/sentient-web/human-chat-xs.png" : "/sentient-web/human-chat.png"} width={0} height={0} sizes="100vh" className="w-screen absolute sm:left-0 lg:top-[150px] sm:top-[100px] xs:top-0" alt="Human Chat" />
                </motion.div>
                <motion.div ref={firstContextRef} style={{ x: firstContextX }} className="flex sm:w-1/2 flex-col sm:items-start xs:items-center justify-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px]">
                    <h3 className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-white">
                        the problem with humans
                    </h3>
                    <h4 className="font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px] text-gray-300">
                        know you well, but are limited to their own views
                    </h4>
                </motion.div>
            </div>
            <div className="flex xs:h-screen sm:h-full sm:flex-row xs:flex-col-reverse lg:ml-20 sm:ml-16">
                <motion.div ref={fourthContextRef} style={{ x: fourthContextX }} className="flex sm:w-1/2 flex-col sm:items-start xs:items-center justify-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px]">
                    <h3 className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-white">
                        the problem with AI
                    </h3>
                    <h4 className="font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px] text-gray-300">
                        not limited cognitively, but doesn’t know you at all
                    </h4>
                </motion.div>
                <motion.div ref={thirdContextRef} style={{x: thirdContextX}} className="sm:w-1/2 relative">
                    <Image src={typeof window != "undefined" ? window.innerWidth > 640 ? "/sentient-web/context-blob-2.svg" : "/sentient-web/context-blob-2-xs.svg" : "/sentient-web/context-blob-2.svg"}  width = {0} height={0} sizes="100vh" className="w-screen sm:left-0 sm:right-0" alt="Context Blob 2" />
                    <Image src={typeof window != "undefined" ? window.innerWidth > 640 ? "/sentient-web/ai-chat.png" : "/sentient-web/ai-chat-xs.png" : "/sentient-web/ai-chat.png"} width={0} height={0} sizes="100vh" className="w-screen absolute sm:left-0 lg:top-[150px] sm:top-[100px] xs:top-0" alt="AI Chat" />
                </motion.div>
            </div>
            <motion.div ref={fifthContextRef} style={{opacity: fifthContextOpacity}} className="flex flex-col">
                <div className="relative">
                    <Image src="/sentient-web/context-blob-3.svg"  width = {0} height={0} sizes="100vh" className="w-screen sm:left-0 sm:right-0" alt="Context Blob 3" />
                    <Image src="/sentient-web/sentient-chat.png" width={0} height={0} sizes="100vh" className="w-screen absolute sm:left-0 top-0" alt="Sentient Chat" />
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-[20px] sm:gap-[15px] xs:gap-[10px]">
                    <h3 className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-white">
                        sentient comes to the rescue
                    </h3>
                    <h4 className="font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px] text-gray-300">
                        the power of cognition + personal knowledge base
                    </h4>
                </div>
            </motion.div>
        </section>
    )
}

export default Context