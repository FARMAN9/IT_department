import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Welcome = () => {
  const welcomeRef = [
    {
      lang: "en",
      message: "Department of Information Technology Welcomes You",
      style: "text-3xl"
    },
    {
      lang: "ur",
      message: "انفارمیشن ٹیکنالوجی کا شعبہ آپ کا استقبال کرتا ہے",
      style: "text-2xl",
      rtl: true
    },
    {
      lang: "hi", 
      message: "सूचना प्रौद्योगिकी विभाग आपका स्वागत करता है",
      style: "text-2xl"
    },
    {
      lang: "ks",
      message: "اطلاعات ٹیکنالوجی محکمہ چھہ توہند خیر مقدم",
      style: "text-2xl",
      rtl: true
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const headingRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const animateMessage = async () => {
      const current = welcomeRef[currentIndex];
      const heading = headingRef.current;
      
      // Clear previous content
      gsap.killTweensOf(heading);
      heading.innerHTML = current.message;
      heading.style.direction = current.rtl ? 'rtl' : 'ltr';
      heading.style.fontFamily = current.rtl ? "'Noto Naskh Arabic', sans-serif" : 'inherit';

      // Split text into spans
      const letters = current.message.split("");
      heading.innerHTML = letters.map(l => `<span>${l}</span>`).join("");

      // Animate in
      await gsap.fromTo(heading.children, {
        opacity: 0,
        y: 20,
        rotateX: -45
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.out"
      }).then(() => {
        // Wait 3 seconds then animate out
        timeoutRef.current = setTimeout(() => {
          gsap.to(heading.children, {
            opacity: 0,
            y: -20,
            stagger: 0.03,
            duration: 0.6,
            ease: "power3.in",
            onComplete: () => {
              setCurrentIndex((prev) => (prev + 1) % welcomeRef.length);
            }
          });
        }, 3000);
      });
    };

    animateMessage();

    return () => {
      clearTimeout(timeoutRef.current);
      gsap.killTweensOf(headingRef.current);
    };
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <h1
        ref={headingRef}
        className={`${welcomeRef[currentIndex].style} font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-600`}
      />
    </div>
  );
};

export default Welcome;