"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Stethoscope,
  Building2,
  DollarSign,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function StatsGrid({ stats }) {
  const statCards = [
    {
      icon: Users,
      title: "Total Patients",
      count: stats.totalPatients.count,
      label: stats.totalPatients.change ? `${stats.totalPatients.change} vs yesterday` : null,
      variant: "primary",
      linkText: "View Details",
    },
    {
      icon: Stethoscope,
      title: "Total Doctors",
      count: stats.totalDoctors.count,
      label: stats.totalDoctors.change ? `${stats.totalDoctors.change} vs yesterday` : null,
      variant: "secondary",
      linkText: "View Details",
    },
    {
      icon: Building2,
      title: "Active Outlets",
      count: stats.activeOutlets.count,
      label: stats.activeOutlets.change ? `${stats.activeOutlets.change} vs yesterday` : null,
      variant: "tertiary",
      linkText: "View Details",
    },
    {
      icon: DollarSign,
      title: "Today's Revenue",
      count: `${stats.todaysRevenue.currency} ${stats.todaysRevenue.count}`,
      label: stats.todaysRevenue.change ? `${stats.todaysRevenue.change} vs yesterday` : null,
      variant: "quaternary",
      linkText: "View Details",
    },
    {
      icon: CheckCircle,
      title: "Pending Approvals",
      count: stats.pendingApprovals.count,
      label: null,
      variant: "quinary",
      linkText: "View all",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.35,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      className="stats-grid"
      initial="hidden"
      animate="visible"
    >
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={index}
            className={`stat-card ${stat.variant}`}
            custom={index}
            variants={itemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div className="stat-card-header">
              <div className="stat-icon">
                <IconComponent size={22} />
              </div>
              <div className="stat-info">
                <h3 className="stat-title">{stat.title}</h3>
                <p className="stat-count">{stat.count}</p>
                {stat.label && <p className="stat-label">{stat.label}</p>}
              </div>
            </div>
            <motion.div whileHover={{ opacity: 0.75 }}>
              <Link href="#" className="stat-link">
                {stat.linkText}
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}