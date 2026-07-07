import { useRef } from "react";
import gsap from "gsap";
// Variants for Tailwind class sets
const variantStyles: Record<string, string> = {
  main: "bg-[#242C3100]  py-1 px-3   cursor-pointer ",
};

// Define the props type
interface ButtonProps {
  variant?: keyof typeof variantStyles;
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = "main", text }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const mouseHandlerEnter = () => {

    if (!buttonRef.current) return;

    gsap.to(buttonRef.current.querySelectorAll(".firstDiv span"), {
      y: "-118%",
      opacity: 1,
      rotateX: 0,
      duration: 0.2,
      // stagger: 0.02,
    });

    gsap.to(buttonRef.current.querySelectorAll(".secondDiv span"), {
      y: -30,
      opacity: 1,
      rotateX: 0,
      duration: 0.2,
      // stagger: 0.02,
    });
  };

  const mouseHandlerLeave = () => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current.querySelectorAll(".firstDiv span"), {
      y: "0%",
      opacity: 1,
      // rotateX: -90,
      duration: 0.4,
      // stagger: 0.02,
    });

    gsap.to(buttonRef.current.querySelectorAll(".secondDiv span"), {
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration: 0.4,
      // stagger: 0.02,
    });
  };

  return (
    <button
      ref={buttonRef}
      className={`${variantStyles[variant]} relative overflow-hidden`}
      onMouseEnter={mouseHandlerEnter}
      onMouseLeave={mouseHandlerLeave}
      aria-label={text}
    >
      {/* Animated top layer */}
      <div className="absolute top-full flex items-center justify-center firstDiv">
        {text.split("").map((char, key) => (
          <span className="inline-block" key={key}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Static visible layer */}
      <div className="relative secondDiv">
        {text.split("").map((char, key) => (
          <span className="inline-block" key={key}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </button>
  );
};
