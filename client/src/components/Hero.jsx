import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative px-4 pb-12 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="flex flex-col md:flex-row items-center md:justify-between p-6 md:p-10 max-w-7xl space-y-12 md:space-y-0 gap-10">
        {/* Left side */}
        <div className="flex flex-row gap-6 md:gap-8 relative items-start">
          {/* Line on the Left */}
          <div className="flex flex-col justify-center items-center">
            <div className="w-5 h-5 rounded-full bg-orange-500 md:mt-2" />
            <div className="w-1 h-48 sm:h-56 md:h-80 lg:h-96 orange-gradient" />
          </div>

          {/* Content on the Right */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 -mt-1">
            {/* Animated Heading */}
            <motion.div>
              <motion.h1
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  type: "ease-in",
                }}
                className="font-black text-white lg:text-[60px] md:text-[50px] sm:text-[40px] xs:text-[30px] text-[24px] leading-tight"
              >
                Discover <br /> Most Suitable Property
              </motion.h1>
            </motion.div>

            {/* Subtext */}
            <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-4">
              <span className="text-[#dfd9ff] font-medium lg:text-[24px] md:text-[20px] sm:text-[18px] text-[16px] lg:leading-[36px] md:leading-[32px] leading-[28px]">
                Find a variety of properties that suit you easily
              </span>
              <span className="text-[#dfd9ff] font-medium lg:text-[24px] md:text-[20px] sm:text-[18px] text-[16px] lg:leading-[36px] md:leading-[32px] leading-[28px]">
                Forget all difficulties in finding a residence for you
              </span>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-between md:justify-start gap-4 md:gap-6 text-center">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                  <CountUp start={8800} end={9000} duration={4} />{" "}
                  <span className="text-orange-400">+</span>
                </span>
                <span className="text-xs sm:text-sm md:text-base text-gray-200">
                  Premium Products
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                  <CountUp start={1950} end={2000} duration={4} />{" "}
                  <span className="text-orange-400">+</span>
                </span>
                <span className="text-xs sm:text-sm md:text-base text-gray-200">
                  Happy Customers
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                  <CountUp end={28} />{" "}
                  <span className="text-orange-400">+</span>
                </span>
                <span className="text-xs sm:text-sm md:text-base text-gray-200">
                  Awards Winning
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to={"/search"}
              className="mt-4 md:mt-8 w-full text-center text-lg sm:text-xl md:text-2xl font-semibold p-3 border-2 border-orange-400 rounded-md hover:bg-orange-400 transition"
            >
              View listings
            </Link>
          </div>
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
