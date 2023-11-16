"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {

  return (
    <section>
      <div
        id="earlyAdopter"
        className="z-10 relative flex flex-col h-screen lg:gap-[50px] xs:gap-[30px] justify-center items-center lg:mr-20 sm:mr-16 xs:mr-10 lg:ml-20 sm:ml-16 xs:ml-10"
      >
        <h3 className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-center text-white">
          where we are right now
        </h3>
        <div className="flex items-center justify-center lg:gap-x-[50px] sm:gap-x-[25px] xs:gap-x-[15px]">
        <Link href="https://existence-sentient.streamlit.app">
          <motion.button
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
            className="flex-none bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] lg:px-8 sm:px-6 xs:px-4 lg:py-4 sm:py-3 xs:py-2 rounded-[12px] font-Montserrat sm:font-semibold xs:font-medium lg:text-lg sm:text-md xs:text-sm text-white">
            try out now
          </motion.button>
        </Link>
        
        </div>
        <h4 className="font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px] text-center text-gray-300">
          sentient is in continuous development. currently we have a chatbot who chats with you about anything with the added utility of helping you improve your LinkedIn profile. we are taking baby steps towards the end goal. you can try it out now
        </h4>
      </div>
      <div className="text-center relative">
        <Image
          src="/footer-blob.svg"
          width={0}
          height={0}
          sizes="100vh"
          className="z-0 w-screen h-auto absolute bottom-0"
          alt="Footer Blob"
        />
        <div className="relative z-10 lg:h-[100px] sm:h-[70px] xs:h-[50px]">
          <span className="font-Montserrat font-medium lg:text-lg sm:text-md xs:text-xs text-white ">
            &copy; Sentient 2023 | All Rights Reserved
          </span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
