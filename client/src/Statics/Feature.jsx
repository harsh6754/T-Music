import React, { useState } from "react";
import { motion } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";

function Feature({ icon, title }) {
  const variant = {
    true: {
      transform: "scale(1)",
    },
    false: {
      transform: "scale(0.5)",
    },
  };
  const [elementIsVisible, setElementIsVisible] = useState(false);

  return (
    <VisibilitySensor onChange={(isVisible) => setElementIsVisible(isVisible)}>
      <div className="feature flex items-center justify-center flex-col relative text-center mx-4 md:mx-12">
        {/* icon */}
        <motion.div
          variants={variant}
          transition={{
            duration: 1,
            type: "ease-out",
          }}
          animate={`${elementIsVisible}`}
          className="icon bg-[#081730] rounded-2xl p-4"
        >
          <img
            src={require(`../Images/${icon}.png`)}
            alt=""
            className="w-12 md:w-[3rem]"
          />
        </motion.div>

        <span className="mt-3 md:mt-5">{title}</span>

        <span className="text-[#707070] mt-2 md:mt-4">
          Nunc elementum, dolor vitae lacinia pulvinar, augue felis scelerisque
          libero, sit amet laoreet lorem.
        </span>
      </div>
    </VisibilitySensor>
  );
}

export default Feature;
