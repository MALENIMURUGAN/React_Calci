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