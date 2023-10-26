"use client"
import { motion } from "framer-motion"

import Image from "next/image"

const FeatureCard = ({ image, name, description, variants }) => {
    return (
        <motion.div variants={variants} className="xs:w-[50%] sm:w-full sm:p-1 xs:p-0.5 rounded-[12px] bg-gradient-to-b from-[#3D1DFF] from-20% via-[#D451FF] via-60% to-[#FFCA8B] to-100%">
            <div className="bg-black lg:p-4 sm:p-3 xs:p-2 flex flex-col w-full h-full rounded-[12px] justify-start gap-[10px]">
                <Image src={image} width={0} height={0} sizes="100vh" className="xs:w-[20px] sm:w-[40px] lg:w-[50px] xs:h-[20px] sm:h-[40px] lg:h-[50px]" alt={`${name}`} />
                <h4 className="font-Quicksand font-semibold sm:text-[20px] xs:text-[15px] text-left text-white">
                    {name}
                </h4>
                <p className="font-Sanchez font-light sm:text-[15px] xs:text-[10px] text-left text-gray-300">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}

export default FeatureCard