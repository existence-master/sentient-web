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
      <div className = "h-[950vh] mt-[100px] overflow-hidden" ref={pageRef}>
        <Hero pageScrollProgress={pageScrollProgress} />
        <Context pageScrollProgress={pageScrollProgress} />
        <Steps pageScrollProgress={pageScrollProgress} />
      </div>
      <Evolution />
      <Features /> 
      <Footer /> 
    </Fragment>
  )
}

export default Home