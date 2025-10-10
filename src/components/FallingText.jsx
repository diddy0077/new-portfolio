import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FallingText = () => {
  const [texts, setTexts] = useState([]);

  const textOptions = [
    'const [state, setState] = useState()',
    'function Component() { return <div/> }',
    '<div className="flex items-center">',
    'const handleClick = () => {}',
    '.bg-gradient-to-r { background: linear-gradient() }',
    'useEffect(() => {}, [])',
    'import React from "react"',
    'export default function App()',
    'const map = array.map(item => item)',
    'addEventListener("click", () => {})',
    'npm install react-icons',
    'git commit -m "feat: add feature"',
    'const { data } = useQuery()',
    'position: absolute; top: 0;',
    'flex: 1 1 auto; display: flex;',
    'const promise = new Promise()',
    'async function fetchData() {}',
    'useContext(ThemeContext)',
    '<button onClick={handleClick}>',
    'margin: 0 auto; width: 100%;',
    'const [count, setCount] = useState(0)',
    'filter: blur(10px); opacity: 0.8;',
    'const reducer = (state, action) => {}',
    'localStorage.setItem("key", value)',
    '<form onSubmit={handleSubmit}>',
    'border-radius: 8px; box-shadow: 0 4px 6px;',
    'const ref = useRef(null)',
    'fetch("/api/data").then(res => res.json())'
  ];

  useEffect(() => {
    const generateTexts = () => {
      const newTexts = [];
      for (let i = 0; i < 25; i++) {
        newTexts.push({
          id: i,
          text: textOptions[Math.floor(Math.random() * textOptions.length)],
          x: Math.random() * 100, // Random horizontal position (0-100%)
          delay: Math.random() * 20, // Random delay (0-20s)
          duration: 15 + Math.random() * 10, // Random duration (15-25s)
          size: 0.8 + Math.random() * 0.4, // Random size (0.8-1.2)
        });
      }
      setTexts(newTexts);
    };

    generateTexts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {texts.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-cyan-400/40 font-mono font-medium select-none whitespace-nowrap"
          style={{
            left: `${item.x}%`,
            fontSize: `${item.size * 0.8}rem`,
          }}
          initial={{ y: '-10vh', opacity: 0 }}
          animate={{
            y: '110vh',
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingText;