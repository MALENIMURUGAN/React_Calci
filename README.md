# Ex04 Simple Calculator - React Project
## Date:14/03/2026

## AIM
To  develop a Simple Calculator using React.js with clean and responsive design, ensuring a smooth user experience across different screen sizes.

## ALGORITHM
### STEP 1
Create a React App.

### STEP 2
Open a terminal and run:
  <ul><li>npx create-react-app simple-calculator</li>
  <li>cd simple-calculator</li>
  <li>npm start</li></ul>

### STEP 3
Inside the src/ folder, create a new file Calculator.js and define the basic structure.

### STEP 4
Plan the UI: Display screen, number buttons (0-9), operators (+, -, *, /), clear (C), and equal (=).

### STEP 5
Create a new file Calculator.css in src/ and add the styling.

### STEP 6
Open src/App.js and modify it.

### STEP 7
Start the development server.
  npm start

### STEP 8
Open http://localhost:3000/ in the browser.

### STEP 9
Test the calculator by entering numbers and operations.

### STEP 10
Fix styling issues and refine content placement.

### STEP 11
Deploy the website.

### STEP 12
Upload to GitHub Pages for free hosting.

## PROGRAM
```
App.js
import React from 'react';
import Calculator from './Calculator';

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;

Calculator.js
import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [current, setCurrent] = useState('0');
  const [prev, setPrev] = useState('');
  const [operator, setOperator] = useState(null);
  const [expression, setExpression] = useState('');
  const [shouldReset, setShouldReset] = useState(false);

  const inputDigit = (digit) => {
    if (shouldReset) {
      setCurrent(digit);
      setShouldReset(false);
    } else {
      setCurrent(current === '0' ? digit : current.length < 12 ? current + digit : current);
    }
  };

  const inputDot = () => {
    if (shouldReset) { setCurrent('0.'); setShouldReset(false); return; }
    if (!current.includes('.')) setCurrent(current + '.');
  };

  const setOp = (op) => {
    if (operator && !shouldReset) {
      compute(true, op);
      return;
    }
    setPrev(current);
    setOperator(op);
    setShouldReset(true);
    const syms = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    setExpression(current + ' ' + syms[op]);
  };

  const compute = (chain = false, nextOp = null) => {
    if (!operator || !prev) return;
    const a = parseFloat(prev);
    const b = parseFloat(current);
    let result;
    if (operator === '+') result = a + b;
    else if (operator === '-') result = a - b;
    else if (operator === '*') result = a * b;
    else if (operator === '/') result = b === 0 ? null : a / b;

    const syms = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    const resultStr = result === null ? 'Error' : parseFloat(result.toFixed(10)).toString();

    if (!chain) {
      setExpression(prev + ' ' + syms[operator] + ' ' + current + ' =');
      setOperator(null);
      setPrev('');
    } else {
      setPrev(resultStr);
      setOperator(nextOp);
      setExpression(resultStr + ' ' + syms[nextOp]);
    }
    setCurrent(resultStr);
    setShouldReset(true);
  };

  const clearAll = () => {
    setCurrent('0'); setPrev(''); setOperator(null);
    setExpression(''); setShouldReset(false);
  };

  const signToggle = () => {
    if (current !== 'Error') {
      setCurrent(current.startsWith('-') ? current.slice(1) : '-' + current);
    }
  };

  const percent = () => {
    if (current !== 'Error') setCurrent((parseFloat(current) / 100).toString());
  };

  const syms = { '+': '+', '-': '−', '*': '×', '/': '÷' };

  return (
    <div className="calculator-wrapper">
      <h1 className="calc-title">Ex.04 &mdash; Simple Calculator</h1>
      <div className="calculator">
        <div className="screen">
          <div className="expression">{expression}</div>
          <div className="display">{current}</div>
        </div>
        <div className="buttons">
          <button className="btn btn-clear" onClick={clearAll}>C</button>
          <button className="btn btn-op" onClick={signToggle}>+/-</button>
          <button className="btn btn-op" onClick={percent}>%</button>
          <button className={`btn btn-op ${operator === '/' ? 'active-op' : ''}`} onClick={() => setOp('/')}>÷</button>

          {[7, 8, 9].map(n => (
            <button key={n} className="btn btn-num" onClick={() => inputDigit(String(n))}>{n}</button>
          ))}
          <button className={`btn btn-op ${operator === '*' ? 'active-op' : ''}`} onClick={() => setOp('*')}>×</button>

          {[4, 5, 6].map(n => (
            <button key={n} className="btn btn-num" onClick={() => inputDigit(String(n))}>{n}</button>
          ))}
          <button className={`btn btn-op ${operator === '-' ? 'active-op' : ''}`} onClick={() => setOp('-')}>−</button>

          {[1, 2, 3].map(n => (
            <button key={n} className="btn btn-num" onClick={() => inputDigit(String(n))}>{n}</button>
          ))}
          <button className={`btn btn-op ${operator === '+' ? 'active-op' : ''}`} onClick={() => setOp('+')}>+</button>

          <button className="btn btn-num btn-zero" onClick={() => inputDigit('0')}>0</button>
          <button className="btn btn-num" onClick={inputDot}>.</button>
          <button className="btn btn-eq" onClick={() => compute()}>=</button>
        </div>
      </div>
      <footer className="calc-footer">
        <span>Maleni M &nbsp;|&nbsp; Reg. No: 212223040110</span>
      </footer>
    </div>
  );
}

export default Calculator;

Calculator.css
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #0d0f14;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calculator-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

.calc-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 4px;
  color: #4a5568;
  text-transform: uppercase;
}

.calculator {
  background: #111318;
  border: 1px solid #2a2d38;
  border-radius: 18px;
  padding: 1.5rem;
  width: 300px;
}

.screen {
  background: #0a0c10;
  border: 1px solid #1e2130;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  margin-bottom: 1.2rem;
  text-align: right;
  min-height: 82px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.expression {
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  color: #4a5568;
  min-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.display {
  font-family: 'Share Tech Mono', monospace;
  font-size: 32px;
  color: #00e5c0;
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.btn {
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #2a2d38;
  border-radius: 10px;
  height: 58px;
  cursor: pointer;
  transition: background 0.1s, transform 0.08s, border-color 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1d26;
  color: #c8cdd8;
}

.btn:active {
  transform: scale(0.93);
}

.btn-num:hover {
  background: #22263a;
  border-color: #3a4060;
}

.btn-op {
  background: #141829;
  color: #00b8a0;
  border-color: #1a2540;
}

.btn-op:hover,
.btn-op.active-op {
  background: #1a2540;
  border-color: #00b8a0;
}

.btn-clear {
  background: #1a1020;
  color: #f07070;
  border-color: #2a1828;
}

.btn-clear:hover {
  background: #2a1828;
  border-color: #f07070;
}

.btn-eq {
  background: #003d36;
  color: #00e5c0;
  border-color: #00805a;
}

.btn-eq:hover {
  background: #005a50;
  border-color: #00e5c0;
}

.btn-zero {
  grid-column: span 2;
}

.calc-footer {
  font-family: 'Rajdhani', sans-serif;
  font-size: 12px;
  color: #4a5568;
  letter-spacing: 2px;
  text-align: center;
}

@media (max-width: 360px) {
  .calculator { width: 260px; padding: 1rem; }
  .display { font-size: 26px; }
  .btn { height: 50px; font-size: 14px; }
}

index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```


## OUTPUT
![alt text](<Screenshot 2026-03-14 085927.png>)

## RESULT
The program for developing a simple calculator in React.js is executed successfully.
