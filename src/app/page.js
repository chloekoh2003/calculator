'use client'
import { useState } from "react"
import Image from 'next/image'

export default function Home() {
  const [result, setResult] = useState('')
  const [expression, setExpression] = useState('')

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(expression).toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') { 
      setResult('');
      setExpression('');
    } else {
      setExpression((prevExpression) => prevExpression + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <div className="flex justify-center min-h-screen">
      <main className="flex flex-col p-24 w-6/12">
        <h1 className="text-4xl font-bold mb-10 text-left">Calculator</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <input 
            type="text" 
            className="w-full text-4xl border-b-2 border-gray-200 font-bold mb-2"
            value={result}
            readOnly
          />
          <input
            type="text"
            className="w-full mb-2 text-md"
            value={expression}
            readOnly
          />
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className={`text-4xl p-2 rounded-lg shadow-lg ${
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
