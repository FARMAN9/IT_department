import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Wellcome = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    // Split text into individual letters for animation
    const heading = headingRef.current;
    const letters = heading.innerText.split("");
    heading.innerHTML = letters
      .map((letter) => `<span>${letter}</span>`)
      .join("");

    // Animate each letter with 3D effect
    gsap.fromTo(
      heading.querySelectorAll("span"),
      {
        opacity: 0,
        y: 20,
        rotateY: 90, // Start with a 3D rotation
        transformPerspective: 1000, // Enable 3D perspective
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0, // Rotate back to normal
        stagger: 0.05,
        duration: 2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-br from-green-400 to-blue-600 text-white rounded-xl p-3">
      <h1
        ref={headingRef}
        className="lg:text-2xl sm:text-xl font-bold tracking-tight text-center"
      >
        Department of Information Technology
      </h1>

    </div>
  );
};

export default Wellcome;
