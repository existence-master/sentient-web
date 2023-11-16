"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
//import { TypeAnimation } from "react-type-animation";

const Nav = () => {
  return (
    <section>
      <div className="flex justify-between lg:mr-20 sm:mr-16 xs:mr-10 lg:ml-20 sm:ml-16 xs:ml-10">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            width={0}
            height={0}
            sizes="100vh"
            className="lg:w-[40px] sm:w-[30px] xs:w-[20px] object-contain"
            alt="Sentient Logo"
          />
          <span className="font-Poppins text-white lg:text-xl sm:text-lg xs:text-md lg:ml-5 sm:ml-4 xs:ml-3">
            Sentient
          </span>
        </div>
        <div>
        <Link href="https://existence-sentient.streamlit.app">
          <motion.button
            whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
            className="bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] lg:p-4 sm::p-3 xs:p-2 rounded-[12px] font-Montserrat font-semibold lg:text-lg sm:text-md xs:text-sm text-white">
            try out now
          </motion.button>
        </Link>
        </div>
      </div>
      {/* <div className="h-screen w-full flex justify-center items-center">
        <span className="text-white font-Poppins text-[50px]">
          <TypeAnimation
              sequence={[
                'scroll',
                500,
                'to',
                500,
                'the',
                500,
                'future',
                500
              ]}
              repeat={Infinity}
              speed={30}
              deletionSpeed={30} />
        </span>  
      </div> */}
    </section>
  );
};

export default Nav;
