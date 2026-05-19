// TestimonialsSection.jsx
"use client";

import { testimonials } from "@/constants/siteData";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/common/Section";
import "./TestimonialsSection.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const springTransition = { type: "spring", stiffness: 300, damping: 20 };
const statSpringTransition = { type: "spring", stiffness: 200, damping: 15 };

export default function TestimonialsSection() {
  return (
    <Section id="testimonials">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader
          label="Patient Stories"
          title="Real Patients, <span class='section-heading-accent'>Real Transformations</span>"
          subtitle="Thousands of families across Bangladesh trust Renova Life Care with their most precious asset — their health."
        />
      </motion.div>

      {/* Testimonials Grid */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {testimonials.map((t, index) => (
          <motion.div
            key={t.id}
            className="testimonial-card bg-white rounded-2xl p-4 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col gap-3 sm:gap-5 h-full border border-slate-100"
            variants={fadeInUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {/* Stars */}
            <motion.div
              className="flex gap-1"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill={i < t.rating ? "#f59e0b" : "none"}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                  className="sm:w-4 sm:h-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </motion.svg>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              className="text-slate-600 text-xs sm:text-sm leading-relaxed flex-1 italic"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              &ldquo;{t.review}&rdquo;
            </motion.blockquote>

            {/* Author */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-100"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="avatar-spring w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0"
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
                transition={springTransition}
              >
                <span className="text-primary font-bold text-xs sm:text-sm">
                  {t.name.charAt(0)}
                </span>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                  {t.name}
                </p>
                <motion.p
                  className="text-slate-400 text-xs"
                  variants={fadeInUp}
                >
                  {t.location} · {t.service}
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust bar */}
      <motion.div
        className="mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-10 border-t border-slate-200"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="text-center"
          variants={fadeInUp}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <motion.p
            className="font-heading stat-value font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-1"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={statSpringTransition}
          >
            98%
          </motion.p>
          <p className="text-slate-500 text-xs sm:text-sm">Patient Satisfaction</p>
        </motion.div>

        <motion.div
          className="text-center"
          variants={fadeInUp}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <motion.p
            className="font-heading stat-value font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-1"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={statSpringTransition}
          >
            4.9/5
          </motion.p>
          <p className="text-slate-500 text-xs sm:text-sm">Average Rating</p>
        </motion.div>

        <motion.div
          className="text-center"
          variants={fadeInUp}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <motion.p
            className="font-heading stat-value font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-1"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={statSpringTransition}
          >
            15,000+
          </motion.p>
          <p className="text-slate-500 text-xs sm:text-sm">Reviews Collected</p>
        </motion.div>
      </motion.div>
    </Section>
  );
}