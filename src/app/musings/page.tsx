"use client";
import { motion } from "framer-motion";

export default function MusingsPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          Musings
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="mt-4 opacity-80"
        >
          A few thoughts.
        </motion.p>

        <section className="mt-10 space-y-6">
          {/* Bread post */}
          <article className="group">
            <a
              href="/musings/bread"
              className="block rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium group-hover:underline">
                  The one bread to rule them all
                </h2>
                <time className="text-sm opacity-70">2025-09-15</time>
              </div>
              <p className="mt-2 text-sm opacity-80">
                An ode to god bread
              </p>
            </a>
          </article>

          {/* Real post */}
          <article className="group">
            <a
              href="/musings/yosemite"
              className="block rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium group-hover:underline">
                  Notes from Yosemite
                </h2>
                <time className="text-sm opacity-70">2025-09-01</time>
              </div>
              <p className="mt-2 text-sm opacity-80">
                From a long and smoky day
              </p>
            </a>
          </article>

          {/* Placeholder posts to be filled later */}
          <article className="group">
            <a
              href="#"
              className="block rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium group-hover:underline">
                  On learning in public
                </h2>
                <time className="text-sm opacity-70">2025-08-21</time>
              </div>
              <p className="mt-2 text-sm opacity-80">Placeholder summary.</p>
            </a>
          </article>

          <article className="group">
            <a
              href="#"
              className="block rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium group-hover:underline">
                  Small tools that reduce friction
                </h2>
                <time className="text-sm opacity-70">2025-08-03</time>
              </div>
              <p className="mt-2 text-sm opacity-80">Placeholder summary.</p>
            </a>
          </article>
        </section>
      </div>
    </main>
  );
}
