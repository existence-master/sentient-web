import Nav from "@components/Nav"
import Image from "next/image"
import { Fragment } from "react"

const Enter = () => {
    return (
        <Fragment>
            <Nav action="none" />
            <div className="flex items-center justify-center lg:gap-[100px] sm:gap-[75px] xs:gap-[50px]">
                <div className="relative">
                    <Image src="/" />
                </div>
            </div>
        </Fragment>
    )
}