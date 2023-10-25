"use client"

import Context from "@pages/Context"
import Evolution from "@pages/Evolution"
import Features from "@pages/Features"
import Footer from "@pages/Footer"
import Hero from "@pages/Hero"
import Nav from "@components/Nav"
import Steps from "@pages/Steps"
import { Fragment, useRef } from "react"
import { useScroll } from "framer-motion"

const Home = () => {

  const pageRef = useRef()
  const pageScrollProgress = useScroll(pageRef)
  
  return (
    <Fragment>
      <Nav/>
      <div className = "h-[950vh] overflow-hidden" ref={pageRef}>
        <Hero pageScrollProgress={pageScrollProgress ? pageScrollProgress : undefined} />
        <Context pageScrollProgress={pageScrollProgress ? pageScrollProgress : undefined} />
        <Steps pageScrollProgress={pageScrollProgress ? pageScrollProgress : undefined} />
      </div>
      <Evolution />
      <Features /> 
      <Footer /> 
    </Fragment>
  )
}

export default Home