import { useState } from 'react';
import { parseExpression } from '../utils/parser';
import { eulerMethod } from '../utils/methods';
import Plot from 'react-plotly.js';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function Solver() {
  const [expr, setExpr] = useState("sin(x) - y^2 + log(x)");
  const [data, setData] = useState([]);

  const solve = () => {
    const f = parseExpression(expr);
    if (!f) return alert("Invalid equation");
    const result = eulerMethod(f, 0, 1.1, 0.1, 10);
    setData(result);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Numerical Methods for Solving ODEs</h1>
      <div className="flex items-center gap-2 mb-4">
        <input type="text" value={expr} onChange={(e) => setExpr(e.target.value)}
          className="border border-gray-300 px-3 py-2 w-full" />
        <button onClick={solve}
          className="bg-blue-600 text-white px-5 py-2 rounded">Solve</button>
      </div>
      <div className="text-xl mb-4">
        <BlockMath math={`\\frac{dy}{dx} = ${expr.replaceAll('^', '**')}`} />
      </div>
      {data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <table className="table-auto border-collapse border border-gray-400">
            <thead>
              <tr><th className="border p-2">Step</th><th className="border p-2">xₙ</th><th className="border p-2">yₙ</th><th className="border p-2">f(xₙ, yₙ)</th></tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{i}</td>
                  <td className="border px-2 py-1">{row.x.toFixed(2)}</td>
                  <td className="border px-2 py-1">{row.y.toFixed(3)}</td>
                  <td className="border px-2 py-1">{row.fx?.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Plot data={[{ x: data.map(p => p.x), y: data.map(p => p.y), type: 'scatter', mode: 'lines+markers', marker: { color: 'blue' } }]} layout={{ width: 450, height: 300, title: 'Solution Graph' }} />
        </div>
      )}
    </div>
  );
}