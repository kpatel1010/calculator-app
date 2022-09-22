import React, { useState, useEffect } from "react";
import Button from "./Button";
import ButtonBox from "./ButtonBox";
import Screen from "./Screen";
import { motion } from "framer-motion";
import "./wrapper.css";

function Wrapper() {
  const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "*"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  const [calc, setCalc] = useState({
    sign: "",
    nums: 0,
    result: 0,
  });

  useEffect(() => {
    document.addEventListener("keydown", detectKeyPress);
    return () => {
      document.removeEventListener("keydown", detectKeyPress);
    };
  }, [calc]);

  function handleOnClick(e) {
    e.preventDefault();
    const value = e.target.innerHTML;
    calculator(value);
  }

  function detectKeyPress(e) {
    const value = e.key;
    if (value === "Enter") {
      calculator("=");
    } else if (value === "Escape") {
      calculator("C");
    }
    calculator(value);
  }

  function calculator(value) {
    let num = 0;
    if (Number(value) >= 0 && Number(value) <= 9) {
      num = value.match(/[0-9]/)[0];
    }

    const math = (a, b, sign) => {
      switch (sign) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return a / b;
      }
    };

    switch (value) {
      case "C":
        setCalc({
          sign: "",
          nums: 0,
          result: 0,
        });
        break;
      case "+-":
        setCalc({
          ...calc,
          nums: calc.nums ? calc.nums * -1 : 0,
          result: calc.result ? calc.result * -1 : 0,
        });
        break;
      case "%":
        if (calc.nums && calc.result) {
          setCalc({
            ...calc,
            nums: (calc.nums * calc.result) / 100,
            result: calc.result,
          });
        } else {
          let nums = calc.nums ? parseFloat(calc.nums) : 0;
          let result = calc.result ? parseFloat(calc.result) : 0;
          setCalc({
            ...calc,
            nums: (nums /= Math.pow(100, 1)),
            result: (result /= Math.pow(100, 1)),
            sign: "",
          });
        }
        break;
      case ".":
        setCalc({
          ...calc,
          nums:
            calc.nums && calc.nums.toString().includes(".")
              ? calc.nums
              : calc.nums + value,
        });
        break;
      case "+":
      case "-":
      case "/":
      case "*":
        setCalc({
          ...calc,
          sign: value,
          result: !calc.result && calc.nums ? calc.nums : calc.result,
          nums: 0,
        });

        break;
      case "=":
        setCalc({
          ...calc,
          nums: math(Number(calc.result), Number(calc.nums), calc.sign),
          sign: "",
          result: 0,
        });
        break;
      case num:
        if (calc.nums.toString().length < 16) {
          setCalc({
            ...calc,
            nums:
              calc.nums === 0 && value === "0"
                ? "0"
                : calc.nums % 1 === 0
                ? Number(calc.nums + value)
                : calc.nums + value,
            result: !calc.sign ? 0 : calc.result,
          });
        }
    }
  }

  return (
    <motion.div
      className="outerlayer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        default: {
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        },
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
        },
      }}
    >
      <div className="wrapper animate__bounceInDown">
        <Screen value={calc.nums ? calc.nums : calc.result} />
        <ButtonBox>
          {btnValues.flat().map((val, i) => {
            return (
              <Button
                value={val}
                className={val === "=" ? "equals" : ""}
                key={i}
                onclick={handleOnClick}
              />
            );
          })}
        </ButtonBox>
      </div>
    </motion.div>
  );
}

export default Wrapper;
