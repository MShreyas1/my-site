"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BreadMusing() {
  const fadeIn = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <motion.article
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        className="mx-auto max-w-3xl px-6 py-20"
      >
        <motion.header variants={fadeIn} className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
            The one bread to rule them all
          </h1>
          <p className="text-sm opacity-70 leading-6">an ode to god bread</p>
        </motion.header>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <p>
            One type of bread that I, and those around me, have grown especially fond of over the
            last several years is Trader Joe&apos;s organic 5 seed multigrain bread. I'm sure if I or Aditya first found god bread (GB) but it soon became 
            an integral part of our lives.
          </p>
        </motion.section>

        <motion.section variants={fadeIn} className="mt-8 space-y-6">
          <figure className="mx-auto max-w-3xs">
            <Image
              src="/images/musings/bread/god-bread.jpg"
              alt="God breadf"
              width={400}
              height={200}
              className="w-full h-auto rounded-xl"
              sizes="(max-width: 768px) 100vw, 280px"
              priority
            />
            <figcaption className="mt-2 text-sm opacity-75 text-center">
              A loaf of god bread on a Trader Joe&apos;s shelf.
            </figcaption>
          </figure>
          {/* Add more bread images here once assets are available
          <div className="mx-auto max-w-prose grid grid-cols-1 md:grid-cols-2 gap-4">
            ...
          </div>
          */}
        </motion.section>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-6">
          <p>
            There are many reasons to like this bread, and many ways to eat it too. The seeds add a
            lot of texture, the flavor is amazing, it toasts quickly and well. You could eat it with
            almond/peanut butter and jam, peanut butter and banana, hummus (GB with Hum), avocado
            toast, the list goes on. One unfortunate fact is that I have not seen a mention of this bread outside
            of the Bay Area, California.
          </p>

          <p>
            I once found a similarly seedy bread at Costco, which looked
            oddly similar so I decided to give it a try. Perhaps I could find this bread at other Costcos?
          </p>
          <figure className="mx-auto max-w-sm">
            <Image
              src="/images/musings/bread/costcogbcart.jpg"
              alt="God breadf"
              width={400}
              height={200}
              className="w-full h-auto rounded-xl"
              sizes="(max-width: 768px) 100vw, 280px"
              priority
            />
            <figcaption className="mt-2 text-sm opacity-75 text-center">
              Costco bread along with a years supply of almond butter and jam
            </figcaption>
          </figure>
          <p>
            The bread is similarly excellent! Furthermore, the ingredients are almost identical to Trader Joe's seedy bread. However, you may notice that the top of this above picture has
            a brand called Artisan Bakers, from Sonoma County, CA. I did some digging, and found this on their website.
          </p>
          <figure className="mx-auto max-w-sm">
            <Image
              src="/images/musings/bread/artisanbakers.jpg"
              alt="God bread"
              width={400}
              height={200}
              className="w-full h-auto rounded-xl"
              sizes="(max-width: 768px) 100vw, 280px"
              priority
            />
            </figure>
            <p>
            Also, an almost identical ingredient list! However, this poses a pretty scary thought.  
            </p>

            <center><b> God bread is only available in the bay.</b>
            </center>
            
            <p>
              Some further research shows that Artisan Bakers has been going through a bit of a transition.
              They have been expanding to a more high volume capacity, but the original founder, Craig Ponsford
              has moved on and now has a small shop in San Rafael named Ponsford's Place. Craig seems to be quite a acclaimed baker. I found this video quite endearing.
            </p>
          <div className="mx-auto max-w-prose my-6">
            <a
              href="https://www.youtube.com/watch?v=wk-PIFs3cbk"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-neutral-200/70 dark:border-neutral-800 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-9 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center -translate-y-[6px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 opacity-90" />
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-10 h-10 text-white relative">
                    <path fill="currentColor" d="M10 8.5v7l6-3.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-base font-medium">Ponsford&apos;s Place (YouTube)</div>
                  <p className="mt-0.5 text-sm opacity-80">
                    A feature of Ponsford&apos;s place by Marin TV
                  </p>
                </div>
                <span className="shrink-0 opacity-60">↗</span>
              </div>
            </a>
          </div>
            <p>
              I hope to visit Ponsford's place soon and sample his bread. Someone associated with such an incredible product 
              such as god bread can probably make some miraculous bakery items.
            </p>
            <p>
              If anyone knows of good seedy bread available across the US, please let me know. Thanks in advance.
              
            </p>


        
        </motion.section>
      </motion.article>
    </main>
  );
}
