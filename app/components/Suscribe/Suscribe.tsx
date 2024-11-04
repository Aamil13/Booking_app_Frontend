"use client";
import React, { useState } from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = ["Time", "Money"];

type Props = {};

const Suscribe = (props: Props) => {
  const [index, setIndex] = useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div className="h-96 flex items-center w-full">
      <div className="flex flex-col  justify-center items-center h-4/5 bg-white w-full">
        <div className="flex gap-2 text-3xl font-bold w-40 ">
          <p>Save </p>
          <span className="text-green-500">
            <TextTransition springConfig={presets.wobbly}>
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
          </span>
        </div>

        <p className="max-w-xs text-center text-sm">
          Sign up and we'll send the best deals to you
        </p>
        <div className="mt-10">
          <input
            className="border-2  border-green-500 h-12 p-4 rounded-s-md outline-green-500"
            type="text"
            placeholder="Your Email Address"
          />
          <button className="bg-green-500 h-12 p-2 rounded-e-md text-white font-bold">
            Suscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Suscribe;
