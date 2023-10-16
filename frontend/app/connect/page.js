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
    const [file, setFile] =  useState(null)

    const handleClick = () => {
        setLinkedInConnect(true)
    }

    const handleChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const formData = new FormData()
        formData.append('file', file, file.name)

        try {
            const response = await fetch("http://localhost:5000/linkedin-connect", {
                method: "POST",
                body: formData
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
                            <form onSubmit={handleFormSubmit}>
                                <label htmlFor="upload" className={`${h3} text-white`}>
                                    Upload your LinkedIn profile
                                </label>
                                <div className="flex-auto sm:p-1 xs:p-0.5 w-full bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] rounded-[12px]">
                                <input type="file" name="file" onChange={handleChange} />
                                </div>
                                <button type="submit" className={`${button} bg-gradient-to-b from-[#9E00D1] to-[#4E31FF] text-white`}>
                                    connect linkedin
                                </button> 
                            </form>
                        </Fragment>
                       
                    ) : error !== null ? (
                            <div>
                                {error}
                            </div>
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