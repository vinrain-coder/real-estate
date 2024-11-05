import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import data from "../../utils/accordion.jsx";

const Value = () => {
  return (
    <section id="value" className="py-10 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Left side */}
        <div className="flex-1 flex justify-center">
          <div className="border-8 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-lg transition-shadow duration-200 hover:shadow-2xl">
            <img
              src="./value.png"
              alt="Value"
              className="w-full h-[400px] object-cover transition-transform duration-200 transform hover:scale-105"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 flex flex-col items-start mt-6 md:mt-0 md:ml-10">
          <span className="text-orange-500 text-2xl font-semibold">Our Value</span>
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            Value We Give to You
          </span>
          <span className="text-gray-700 dark:text-gray-300 mt-2">
            We are always ready to help by providing the best services for you.
            We believe a good place to live can make your life better.
          </span>

          <Accordion className="mt-6 w-full">
            {data.map((item, i) => {
              const [className, setClassName] = useState(null);
              return (
                <AccordionItem
                  className={`border border-gray-300 dark:border-gray-600 rounded-lg mb-2 ${className}`}
                  uuid={i}
                  key={i}
                >
                  <AccordionItemHeading>
                    <AccordionItemButton className="flex justify-between items-center p-4 w-full bg-white dark:bg-gray-700 transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                      <AccordionItemState>
                        {({ expanded }) => {
                          if (expanded) {
                            setClassName("shadow-md");
                          } else {
                            setClassName("");
                          }
                          return null;
                        }}
                      </AccordionItemState>
                      <div className="flex items-center">
                        <div className="flex items-center justify-center bg-indigo-200 p-2 text-orange-500 rounded-full">
                          {item.icon}
                        </div>
                        <span className="ml-3 text-lg font-semibold text-gray-800 dark:text-white">
                          {item.heading}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MdOutlineArrowDropDown size={24} />
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="p-4 text-gray-600 dark:text-gray-300">
                      {item.detail}
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Value;
