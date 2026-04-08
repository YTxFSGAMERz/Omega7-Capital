'use client';

const keywords = [
  'Stochastic Calculus',
  'Option Pricing',
  'Monte Carlo Methods',
  'Machine Learning',
  'Risk Management',
  'Derivatives',
  'Portfolio Theory',
  'Time Series Analysis',
  'Volatility Modeling',
  'Statistical Arbitrage',
  'Numerical Methods',
  'Interest Rate Models',
  'Bayesian Inference',
  'Algorithmic Trading',
];

export default function MarqueeTicker() {
  const doubled = [...keywords, ...keywords]; // Duplicate for seamless loop

  return (
    <div className="marquee-ticker" aria-label="Research areas">
      <div className="marquee-ticker-track">
        {doubled.map((keyword, index) => (
          <span key={index} className="marquee-ticker-item">
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
