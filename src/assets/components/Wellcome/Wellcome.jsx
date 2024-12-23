import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Wellcome = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    // Split text into individual letters for animation
    const heading = headingRef.current;
    const letters = heading.innerText.split("");
    heading.innerHTML = letters
      .map((letter) => `<span style="transform-style: preserve-3d;">${letter}</span>`)
      .join("");

    // Animate each letter with 3D effect
    gsap.fromTo(
      heading.querySelectorAll("span"),
      {
        opacity: 0,
        y: 20,
        rotateY: 90, // Start with a 3D rotation
        rotateX: 90, // Start with a 3D rotation
        transformPerspective: 1000, // Enable 3D perspective
        scale: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0, // Rotate back to normal
        rotateX: 0, // Rotate back to normal
        scale: 1,
        stagger: 0.05,
        duration: 2,
        ease: "power3.out",
      }
    );

    // Add a rotation animation to the whole heading
    gsap.fromTo(
      heading,
      {
        rotateX: 90,
        opacity: 0,
      },
      {
        rotateX: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1
        ref={headingRef}
        className="lg:text-3xl sm:text-2xl font-bold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-600"
      >
        Department of Information Technology
      </h1>
      <span className="block text-lg font-semibold tracking-tighter mt-2 text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-600">
        welcomes you
      </span>

    </div>
  );
};

export default Wellcome;
