'use client';

import { motion } from 'framer-motion';

interface ActivityItem {
  emoji: string;
  title: string;
  description: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    emoji: '📄',
    title: 'New Working Paper Published',
    description: 'Monte Carlo Methods for Asian Option Pricing',
    time: '2 days ago',
  },
  {
    emoji: '👥',
    title: 'New Member Joined',
    description: 'Dr. Sarah Chen from ETH Zurich',
    time: '5 days ago',
  },
  {
    emoji: '🎓',
    title: 'Research Seminar Completed',
    description: 'Machine Learning in Volatility Forecasting',
    time: '1 week ago',
  },
  {
    emoji: '🏆',
    title: 'Conference Presentation',
    description: 'QuantMinds Europe 2025 — Amsterdam',
    time: '2 weeks ago',
  },
  {
    emoji: '📊',
    title: 'Quarterly Research Report',
    description: 'Q4 2024 Performance Analysis Released',
    time: '3 weeks ago',
  },
  {
    emoji: '🤝',
    title: 'Partnership Established',
    description: 'Collaboration with MIT Quantitative Finance Lab',
    time: '1 month ago',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function ActivityFeed() {
  return (
    <section className="activity-feed-section" aria-label="Recent activity">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px 0px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <h2 className="activity-feed-heading">
          <em>Recent Activity</em>
        </h2>
        <p className="activity-feed-intro">
          The latest updates and milestones from across the collective.
        </p>
      </motion.div>

      <div className="activity-feed-timeline">
        <motion.div
          className="activity-feed-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px 0px' }}
        >
          {activities.map((activity, index) => (
            <motion.article
              key={index}
              className="activity-feed-item"
              variants={itemVariants}
            >
              <div className="activity-feed-icon">{activity.emoji}</div>
              <div className="activity-feed-content">
                <div className="activity-feed-title">{activity.title}</div>
                <div className="activity-feed-desc">{activity.description}</div>
                <div className="activity-feed-time">{activity.time}</div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ActivityFeed;
