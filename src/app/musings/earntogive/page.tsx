"use client";
/* eslint-disable react/no-unescaped-entities */

import { motion } from "framer-motion";
import EarnToGiveModel from "./model";

export default function EarnToGiveMusing() {
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
            Why I don't buy "earn to give"
          </h1>
          <p className="text-sm opacity-70 leading-6">
            Thoughts on where the math breaks down on earn to give
          </p>
        </motion.header>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <p>
            Consider a situation in which a "smart" , "skilled" person cares about impact and the world's problems.Should this person go work on these problems
            directly, or should you get rich and fund someone else to do it? Specifically, which creates more "impact?"
          </p>
          <p>
            The argument for earning to give is quite reasonable. If you're talented enough to earn a lot, the math could work
            out: earn $1 million dollars (or more), donate $200k, fund two researchers in a field you couldn't contribute to
            yourself.
          </p>
          <p>
            However, consider the logical extension of this. The other logical extreme here that the smartest people in the world
            all earn to give, and we are left with no skilled workers left to solve the world's problems. Consider the following 
            toy model I created to help me think about this.
          </p>
        </motion.section>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <h2>A toy world</h2>
          <p>
            Imagine a simplified world. There are 1,000,000 credits of total wealth, and 10,000 people.
            The top 10%, the rich, hold 80% of it. The bottom 90% hold the remaining
            20%. A reasonable place to start.
          </p>
          <p>
            This world faces 10 critical problems. Climate collapse, pandemics, AI risk, etc.
             Each problem requires two things to solve: 20,000 credits of
            funding, and 30 skilled workers dedicated to it. Total need across all problems: 200,000
            credits and 300 workers.
          </p>
          <p>
            Consider also that this world has 500 skilled people. Given a million credits, and 500 skilled people, It is neither
            resource nor labor constrained. We might consider that the resources simply need to be allocated to solve the problems.
          </p>
          <p>So why don't they all get solved?</p>
        </motion.section>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <h2>Donation</h2>
          <p>
            Consider that in this society, the rich decide to 5% of their wealth. The poor donate 2%. We'll allocate these donations to solve the world's 
            critical problems. Total donations: 44,000 credits. That's
            enough to fund about two problems out of ten.
          </p>
        </motion.section>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <h2>Earn to give?</h2>
          <p>
            Consider that each of the 500 skilled people face a choice: work directly on
            a problem (modest salary, funded by donations) or go earn in the rich economy (5x the
            salary, donate their percentage). For the sake of clarity, i'll call the first group "workers"
            and the second group "earners."
          </p>
          <p>
            If a skilled person chooses to earn, they make 500 credits and donate 5%. That's
            25 credits. The worker they would have replaced costs 50 credits to employ. It
            takes <em>two</em> skilled earners to fund the salary of <em>one</em> skilled worker.
            Every defection to earning adds 25 credits of funding but removes 50 credits of labor
            capacity. 

        
          </p>
          
        </motion.section>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <h2>The scenarios</h2>
          <p>Trace this to its conclusion:</p>
          <p>
            Consider a tradeoff between labor and funding. When 300 of the 500 skilled people work directly, there are enough workers for all 10
            problems. The bottleneck is funding ; donations can only cover about 2. At
            least the talent is there, ready to scale if funding increases.
          </p>
          <p>
            When only 100 work directly, you can staff about 3 problems. The extra funding from 400
            skilled earners? It adds about 10,000 credits, moving the needle from 2.2 to 2.7
            fundable problems. 
          </p>
          <p>
            When everyone earns, all 500 skilled people defect to the rich economy.
            Donations increase by 12,500 credits. Total funding: 56,500. But workers available: zero.
            Problems solved: zero. This represents the logical extreme of the original earn to give hypothesis.

            What happens if the rich donate more? What happens if we create more skilled workers, "trickling down" from the additional economic value from the earners?
            Consider this toy model for various paramters. Consider how many problems get solved for various rates of donation, wealth distribution, etc.
          </p>
        </motion.section>

        {/* Interactive model */}
        <motion.section variants={fadeIn} className="mt-10 -mx-6 sm:mx-0">
          <div className="rounded-xl overflow-hidden border border-neutral-200/70 dark:border-neutral-800">
            <EarnToGiveModel />
          </div>
        </motion.section>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          It's clear that all the problems can be solved, the question is: who is willing to "work", and who wants to "earn." 
        </motion.section>

        
        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <h2>The most difficult problems go unsolved</h2>
          <p>
            Consider a situation in which the some of these problems are more difficult than others.
            They can only be solved by "extremely skilled" people.
          
          </p>
          <p>
            As skilled people drain away from direct work, the easy problems get solved first.
            The hard problems stay unanswered, because the most skilled consider that they should earn to give to maximize impact.
            In this example, the hardest problems never get solved.
          </p>
          
        </motion.section>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <h2>Time sensitivity</h2>
          <p>
            What happens when some problems are specially time sensitive? Imagine that building the wealth required to give and cause impact takes time.
            Stock options need to vest, companies need to IPO, what have you.
            What happens to the problems in the mean time?
          
          </p>
          <p>
            Problems like climate change may not have the time insensitivity to be solved via indirect methods. When the earn to give timelines are longer 
            than the timelines of the problems, the world can suffer on a global scale.
          </p>
          
        </motion.section>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <h2>Lifestyle creep</h2>
          <p>
            It is undebatable that money opens doors. It increases your quality of life, opens new experiences, gives freedoms, the list goes on.
            Can one rely on their future generosity reliably? Can society rely on the average generosity of the rich to solve the problems?
            What happens when the money you wanted to donate at 30 doesn't suffice for a new lifestyle featuring a "bit" of opulence?
          </p>
          
        </motion.section>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <h2>Replacement asymmetry</h2>
          <p>
          If one has specialized skills that could be deployed to solve a problem, it seems reasonable that those skills are rare. Maybe they could be cultivated in others, but it takes time. If one leaves a high-paying job, market forces fill it immediately. Capitalism actively produces replacements for high-earning roles. It does not produce replacements for the researcher who never enters the field.
          
          </p>
          
        </motion.section>




        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <h2>Comparison to reality</h2>
          <p>This toy model is a: extremely simplistic compared to the real world, and b: much kinder than the real world.</p>
          <p>
            Global wealth is roughly $470 trillion. The top 1% of adults hold about 48% of it.
            Charitable giving in the United States, one of the most philanthropic nations on earth
            ,runs at about 1.8% of income. Globally, the picture is worse. Only about a third of people worldwide report donating
            money to charity in any given year, and that share has been declining.
          </p>
          <p>
            In our toy model, the rich donate 5%. In reality, the ultra-wealthy donate closer to 1-2%
            of their wealth. The world's 3,200 billionaires account for just 8% of individual
            philanthropy. The total pool of giving is <em>far</em> smaller relative to the problems
            than our model assumes.
          </p>
          <p>
            How about the talent side? Consider the hardest problems facing humanity: climate
            intervention, pandemic preparedness, AI alignment, etc. Each has
            perhaps a few hundred to a few thousand active researchers globally, often funded at
            levels that are rounding errors in the context of national budgets. 
          </p>
          <p>
            In our model, the world has 5x the funding needed. In reality, I claim the funding allocated to
            existential risks is maybe 0.01% of what's available. The model assumes 500 skilled
            people out of 10,000. In the real world, we have millions of PhDs and only a handful
            working on the "important problems."
          </p>
        </motion.section>

        <motion.section variants={fadeIn} className="prose prose-neutral dark:prose-invert mt-8">
          <h2>Summary</h2>
          <p>
            Earning to give is an enticing philosophy that increases one's perceived impact while <b><em>simultaneously benefiting greatly</em></b>. The framework breaks when it becomes a universal principle. It breaks
            when the smartest people all ascend to the top, assuming someone else will stay behind to
            do the hard work. 
          </p>
          <p>
            I posit that the world needs more skilled people
            willing to deploy their skills on the problems that matter, even when a richer,
            more <b>personally beneficial</b> path is available.
          </p>
          <p>
            Consider that solving important problems needs resources: not only money, but also the skilled people to solve them.
          </p>
        </motion.section>
      </motion.article>
    </main>
  );
}
