import Nav from "@components/Nav"
import Image from "next/image"
import Link from "next/link"
import { h2, h3, button, horizontalFlex, verticalFlex } from "@utils/styles"

const Warning = () => {
    return (
        <section className="h-screen">
            <Nav action= {false} />
            <div className={`p-[50px] ${horizontalFlex}`}>
                <div className="w-[50%] flex items-center justify-center">
                    <Image src="/warning.svg" width={0} height={0} className="lg:w-[300px] sm:w-[200px] xs:w-[100px]" alt="Heads Up" />
                </div>
                <div className={`w-[50%] ${verticalFlex}`}>
                    <h2 className={`${h2} text-white`}>
                        Heads Up
                    </h2>
                    <h3 className = {`${h3} text-white`}>
                        This is an early adopter version of Sentient. Note that we collect your data for training our base AI model. Your data is secure but can be seen by us. For more information check the following link
                    </h3>
                    <div className="flex items-center justify-start lg:gap-[30px] sm:gap-[20px] xs:gap-[10px]">
                        <Link href="/philosophy">
                            <button className={`${button} bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] text-white`}>
                                what we do with your data
                            </button> 
                        </Link>
                        <Link href="/enter">
                            <button className={`${button} bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] text-white`}>
                                continue
                            </button> 
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Warning