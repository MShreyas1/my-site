"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { motion } from "framer-motion";

export default function EvolutionLoopMusing() {
  const [lightbox, setLightbox] = useState<null | { src: string; alt: string }>(null);
  const fadeIn = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Clickable image that opens the lightbox at full size.
  const ZoomImg = ({
    src,
    alt,
    className,
    sizes,
  }: {
    src: string;
    alt: string;
    className: string;
    sizes: string;
  }) => (
    <button
      type="button"
      onClick={() => setLightbox({ src, alt })}
      className="block w-full h-full cursor-zoom-in rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
      aria-label={`Expand image: ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        sizes={sizes}
      />
    </button>
  );

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <article className="mx-auto max-w-4xl px-6 py-20">
        <header>
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeIn}
            className="text-3xl md:text-4xl font-semibold tracking-tight"
          >
            The Evolution Loop, in a Single Push
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeIn}
            className="mt-2 text-sm opacity-70"
          >
            July 2026 {/* TODO: set the real date */}
          </motion.p>
        </header>

        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="prose prose-neutral dark:prose-invert max-w-none mt-8"
        >
          <p>
            In June of 2025, my friend Aditya and I visited Bishop, California, and stayed with our
            friend Alana. In many ways Bishop is paradise. Access to some of the most epic mountains
            in the Sierra Nevada range is within a one hour drive. During that time, we did the Sky
            Marathon, a point to point route about 24 miles long, with roughly ~4k gain. I was
            captivated by the beauty of alpine lakes and the raw beauty of the eastern Sierra. During
            that trip, we became aware of a route known as the Evolution Loop. Over a year later, I
            asked Aditya to make a trip to the Bay Area to go on some outdoor adventures. We decided
            one of those was to do the Evolution Loop in a "single push."
          </p>
          <p>
            The Evolution Loop traverses some very scenic terrain in the eastern Sierra. It begins at
            North Lake, climbing out of Piute Pass, and down into Humphreys Basin and Piute Canyon.
            From there, the route continues south along the JMT/PCT, into the Evolution Valley, full
            of broad meadows. From here, Evolution Basin awaits, several lakes sitting underneath a
            series of 13,000 foot summits named after evolutionary thinkers, such as Mt. Darwin, Mt.
            Mendel and others. It did not go without notice that Aditya had and continues to study
            evolutionary biology and dynamics.
          </p>
          <p>
            Our journey started with a shuttle from South Lake to North Lake. We parked our car at
            the Bishop Pass Trailhead at approximately 10PM. One of the Bishop shuttle service
            offerers picked us up, but noted that he wouldn't take us up to the North Lake trailhead,
            but drop us off slightly earlier. He mentioned that it would be a short walk to the
            start. When we were dropped off, I failed to check the GPS location, and I realized we
            were significantly further to the start than expected. Moreover, it was pitch black, and
            we had no way to contact anyone. Resigned to our fate, we began walking along the North
            Lake road. Moments later, two very nice men came along the road. They were kind enough to
            let us hop in their pickup bed on their way to the trailhead near their campground.
            Sitting in the back of the pickup, I felt extraordinarily thankful for several things,
            some of which included my opportunity to go on such an epic adventure, the fact that my
            friend Aditya was with me, and for the beautiful view of the milky way and the stars.
          </p>
          <p>
            We began in the dark, around 10:30PM. We hiked in the dark, at a brisk pace through Piute
            Pass and into Humphrey's Basin. Hiking in the pitch black darkness was a very interesting
            experience. Time flew by, but ten miles in, I needed to turn on music to give myself some
            semblance of sanity.
          </p>
        </motion.section>

        {/* PHOTO SLOT 1 — night hiking */}
        <figure className="my-6">
          <ZoomImg
            src="/images/musings/evolutionloop/IMG_3548.jpg"
            alt="Hiking in the dark through Piute Pass"
            className="w-full h-auto rounded-xl"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <figcaption className="mt-2 text-sm opacity-75 text-center">
            Somewhere in the dark, hours before dawn.
          </figcaption>
        </figure>

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            The sun rising was a very welcome feeling, accompanied almost exactly by our joining with
            the PCT/JMT, as well as our entry into Kings Canyon.
          </p>
        </section>

        {/* PHOTO SLOT 2 — sunrise (3550) + Kings Canyon (3556), side by side.
            Both cropped to a shared 4:3 frame so the row lines up despite mixed orientation. */}
        <figure className="my-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ZoomImg
              src="/images/musings/evolutionloop/IMG_3550.jpg"
              alt="Sunrise over Kings Canyon"
              className="w-full aspect-[4/3] object-cover rounded-xl"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <ZoomImg
              src="/images/musings/evolutionloop/IMG_3556.jpg"
              alt="Kings Canyon in the early morning light"
              className="w-full aspect-[4/3] object-cover rounded-xl"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <figcaption className="mt-2 text-sm opacity-75 text-center">
            Sunrise as we entered Kings Canyon.
          </figcaption>
        </figure>

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            The towering granite walls inspired such energy that I found myself no longer sleepy
            (momentarily). Shortly after that, I found myself actively sleeping while hiking, a theme
            that would continue to haunt me through the rest of the day. From here, I found myself
            loving the experience of hiking along the PCT. We encountered several people, who were
            befuddled by our small packs. The conversation often followed something along the lines
            of:
          </p>
          <blockquote>
            <p>Them: "Where did you come from?"</p>
            <p>Us: "Piute Pass"</p>
            <p>Them: "Where are you going?"</p>
            <p>Us: "Bishop Pass"</p>
            <p>Them: "Wow! You guys are awesome" ("beasts" was also used).</p>
            <p>Us: "Nope, we're just stupid!"</p>
          </blockquote>
          <p>
            The highlight of the trip was indeed the Evolution Basin. I was totally awestruck. It
            also occurred to me that we were ~30 miles in, and there was really no easy approach to
            Evolution Basin. It was really a serene alcove of "pristine" wilderness. At this time, I
            also decided to take a nap on the side of the trail, as the sleep deprivation was really
            destroying me. I fell asleep for five minutes, awakened by my alarm and the need to keep
            moving. We really did not want to finish in the dark.
          </p>
        </section>

        {/* PHOTO SLOT 3 — four-panel montage, full width: 3591, 3572, 3573, 3581 */}
        <figure className="my-10 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-3">
            <ZoomImg
              src="/images/musings/evolutionloop/IMG_3591.jpg"
              alt="Evolution Basin"
              className="w-full aspect-[3/4] object-cover rounded-lg"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <ZoomImg
              src="/images/musings/evolutionloop/IMG_3572.jpg"
              alt="Rocky terrain in Evolution Basin"
              className="w-full aspect-[3/4] object-cover rounded-lg"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <ZoomImg
              src="/images/musings/evolutionloop/IMG_3573.jpg"
              alt="Alpine lakes of Evolution Basin"
              className="w-full aspect-[3/4] object-cover rounded-lg"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <ZoomImg
              src="/images/musings/evolutionloop/IMG_3581.jpg"
              alt="Evolution Basin under the 13,000 foot summits"
              className="w-full aspect-[3/4] object-cover rounded-lg"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <figcaption className="mt-2 text-sm opacity-75 text-center">
            Evolution Basin — the highlight of the trip.
          </figcaption>
        </figure>

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            It is a bit sad to realize that the glaciers in this bowl, e.g. Mount Fiske Glacier,
            Mendel Glacier, are all either severely retreating or no longer active. I briefly think
            that this basin, named after evolutionary thinkers, is also going through its own
            evolution. Maybe the glaciers are being selected out, unable to adapt as quickly as they
            must.
          </p>
          <p>
            We climb past Muir Pass, and reach the rock shelter Muir Hut. I briefly contemplate
            another nap, warded off by the realization that we need to keep moving. This section of
            the loop is incredibly rocky, and the geology of the region is so drastically different.
            Rocks poke at our feet, and we briefly contemplate how on earth this section is runnable.
            A few too many stream crossings make the going slow and at times very frustrating.
          </p>
        </section>

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            From here, we continued onwards, on our way to Bishop Pass and the junction. At the
            junction, we contemplated the climb ahead, noting that there were 11 miles remaining. At
            this point, our pace slows to a halt, and we make peace with the fact that we would not
            be back at the car by last light. However, climbing Bishop Pass is aided slightly by
            sweeping vistas behind us, and the setting sun illuminates the mountains, including the
            Inconsolable Range. We make it to the top of the pass in about 4.5 hours, and begin the
            descent from the top of Bishop Pass. Meanwhile, we are absolutely eaten alive by
            mosquitoes. At this point it's pitch black and mental energy is quite low. Despite this,
            we make it back to the car, guided by the dim light of some headlamps, phone flashlights,
            and my GPS watch map.
          </p>
        </section>

        {/* PHOTO SLOT 5 — Inconsolable Range (3605) + sunset (3609), side by side */}
        <figure className="mx-auto max-w-4xl my-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ZoomImg
              src="/images/musings/evolutionloop/IMG_3605.jpg"
              alt="The Inconsolable Range from Bishop Pass"
              className="w-full h-auto rounded-xl"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <ZoomImg
              src="/images/musings/evolutionloop/IMG_3609.jpg"
              alt="The setting sun over the eastern Sierra"
              className="w-full h-auto rounded-xl"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <figcaption className="mt-2 text-sm opacity-75 text-center">
            Last light on the Inconsolable Range, climbing Bishop Pass.
          </figcaption>
        </figure>

        {/* Closing reflection */}
        <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
          <p>
            During this trip, at several times I felt that the terrain and distance ahead was too
            insurmountable, given our pace, and given energy levels. Despite this, embarking on a
            journey like this with someone else gives special meaning to the experience. It's special
            to me that someone else had the same visual, physical, and at least partial emotional
            experience over more than one day. The shared joy of seeing the car in the parking lot is
            ever so sweet and relieving in a way that seeps into one's bones. I never sleep as easily
            as I am when exhausted, sitting reclined in my car after a monumental day in the
            mountains.
          </p>
        </section>

        {/* Lightbox modal */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white rounded-full px-3 py-1 text-sm shadow"
                aria-label="Close lightbox"
              >
                ✕
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-auto max-w-full max-h-[85vh] mx-auto h-auto rounded-xl"
              />
              <div className="mt-2 text-center text-sm opacity-80 text-white">
                {lightbox.alt}
              </div>
            </div>
          </div>
        )}

        {/* Strava card — swap in the real activity URL */}
        <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
          <p>
            <b>My Strava Recording:</b>
          </p>
        </section>
        <div className="mx-auto max-w-prose my-6">
          <a
            href="https://www.strava.com/activities/19372581402"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-neutral-200/70 dark:border-neutral-800 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-base font-medium">
                  Strava activity: Evolution Loop
                </div>
                <p className="mt-1 text-sm opacity-80">
                  Route, splits, and stats from the single push.
                </p>
              </div>
              <span className="shrink-0 opacity-60">↗</span>
            </div>
          </a>
        </div>
      </article>
    </main>
  );
}
