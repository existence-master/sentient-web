"use client"

import { Fragment, useState } from "react"
import { useRouter } from "next/navigation"
import Nav from "@components/Nav"
import { h2, h3, button, horizontalFlex, verticalFlex } from "@utils/styles"
import Image from "next/image"

const Connect = () => {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [linkedInConnect, setLinkedInConnect] = useState(false)
    const [linkedInEmail, setLinkedInEmail] = useState(null)
    const [linkedInPassword, setLinkedInPassword] = useState(null)

    const handleClick = () => {
        setLinkedInConnect(true)
    }

    const handleEmailChange = (e) => {
        setLinkedInEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setLinkedInPassword(e.target.value)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            const response = await fetch("http://localhost:5000/linkedin-connect", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: linkedInEmail,
                    password: linkedInPassword
                })
            })
            
            if (response.status == 200) {
                router.push('/home')
            }

            else { 
                throw new Error(response.error.message)
            }
        }
        catch (error) {
            setError(error.message)
        }
        finally {
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }
    
    return (
        <section className="h-screen">
            <Nav action= {false} />
                    <div className = {`p-[50px] ${horizontalFlex}`}>
                <div className="w-[50%] flex items-center justify-center">
                    <Image src="/linkedin-connect.svg" width={0} height={0} className="lg:w-[300px] sm:w-[200px] xs:w-[100px]" alt="Heads Up" />
                </div>
                <div className={`w-[50%] ${verticalFlex}`}>
                    <h2 className={`${h2} text-white`}>
                        Almost Done
                    </h2>
                    {linkedInConnect ? (
                        <Fragment>
                            <form method="POST" action={handleFormSubmit}>
                                <label htmlFor="email" className={`${h3} text-white`}>
                                    Enter your LinkedIn email
                                </label>
                                <div className="flex-auto sm:p-1 xs:p-0.5 w-full bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] rounded-[12px]">
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="your email here"
                                        className="font-Montserrat w-full font-light lg:text-lg sm:text-md xs:text-sm lg:p-4 sm:p-3 xs:p-2 bg-black text-gray-300 rounded-[12px]"
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <label htmlFor="password" className={`${h3} text-white`}>
                                    Enter your LinkedIn password
                                </label>
                                <div className="flex-auto sm:p-1 xs:p-0.5 w-full bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] rounded-[12px]">
                                    <input
                                        type="text"
                                        name="password"
                                        placeholder="your password here"
                                        className="font-Montserrat w-full font-light lg:text-lg sm:text-md xs:text-sm lg:p-4 sm:p-3 xs:p-2 bg-black text-gray-300 rounded-[12px]"
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <button type="submit" className={`${button} bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] text-white`}>
                                    connect linkedin
                                </button> 
                            </form>
                        </Fragment>
                       
                    ) : (
                            <Fragment>
                                <h3 className = {`${h3} text-white`}>
                                    Currently for training purposes, we only use your LinkedIn data. LinkedIn data is already public so you don’t have to worry about safety issues. Let’s do this one step and you are done
                                </h3>
                                <button onClick={handleClick} className={`${button} bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] text-white`}>
                                    proceed
                                </button> 
                            </Fragment>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Connect