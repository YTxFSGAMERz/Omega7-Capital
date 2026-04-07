'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import ScrollReveal from './scroll-reveal';

function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

interface AnimatedNumberProps {
  value: number;
  format: 'currency' | 'percent';
  duration?: number;
}

function AnimatedNumber({ value, format, duration = 0.4 }: AnimatedNumberProps) {
  const formatted = format === 'currency' ? formatCurrency(value) : formatPercent(value);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={formatted}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
      >
        {formatted}
      </motion.span>
    </AnimatePresence>
  );
}

export function InvestmentCalculator() {
  const [investment, setInvestment] = useState(500_000);
  const [years, setYears] = useState(7);
  const [returnRate, setReturnRate] = useState(15);

  const handleInvestmentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestment(Number(e.target.value));
  }, []);

  const handleYearsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setYears(Number(e.target.value));
  }, []);

  const handleReturnRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setReturnRate(Number(e.target.value));
  }, []);

  const results = useMemo(() => {
    const rate = returnRate / 100;
    const totalValue = investment * Math.pow(1 + rate, years);
    const totalReturn = ((totalValue - investment) / investment) * 100;
    return { totalValue, totalReturn, annualizedReturn: returnRate };
  }, [investment, years, returnRate]);

  const yearlyData = useMemo(() => {
    const rate = returnRate / 100;
    const data: { year: number; value: number }[] = [];
    let cumulative = investment;
    for (let i = 1; i <= years; i++) {
      cumulative = cumulative * (1 + rate);
      data.push({ year: i, value: cumulative });
    }
    return data;
  }, [investment, years, returnRate]);

  const maxValue = Math.max(...yearlyData.map((d) => d.value));

  return (
    <ScrollReveal>
      <section className="calculator-section" aria-label="Investment return calculator">
        <div className="calculator-section-header">
          <div className="calculator-icon-wrap">
            <Calculator size={20} />
          </div>
          <h2 className="calculator-heading">
            <em>Investment Return Calculator</em>
          </h2>
          <p className="calculator-description">
            Estimate the potential growth of your investment over time with our
            interactive calculator. Adjust the parameters below to model
            different scenarios.
          </p>
        </div>

        <div className="calculator-grid">
          <div className="calculator-controls">
            <div className="calculator-sliders">
              <div className="calculator-slider-group">
                <div className="calculator-slider-label-row">
                  <span className="calculator-slider-label">Initial Investment</span>
                  <span className="calculator-slider-value">{formatCurrency(investment)}</span>
                </div>
                <input
                  type="range"
                  className="calculator-slider-input"
                  min={50000}
                  max={2000000}
                  step={10000}
                  value={investment}
                  onChange={handleInvestmentChange}
                  aria-label="Initial investment amount"
                />
                <div className="calculator-slider-range">
                  <span>$50K</span>
                  <span>$2M</span>
                </div>
              </div>

              <div className="calculator-slider-group">
                <div className="calculator-slider-label-row">
                  <span className="calculator-slider-label">Investment Period</span>
                  <span className="calculator-slider-value">{years} years</span>
                </div>
                <input
                  type="range"
                  className="calculator-slider-input"
                  min={3}
                  max={10}
                  step={1}
                  value={years}
                  onChange={handleYearsChange}
                  aria-label="Investment period in years"
                />
                <div className="calculator-slider-range">
                  <span>3 yrs</span>
                  <span>10 yrs</span>
                </div>
              </div>

              <div className="calculator-slider-group">
                <div className="calculator-slider-label-row">
                  <span className="calculator-slider-label">Expected Annual Return</span>
                  <span className="calculator-slider-value">{returnRate}%</span>
                </div>
                <input
                  type="range"
                  className="calculator-slider-input"
                  min={5}
                  max={30}
                  step={1}
                  value={returnRate}
                  onChange={handleReturnRateChange}
                  aria-label="Expected annual return rate"
                />
                <div className="calculator-slider-range">
                  <span>5%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="calculator-results">
            <motion.div
              className="calculator-result-card calculator-highlight"
              variants={resultCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="calculator-result-icon-wrap calculator-result-icon-primary">
                <DollarSign size={18} />
              </div>
              <div className="calculator-result-content">
                <span className="calculator-result-value">
                  <AnimatedNumber value={results.totalValue} format="currency" />
                </span>
                <span className="calculator-result-label">Total Value</span>
              </div>
            </motion.div>

            <motion.div
              className="calculator-result-card"
              variants={resultCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="calculator-result-icon-wrap">
                <TrendingUp size={18} />
              </div>
              <div className="calculator-result-content">
                <span className="calculator-result-value">
                  <AnimatedNumber value={results.totalReturn} format="percent" />
                </span>
                <span className="calculator-result-label">Total Return</span>
              </div>
            </motion.div>

            <motion.div
              className="calculator-result-card"
              variants={resultCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="calculator-result-icon-wrap">
                <TrendingUp size={18} />
              </div>
              <div className="calculator-result-content">
                <span className="calculator-result-value">
                  <AnimatedNumber value={results.annualizedReturn} format="percent" />
                </span>
                <span className="calculator-result-label">Annualized Return</span>
              </div>
            </motion.div>

            <div className="calculator-chart">
              <div className="calculator-chart-label">Year-by-year growth projection</div>
              <div className="calculator-chart-bars">
                {yearlyData.map((item) => (
                  <div className="calculator-chart-bar-wrap" key={item.year}>
                    <motion.div
                      className="calculator-chart-bar"
                      initial={{ height: 0 }}
                      animate={{
                        height: `${Math.max((item.value / maxValue) * 100, 4)}%`,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay: item.year * 0.04,
                      }}
                    />
                    <span className="calculator-chart-label-year">
                      Y{item.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="calculator-disclaimer">
          This calculator provides illustrative estimates only and does not
          constitute financial advice. Past performance is not indicative of
          future results.
        </p>
      </section>
    </ScrollReveal>
  );
}

const resultCardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
