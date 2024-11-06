import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pb-12 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="flex flex-col md:flex-row items-center md:justify-between mx-auto p-6 md:p-12 max-w-7xl space-y-12 md:space-y-0 gap-4">
        {/* Left side */}
        <div className="flex flex-col gap-8 md:gap-12 text-center md:text-left relative">
          <div className="relative">
            {/* Orange circle background element */}
            <div className="absolute top-[6rem] md:top-[4rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-52 w-52 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full shadow-lg opacity-80 z-[-1] animate-pulse" />

            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
              className="font-bold text-3xl md:text-5xl lg:text-6xl leading-snug md:leading-tight tracking-tight text-white dark:text-gray-100"
            >
              Discover <br />
              Most Suitable <br /> Property
            </motion.h1>
          </div>

          <div className="flex flex-col space-y-2 md:space-y-4">
            <span className="text-lg md:text-xl lg:text-2xl text-gray-200 dark:text-gray-300">
              Find a variety of properties that suit you very easily
            </span>
            <span className="text-lg md:text-xl lg:text-2xl text-gray-200 dark:text-gray-300">
              Forget all difficulties in finding a residence for you
            </span>
          </div>

          <div className="flex justify-around w-full text-center mt-6 md:mt-10 space-x-4 md:space-x-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-semibold text-white dark:text-gray-100">
                <CountUp start={8800} end={9000} duration={4} />{" "}
                <span className="text-orange-400">+</span>
              </span>
              <span className="text-sm md:text-base text-gray-200 dark:text-gray-300">
                Premium Products
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-semibold text-white dark:text-gray-100">
                <CountUp start={1950} end={2000} duration={4} />{" "}
                <span className="text-orange-400">+</span>
              </span>
              <span className="text-sm md:text-base text-gray-200 dark:text-gray-300">
                Happy Customers
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-semibold text-white dark:text-gray-100">
                <CountUp end={28} /> <span className="text-orange-400">+</span>
              </span>
              <span className="text-sm md:text-base text-gray-200 dark:text-gray-300">
                Awards Winning
              </span>
            </div>
          </div>
          <Link
            to={"/search"}
            className="text-2xl text-white font-semibold p-2 bg-orange-500 rounded-md"
          >
            View listings
          </Link>
        </div>

        {/* Right side */}
        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="w-[90%] lg:w-[30rem] h-[20rem] md:h-[35rem] overflow-hidden rounded-t-full border-8 border-white/20 dark:border-gray-500 shadow-xl"
          >
            <img
              src="./hero-image.png"
              alt="houses"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
