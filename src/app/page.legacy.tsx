"use client";
import { motion } from "framer-motion";

// Archived landing page content kept for reference.
export default function LegacyLanding() {
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
        {/* Hero */}
        <section className="pt-10">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
            >
              Hi, I&apos;m Shreyas — this is a home for things I&apos;m exploring, making, and thinking about.
            </motion.h1>
            <motion.p variants={fadeIn} className="mt-4 max-w-2xl text-lg opacity-80">
              Notes, sketches, small experiments, and occasional long-form writing. Less resume, more curiosity.
            </motion.p>
            <motion.div variants={fadeIn} className="mt-6 flex gap-3">
              <a
                href="/musings"
                className="rounded-2xl px-5 py-3 text-sm font-medium shadow hover:shadow-md transition-all bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              >
                Read musings
              </a>
              <a
                href="#contact"
                className="rounded-2xl px-5 py-3 text-sm font-medium border border-neutral-300/70 dark:border-neutral-700/70 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-all"
              >
                Get in touch
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* About */}
        <section id="about" className="mt-20">
          <h2 className="text-2xl md:text-3xl font-semibold">About</h2>
          <p className="mt-4 opacity-80 max-w-3xl">
            I like to learn in public. You&apos;ll find half-finished ideas, reading notes, and small tools
            that make life a little smoother. This site is a playground and a scrapbook—updated whenever
            something catches my eye.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-20">
          <h2 className="text-2xl md:text-3xl font-semibold">Contact</h2>
          <p className="mt-4 opacity-80">
            Email me at <a className="underline" href="mailto:hello@yourdomain.com">hello@yourdomain.com</a> or
            DM on LinkedIn.
          </p>
        </section>

        <footer className="mt-20 border-t border-neutral-200/70 dark:border-neutral-800 pt-6 text-sm opacity-70">
          © {new Date().getFullYear()} Shreyas Muralidharan
        </footer>
      </div>
    </main>
  );
}
