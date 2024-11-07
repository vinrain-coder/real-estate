import React from "react";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";

const Contact = () => {
  return (
    <div id="contact-us" className="py-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 gap-4 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        {/* Left Side */}
        <div className="flex flex-col w-full md:w-1/2 space-y-6">
          <h3 className="text-orange-500 text-2xl">Our Contact Us</h3>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Easy to contact us
          </h2>

          {/* Contact Modes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* Contact Mode - Call */}
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <MdCall
                  size={25}
                  className="text-indigo-500 dark:text-indigo-400"
                />
                <div>
                  <span className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Call
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    1234567890
                  </span>
                </div>
              </div>
              <button className="w-full mt-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                Call now
              </button>
            </div>

            {/* Contact Mode - Chat */}
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <BsFillChatDotsFill
                  size={25}
                  className="text-indigo-500 dark:text-indigo-400"
                />
                <div>
                  <span className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Chat
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    1234567890
                  </span>
                </div>
              </div>
              <button className="w-full mt-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                Chat now
              </button>
            </div>

            {/* Contact Mode - Video Call */}
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <BsFillChatDotsFill
                  size={25}
                  className="text-indigo-500 dark:text-indigo-400"
                />
                <div>
                  <span className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Video Call
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    1234567890
                  </span>
                </div>
              </div>
              <button className="w-full mt-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                Video Call now
              </button>
            </div>

            {/* Contact Mode - Message */}
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <HiChatBubbleBottomCenter
                  size={25}
                  className="text-indigo-500 dark:text-indigo-400"
                />
                <div>
                  <span className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Message
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    1234567890
                  </span>
                </div>
              </div>
              <button className="w-full mt-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                Message now
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative md:w-1/2 flex justify-center">
          <img
            src="./contact.jpg"
            alt="Contact Us"
            className="w-full max-w-md md:h-[400px] rounded-lg border border-gray-300 dark:border-gray-700"
          />
          <p className="absolute top-[45%] px-4 items-center justify-center text-white text-lg font-semibold">
            We are always ready to help by providing the best services for you.
            We believe a good place to live can make your life better.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
