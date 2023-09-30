"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/add-user", {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.status == 201) {
        setError(null);
        setSubmit(true);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      setError(error.message);
      setSubmit(true);
    } finally {
      setTimeout(() => {
        setSubmit(false);
      }, 5000);
    }
  };

  return (
    <section>
      <div
        id="earlyAdopter"
        className="z-10 relative flex flex-col h-screen lg:gap-[50px] xs:gap-[30px] justify-center items-center lg:mr-20 sm:mr-16 xs:mr-10 lg:ml-20 sm:ml-16 xs:ml-10"
      >
        <h3 className="font-Quicksand font-bold lg:text-[50px] sm:text-[25px] xs:text-[15px] text-center text-white">
          interested in using sentient?
        </h3>
        {submit == true ? (
          error == null ? (
            <div className="w-full text-center">
              <span className="text-white font-Poppins lg:text-lg sm:text-md xs:text-sm">
                Congrats, you are in the waitlist
              </span>
            </div>
          ) : (
            <div className="w-full text-center">
              <span className="text-white font-Poppins lg:text-lg sm:text-md xs:text-sm">
                {`That didn't work. ${error}`}
              </span>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center lg:gap-x-[50px] sm:gap-x-[25px] xs:gap-x-[15px]">
            <div className="flex-auto sm:p-1 xs:p-0.5 w-full bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] rounded-[12px]">
              <input
                type="text"
                placeholder="your email here"
                className="font-Montserrat w-full font-light lg:text-lg sm:text-md xs:text-sm lg:p-4 sm:p-3 xs:p-2 bg-black text-gray-300 rounded-[12px]"
                onChange={handleChange}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
              type="submit"
              onClick={handleSubmit}
              className="flex-none bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] lg:px-8 sm:px-6 xs:px-4 lg:py-4 sm:py-3 xs:py-2 rounded-[12px] font-Montserrat sm:font-semibold xs:font-medium lg:text-lg sm:text-md xs:text-sm text-white"
            >
              submit
            </motion.button>
          </div>
        )}
        <h4 className="font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px] text-center text-gray-300">
          sentient is currently in development. enter your email and be one of
          the first to try
        </h4>
      </div>
      <div className="text-center relative">
        <Image
          src="/footer-blob.svg"
          width={0}
          height={0}
          sizes="100vh"
          className="z-0 w-screen absolute lg:-bottom-[100px] sm:-bottom-[50px] xs:-bottom-[25px]"
          alt="Footer Blob"
        />
        <div className="relative z-10">
          <span className="font-Montserrat font-medium sm:text-md xs:text-xs text-white ">
            &copy; Sentient 2023 | All Rights Reserved
          </span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
