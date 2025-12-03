"use client";
import { motion } from "framer-motion";

export default function Landing() {
  const fadeIn = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const stagger = {
    show: { transition: { staggerChildren: 0.08 } },
  };

  

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <section className="pt-10">
          <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-4">
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
            >
              Shreyas Muralidharan
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg opacity-80">
              PhD student in Electrical Engineering at Stanford.
            </motion.p>
            <motion.p variants={fadeIn} className="opacity-70 max-w-2xl">
              This site is a simple home for notes and musings.
            </motion.p>
            <motion.div variants={fadeIn} className="mt-4 flex gap-3">
              <a
                href="/musings"
                className="rounded-2xl px-5 py-3 text-sm font-medium shadow hover:shadow-md transition-all bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              >
                Musings
              </a>
              <a
                href="mailto:hello@example.com"
                className="rounded-2xl px-5 py-3 text-sm font-medium border border-neutral-300/70 dark:border-neutral-700/70 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-all"
              >
                Email
              </a>
            </motion.div>
          </motion.div>
        </section>

        <footer className="mt-20 border-t border-neutral-200/70 dark:border-neutral-800 pt-6 text-sm opacity-70">
          © {new Date().getFullYear()} Shreyas Muralidharan
        </footer>
      </div>
    </main>
  );
}
