import React from "react";

const GetStarted = () => {
  return (
    <div id="get-started" className="py-10">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6 p-8 bg-sky-100 border border-blue-200 rounded-lg shadow-lg text-center">
          <h2 className="text-blue-800 text-2xl font-semibold">Get started with FindHouse</h2>
          <p className="text-gray-600">
            Subscribe and find super attractive price quotes from us.
            <br />
            Find your residence soon.
          </p>
          <a
            href="#"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
