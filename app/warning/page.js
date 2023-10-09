import Nav from "@components/Nav"
import Link from "next/link"
import { Fragment } from "react"

const Warning = () => {
    return (
        <Fragment>
            <Nav action="none" />
            <div className = "flex items-center justify-center lg:gap-[100px] sm:gap-[75px] xs:gap-[50px]">
                <Image src="/warning.svg" width={0} height={0} className="lg:w-[300px] sm:w-[200px] xs:w-[100px]" alt="Heads Up" />
                <div className="flex flex-col lg:gap-[75px] sm:gap-[50px] xs:gap-[25px]">
                    <h2 className="font-Quicksand lg:text-[50px] sm:text-[25px] xs:text-[15px]">
                        Heads Up
                    </h2>
                    <h3 className = "font-Sanchez font-extralight lg:text-[30px] sm:text-[20px] xs:text-[10px]">
                        This is an early adopter version of Sentient. Note that we collect your data for training our base AI model. Your data is secure but can be seen by us. For more information check the following link
                    </h3>
                    <div className="flex items-center justify-center lg:gap-[30px] sm:gap-[20px] xs:gap-[10px]">
                        <Link href="/philosophy" className="lg:p-4 sm:p-3 xs:p-2 bg-gradient-to-b rounded-[12px] from-[#9E00D1] to-[#4E31FF]">
                            what we do with your data
                        </Link>
                        <button type="submit" onClick={handleSubmit} className="lg:p-4 sm:p-3 xs:p-2 bg-gradient-to-b rounded-[12px] from-[#9E00D1] to-[#4E31FF]">
                            continue
                        </button> 
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Warning