'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  region: string;
  x: number;
  y: number;
  floatDelay: number;
}

interface Edge {
  source: string;
  target: string;
}

const nodes: Node[] = [
  { id: 'mit', label: 'MIT', region: 'North America', x: 580, y: 320, floatDelay: 0 },
  { id: 'eth', label: 'ETH Zurich', region: 'Europe', x: 620, y: 100, floatDelay: 0.8 },
  { id: 'imperial', label: 'Imperial College London', region: 'Europe', x: 700, y: 210, floatDelay: 1.6 },
  { id: 'lagos', label: 'University of Lagos', region: 'Africa', x: 140, y: 120, floatDelay: 2.4 },
  { id: 'tsinghua', label: 'Tsinghua University', region: 'Asia', x: 400, y: 55, floatDelay: 3.2 },
  { id: 'capetown', label: 'University of Cape Town', region: 'Africa', x: 120, y: 290, floatDelay: 4.0 },
  { id: 'iit', label: 'IIT Bombay', region: 'Asia', x: 230, y: 340, floatDelay: 4.8 },
  { id: 'sorbonne', label: 'Sorbonne', region: 'Europe', x: 470, y: 150, floatDelay: 5.6 },
];

const edges: Edge[] = [
  { source: 'mit', target: 'imperial' },
  { source: 'mit', target: 'eth' },
  { source: 'eth', target: 'imperial' },
  { source: 'imperial', target: 'sorbonne' },
  { source: 'lagos', target: 'capetown' },
  { source: 'iit', target: 'tsinghua' },
  { source: 'lagos', target: 'iit' },
  { source: 'sorbonne', target: 'eth' },
  { source: 'tsinghua', target: 'mit' },
  { source: 'capetown', target: 'imperial' },
  { source: 'sorbonne', target: 'tsinghua' },
  { source: 'iit', target: 'mit' },
];

const nodeMap = new Map(nodes.map((n) => [n.id, n]));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const svgVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.15,
    },
  },
};

const mobileGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const mobileCardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function getConnectedNodeIds(nodeId: string): Set<string> {
  const connected = new Set<string>();
  connected.add(nodeId);
  for (const edge of edges) {
    if (edge.source === nodeId) connected.add(edge.target);
    if (edge.target === nodeId) connected.add(edge.source);
  }
  return connected;
}

export function NetworkMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const connectedNodeIds =
    activeNode !== null ? getConnectedNodeIds(activeNode) : null;

  const handleMouseEnter = useCallback((nodeId: string) => {
    setActiveNode(nodeId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveNode(null);
  }, []);

  // Group nodes by region for mobile display
  const regions = ['North America', 'Europe', 'Africa', 'Asia'] as const;
  const nodesByRegion = regions.map((region) => ({
    region,
    nodes: nodes.filter((n) => n.region === region),
  }));

  return (
    <motion.section
      className="network-map-section"
      id="network"
      aria-label="Global research network"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px' }}
    >
      <motion.div variants={headerVariants}>
        <h2>
          <em>Global Network</em>
        </h2>
        <p className="network-map-intro">
          Our members represent leading institutions across four continents. This
          network of academic partnerships reflects our commitment to
          cross-disciplinary research and international collaboration in
          quantitative finance.
        </p>
      </motion.div>

      {/* Desktop: SVG network visualization */}
      <motion.div className="network-map-desktop" variants={svgVariants}>
        <svg
          ref={svgRef}
          className="network-map-svg"
          viewBox="0 0 800 400"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Network diagram showing academic institution connections"
        >
          {/* Edges */}
          {edges.map((edge, i) => {
            const source = nodeMap.get(edge.source)!;
            const target = nodeMap.get(edge.target)!;
            const isHighlighted =
              connectedNodeIds !== null &&
              connectedNodeIds.has(edge.source) &&
              connectedNodeIds.has(edge.target);

            return (
              <line
                key={`edge-${i}`}
                className={`network-map-edge${isHighlighted ? ' highlighted' : ''}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isActive = connectedNodeIds?.has(node.id) ?? false;

            return (
              <g
                key={node.id}
                className={`network-map-node${isActive ? ' active' : ''}`}
                onMouseEnter={() => handleMouseEnter(node.id)}
                onMouseLeave={handleMouseLeave}
                style={{
                  animation: `nodeFloat 4s ease-in-out ${node.floatDelay}s infinite`,
                }}
              >
                <circle
                  className="network-map-node-circle"
                  cx={node.x}
                  cy={node.y}
                  r={6}
                />
                <text
                  className="network-map-node-label"
                  x={node.x}
                  y={node.y + 18}
                  textAnchor="middle"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Mobile: Card grid layout (hidden on desktop) */}
      <motion.div
        className="network-map-mobile"
        variants={mobileGridVariants}
      >
        {nodesByRegion.map((group) => (
          <div key={group.region} className="network-map-region">
            <div className="network-map-region-label">{group.region}</div>
            <div className="network-map-region-nodes">
              {group.nodes.map((node) => (
                <motion.div
                  key={node.id}
                  className="network-map-card"
                  variants={mobileCardVariants}
                >
                  <div className="network-map-card-icon">
                    <Globe size={18} />
                  </div>
                  <div className="network-map-card-info">
                    <span className="network-map-card-name">{node.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default NetworkMap;
