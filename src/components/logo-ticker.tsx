'use client';

const logos = [
  'Goldman Sachs',
  'JP Morgan',
  'Bloomberg',
  'McKinsey',
  'Citadel',
  'Two Sigma',
  'Renaissance Technologies',
  'DE Shaw',
  'Bridgewater',
  'AQR Capital',
  'BlackRock',
  'Morgan Stanley',
];

export default function LogoTicker() {
  const doubled = [...logos, ...logos]; // Duplicate for seamless loop

  return (
    <div className="logo-ticker" aria-label="Trusted by researchers from leading institutions">
      <p className="logo-ticker-label">Trusted by researchers from</p>
      <div className="logo-ticker-wrapper">
        <div className="logo-ticker-track">
          {doubled.map((name, index) => (
            <span key={index} className="logo-ticker-item">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
