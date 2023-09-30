"use client"

import FeatureCard from "@components/FeatureCard";
import { useInView, motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const Features = () => {
  const features = [
    {
      id: 1,
      image: "/sentient-web/friendly.png",
      name: "friendly",
      description:
        "chat, share and laugh together with your new companion anytime",
    },
    {
      id: 2,
      image: "/sentient-web/automate-your-life.png",
      name: "automate your life",
      description:
        "let your friend handle your tasks while you focus on bigger things",
    },
    {
      id: 3,
      image: "/sentient-web/dedicated-to-you.png",
      name: "dedicated to you",
      description:
        "have that one buddy in life who helps you achieve your maximum capacity",
    },
    {
      id: 4,
      image: "/sentient-web/secure.png",
      name: "secure",
      description:
        "we don’t see your data so your data remains between you and your AI",
    },
    {
      id: 5,
      image: "/sentient-web/hassle-free.png",
      name: "hassle free",
      description:
        "we use the knowledge from the services you already use so no extra efforts from your side",
    },
    {
      id: 6,
      image: "/sentient-web/pay-per-use.png",
      name: "pay per use",
      description:
        "pay your AI a fixed amount and watch it do your tasks in a jiffy",
    },
  ]

  const grid = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2,
            staggerChildren: 0.3
        }
    }
  }

  const item = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7
      }
    }
  }

  const featuresRef = useRef()
  const control = useAnimation()
  const inView = useInView(featuresRef)

  useEffect(() => {
    if (inView) {
      control.start("visible")
    }
    else {
      control.start("hidden")
    }
  }, [inView, control])

  return (
    <section ref={featuresRef}>
      <motion.div variants={grid} initial="hidden" animate={control} className="lg:mt-[300px] sm:mt-[200px] xs:mt-[100px] sm:grid xs:flex xs:flex-col lg:grid-rows-2 lg:grid-cols-3 sm:grid-rows-3 sm:grid-cols-2 sm:grid-flow-row lg:gap-[30px] xs:gap-[20px] lg:mr-20 sm:mr-16 xs:mr-10 lg:ml-20 sm:ml-16 xs:ml-10 xs:justify-center xs:items-center">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          image={feature.image}
          name={feature.name}
          description={feature.description}
          variants={item}
        />
      ))}
      </motion.div>
    </section>
    
  );
};

export default Features;
