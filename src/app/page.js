'use client'
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [result, setResult] = useState('');
  const [expression, setExpression] = useState('');

  const cursorRef = useRef(null);
  var timeout;
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.top = `${e.pageY}px`;
        cursorRef.current.style.left = `${e.pageX}px`;
        cursorRef.current.style.display = "block";

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cursorRef.current.style.display = "none";
        }, 1000);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const ans = eval(expression).toString();
        setResult(ans);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') { 
      setResult('');
      setExpression('');
    } else if(value === 'Del'){
      setExpression((prevExpression) => prevExpression.slice(0, -1));
    }else {
      setExpression((prevExpression) => prevExpression + value);
    }
  };

  useEffect(() => {
    console.log(result);
  }, [result]);

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C','Del'
  ];

  return (
    <div className="flex justify-center min-h-screen">

      <div className="cursor" ref={cursorRef}>
      </div>

      <main className="flex flex-col p-4 sm:p-16 md:p-24 w-full md:w-8/12 lg:w-6/12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-left">Calculator</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <input
            type="text"
            className="w-full mb-2 text-right text-2xl mb-2"
            value={expression}
            readOnly
          />
          {result ? 
            <input 
              type="text" 
              className="w-full text-4xl mb-4 text-right"
              value={`=${result}`}
              readOnly
            />
            : <div></div>}
          <div className="grid grid-cols-4 gap-4">
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className={`text-4xl p-2 rounded-lg shadow-lg min-w-[70px] ${
                  ['/', '*', '-', '+', '='].includes(btn) ? 'operation-button' : 
                  btn ==='C' ? 'clear-button': 'bg-gray-300 num-button'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
