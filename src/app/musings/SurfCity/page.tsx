"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Photo = { src: string; alt: string };
type Opened = { photos: Photo[]; index: number };

const S = "/images/musings/SurfCity/";

export default function SurfCityMusing() {
  // The lightbox holds the whole album it was opened from, so the arrows and
  // arrow keys page through that album rather than showing only the one clicked.
  const [opened, setOpened] = useState<Opened | null>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const step = useCallback((d: number) => {
    setOpened((o) =>
      o ? { ...o, index: (o.index + d + o.photos.length) % o.photos.length } : o
    );
  }, []);

  useEffect(() => {
    if (!opened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpened(null);
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [opened, step]);

  // A grid of photos, laid out on the page as before. Clicking any tile opens
  // the lightbox on that album, where the carousel navigation lives.
  const Album = ({
    photos,
    cols = 2,
    tile = "aspect-[4/3]",
    fullBleed = false,
    center = false,
  }: {
    photos: Photo[];
    cols?: 1 | 2 | 3 | 4;
    tile?: string;
    fullBleed?: boolean;
    center?: boolean;
  }) => {
    const colClass = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
    }[cols];

    const Tile = ({ photo, i }: { photo: Photo; i: number }) => (
      <button
        type="button"
        onClick={() => setOpened({ photos, index: i })}
        className="group relative block w-full cursor-zoom-in rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
        aria-label={`Expand image: ${photo.alt}`}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className={`w-full ${tile} object-cover rounded-xl`}
          loading="lazy"
          decoding="async"
          sizes={fullBleed ? "(max-width: 768px) 50vw, 33vw" : "(max-width: 640px) 100vw, 33vw"}
        />
        {photos.length > 1 && (
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
            {i + 1} / {photos.length}
          </span>
        )}
      </button>
    );

    return (
      <figure
        className={
          fullBleed
            ? "my-10 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
            : "my-6"
        }
      >
        {center ? (
          // Flex rather than grid, so an odd photo count still centers its last row.
          <div className="flex flex-wrap justify-center gap-2 px-3">
            {photos.map((p, i) => (
              <div
                key={p.src}
                className="basis-[calc(50%-0.25rem)] md:basis-[calc(33.333%-0.34rem)]"
              >
                <Tile photo={p} i={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid ${colClass} gap-3 ${fullBleed ? "px-3" : ""}`}>
            {photos.map((p, i) => (
              <Tile key={p.src} photo={p} i={i} />
            ))}
          </div>
        )}
      </figure>
    );
  };

  // A single photo at its natural aspect, still openable in the lightbox.
  const Single = ({
    photo,
    className = "mx-auto max-w-md",
  }: {
    photo: Photo;
    className?: string;
  }) => (
    <figure className={`${className} my-6`}>
      <button
        type="button"
        onClick={() => setOpened({ photos: [photo], index: 0 })}
        className="block w-full cursor-zoom-in rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
        aria-label={`Expand image: ${photo.alt}`}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-auto rounded-xl"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
      </button>
    </figure>
  );

  // Day heading, so the itinerary reads consistently down the page.
  const DayHeading = ({ day, route }: { day: string; route: string }) => (
    <header className="mt-14 mb-2 border-t border-neutral-200/70 dark:border-neutral-800 pt-8">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{day}</h2>
      <p className="mt-1 text-sm opacity-70">{route}</p>
    </header>
  );

  const current = opened ? opened.photos[opened.index] : null;
  const many = opened ? opened.photos.length > 1 : false;

  const lightboxArrow =
    "absolute top-1/2 -translate-y-1/2 z-10 grid place-items-center h-12 w-12 rounded-full " +
    "bg-white/85 text-neutral-900 text-2xl leading-none shadow backdrop-blur hover:bg-white " +
    "focus:outline-none focus:ring-2 focus:ring-white";

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
            Surf City 600k
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeIn}
            className="mt-2 text-sm opacity-70"
          >
            Santa Cruz Randonneurs, October 24, 2026
          </motion.p>
        </header>

        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="prose prose-neutral dark:prose-invert max-w-none mt-8"
        >
          <p>
            When compared to the other 600k rides, I felt that this particular one does not have as
            many ride reports, so I thought I would write one about my first randonneuring event and
            600k, the Surf City 600k.
          </p>
          <p>
            At some point over the summer/fall, a few friends began telling me about a legendary
            event that happens only once every four years, Paris Brest Paris. As a master of "fear of
            missing out," I found myself with a desperate need to join. I was told that I should
            complete a 600km bike ride before November 1st. One large problem in my way, however, was
            that I had not been biking. The last "long" ride I had done was 125 miles, in April.
            Deciding that I would give it a best shot, and will myself over the finish line, I
            decided to do the ride with minimal training.
          </p>
        </motion.section>

        {/* ── Day 1 ──────────────────────────────────────────────── */}
        <DayHeading day="Day 1" route="Santa Cruz to Pescadero and back, then south to King City" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            We start at 6 AM, before the sun rises at the Mark Abbott Memorial Lighthouse. We first
            park at the nearby Safeway and ride the two miles over. The Safeway would become both a
            welcome sight later in the day, but also a sign that quitting was so close and easy. I
            stash a big box of cookie dunkers and chocolate covered pretzels, as well as my night
            gear in the car.
          </p>
          <p>
            Santa Cruz is so very quiet at this time of morning, and there are no cars on the road. We
            collect our brevet cards and input the code into an ebrevet app, something that is new to
            the friends I'm riding with as well. I'm told that the system is fun, at least partially
            because of the occasionally funny two word phrases it auto generates when you check into
            a control.
          </p>
        </section>

        <Album
          cols={2}
          photos={[
            {
              src: S + "Lighthouse.jpg",
              alt: "Riders gathering in the dark outside the brick building at the lighthouse",
            },
            {
              src: S + "GroupStart.jpg",
              alt: "The group in reflective vests with their bikes before dawn",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            The ride begins by taking us along the coast, up towards Pescadero and Half Moon Bay. I
            will admit I have poor memory of this part of the ride, but I remember being in a
            paceline along Highway 1, the sun rising on my left, and the miles flying by. I also
            remember holding on to the wheel directly in front of me, justifying that I would need
            the extra energy later in this ride.
          </p>
          <p>
            The first area I remember passing was Pescadero itself, but it would be too early for the
            shops and Arcangeli's to be open. Our first stop was a nondescript grocery store at which
            I began my routine of emptying a packet of Maurten carb mix into water and chug it down.
            It seems so shortly after we begin that we begin the return journey back to Santa Cruz.
            Once back at Pescadero, this time we take a glorious stop at Arcangeli's complete with
            cookies, coffee, artichoke bread, banana bread, pasta salad and much more. During this
            stop I think we were passed by almost the entire field of people doing the ride, despite
            us going much faster earlier in the ride.
          </p>
        </section>

        <Single
          className="mx-auto max-w-2xl"
          photo={{
            src: S + "SantaCruzReturn.jpg",
            alt: "A rider on Highway 1 beneath sandstone bluffs, the ocean to the right",
          }}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            We begin the trip back to Santa Cruz, and once at the car, I grab my night supplies,
            refill my food bag, and get ready to go out. At this point, some of the group splits up to
            return home, and I lament for a moment at losing some of the best wheels to hang on to in
            the group. I briefly contemplate quitting, but I know that I would regret it so much if I
            quit this early on in the ride. At this point we are roughly 120 miles in, or less than a
            third. I reflect now that having the ride go by the start is a great recipe for having
            people quit.
          </p>
        </section>

        {/* On doping */}
        <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
          <h2>On doping</h2>
          <p>
            At this moment I would like to explain the three methods of doping I had in mind. The
            first is music doping. In moments of tough physical pain, exhaustion, etc. listening to
            music is invaluable in lifting one's mood. The second are pain killers, e.g. Pixie sticks
            (which one of our friends had brought several of) and Ibuprofen. The last is caffeine and
            energy drinks for obvious reasons. The combination of these three doping methods is truly
            awe inspiring and 100% responsible for my eventual finish of this ride.
          </p>
        </section>

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
          <p>
            The sunset during this part of this ride is truly awe inspiring. It sets over strawberry
            fields, which have such an intense strawberry smell that we can smell it from the road.
            The view of the ocean in Moss Landing is so beautiful that I feel myself giddy with
            happiness and excitement.
          </p>
        </section>

        <Album
          cols={2}
          photos={[
            {
              src: S + "Sunset1.jpg",
              alt: "A rider silhouetted against the low sun on a farm road",
            },
            {
              src: S + "Sunset1Selfie.jpg",
              alt: "A selfie on the bike with the group strung out behind in golden light",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            Eventually darkness sets in, and we begin riding with only bike lights. Somewhere after
            Salinas, we stop nearby a control to have a "quick" stop at Angelina's pizzeria, to have
            some warm food and use the restroom. Upon stopping, my mood sours incredibly, as I get
            very very cold. Furthermore, the pizza shop is on the verge of closing and we are forced
            to sit outside. The pizza is quite decent, and really hits the spot when the last N
            things you have eaten are drink mix and chocolate waffles and crepes. One of our group
            members speaks Punjabi to the nearby gas station owner, and secures me hot water that I
            think just saves the rest of my ride. Regardless, I resolve to work hard to warm my
            shivering body up in the next several hours.
          </p>
        </section>

        <Single
          className="mx-auto max-w-sm"
          photo={{
            src: S + "Pizza.jpg",
            alt: "The group at an outdoor table with open pizza boxes outside Angelina's",
          }}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            At this point, it is entirely dark, and it is 8:30 PM. We still have over 50 miles to get
            to King City, where we had planned to take some rest in a hotel room. The idea of riding
            over 50 miles is almost too bleak for me to handle. Insert doping methods number one and
            two. I take a pixie stick, play some music, and I feel as if I have wings and I can do
            anything. At this point the consequence of not doing any long rides is hitting, and my
            poor sit bones are in incredible pain.
          </p>
          <p>
            At some point later in the night we arrive at King City. I remember very little, but I do
            remember that our Punjabi friend once again speaks Punjabi, securing us both free pizza
            and cookies. At this point, I am in the mode of scarfing down whatever food I lay my eyes
            on, a mode of eating that I quite enjoy. We resolve to leave at 6:30AM "rolling," which
            leaves us to wake up at 5:30. It's 1:50AM. I take a quick shower, throw on my fresh bibs,
            and grudgingly set my alarm, eager for a few hours of sleep.
          </p>
        </section>

        {/* ── Day 2 ──────────────────────────────────────────────── */}
        <DayHeading day="Day 2" route="King City to San Ardo, then back north to Santa Cruz" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            It is almost indescribable how awful I feel in the morning when I wake up. My body groans
            with the fact that I have ridden 220 miles the previous day and my mind groans with the
            idea that I will need to get back on the bike. Our plans of starting at 6:30AM vanish, as
            we wake at 6, amble around for more than 30 minutes, and then spend over an hour at the
            McDonalds next door eating pancakes, mcmuffins, and all manner of foods. At this point,
            doping method three begins, and caffeine has never felt so good.
          </p>
        </section>

        <Single
          className="mx-auto max-w-xl"
          photo={{
            src: S + "Mcdonalds.jpg",
            alt: "The group at a McDonald's table covered in breakfast and coffee",
          }}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            The next stretch of riding to San Ardo is amongst the worst I have ever felt on the bike.
            Awful pavement combined with an aching body almost makes me want to quit. Somehow the
            group I am with is still so strong and to make matters worse I am almost getting dropped.
            I am also somehow simultaneously so cold and my feet are burning up with a combination of
            heat/nerve pressure. Every 30 feet there is a massive crack in the road that jostles every
            bone in my body. Arriving at the gas station in San Ardo, I wish I could quit so badly,
            but the area is so remote, I have such poor service, that I cannot bring myself to quit. I
            have a Celsius and the needle moves only a little. I suppose that's when you know the
            situation is truly dire. Furthermore, the mental anguish that we still have over 100
            miles left is even more taxing.
          </p>
        </section>

        <Single
          className="mx-auto max-w-2xl"
          photo={{
            src: S + "SanArdoReturn.jpg",
            alt: "Two riders on a cracked country road through dry fields under a blue sky",
          }}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            Somehow, by hanging onto the group's wheels we make it back out of pavement hell and back
            to King City. I am almost moved to tears when I think of how strong the people I am with
            are, and the idea that collectively I am mentally and physically being pulled closer to
            the finish line. From here we travel to the town of Gonzales, where people have some
            Mexican corn, a baked potato, instant ramen, and I have another Celsius. I sleep on the
            rocks outside of the store and stare up at the clouds wishing for the ride to end.
          </p>
        </section>

        <Single
          className="mx-auto max-w-sm"
          photo={{
            src: S + "CloudSleep.jpg",
            alt: "Wispy white clouds against a blue sky",
          }}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            At this point my stomach begins to turn but I reflect that I think I can make it back
            without needing to eat too much more solid food. As we approach Moss Landing, we are
            greeted by a sunset even more magnificent than the one from the previous evening. I stop
            to reflect how lucky I am that I live in California, and also how lucky I am that I know
            people that push me to do things like this extend the ideas of what I am capable of. Moss
            Landing means that we have only 20-30 miles, and I began to think for a moment that we
            will actually finish. The thought gives me a new surge of energy, and the sunset makes me
            once again exuberantly happy.
          </p>
        </section>

        <Album
          cols={2}
          photos={[
            {
              src: S + "Sunset2Part2.jpg",
              alt: "The sun setting over the ocean beneath bands of orange cloud",
            },
            {
              src: S + "Sunset2.jpg",
              alt: "Clouds lit red and orange above dark silhouetted trees",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            The ride back into Santa Cruz is mostly uneventful. The moon is so bright and it seems
            that we are guided back with its light. We are stopped by stoplights very often through
            Soquel and Santa Cruz, but it serves as a reminder that we are so close to finishing.
            Somehow we find ourselves in a backyard, with some string lights and a bike stand shortly
            after 8:30PM. I am a little incredulous that the ride was actually completed. I fill out
            my randonneur card with all the phrases that I had collected throughout the day. We marvel
            at the moon once again, take a picture, and make the short 1 minute ride back to Safeway.
            As is tradition, I immediately stop by the Taco Bell on my drive back.
          </p>
        </section>

        <Single
          className="mx-auto max-w-sm"
          photo={{
            src: S + "RandoCard.jpg",
            alt: "The green Surf City 600 brevet card held in hand",
          }}
        />

        <Single
          className="mx-auto max-w-2xl"
          photo={{
            src: S + "GroupEnd.jpg",
            alt: "The group standing together at night after the finish",
          }}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
          <p>
            This experience reminded me of several themes but perhaps the one that sticks with me the
            most is the power of what is achievable by a group. So many times I felt that I was held
            together by the idea that things were achievable with other people. The fact that people
            stronger than me were able to pull me up to achieve something I myself surely was not
            capable of is one that I would like to remember. For that, I am truly thankful.
          </p>
        </section>

        {/* Lightbox — a carousel over whichever album was opened. */}
        {opened && current && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpened(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpened(null)}
                className="absolute -top-3 -right-3 z-20 bg-white text-neutral-900 rounded-full h-9 w-9 text-sm shadow"
                aria-label="Close viewer"
              >
                ✕
              </button>

              {many && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className={`${lightboxArrow} left-2 sm:-left-6`}
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className={`${lightboxArrow} right-2 sm:-right-6`}
                    aria-label="Next photo"
                  >
                    ›
                  </button>
                </>
              )}

              <img
                src={current.src}
                alt={current.alt}
                className="w-auto max-w-full max-h-[80vh] mx-auto h-auto rounded-xl"
              />

              {many && (
                <div className="mt-3 text-center text-sm text-white/60">
                  {opened.index + 1} / {opened.photos.length}
                </div>
              )}

              {many && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  {opened.photos.map((p, n) => (
                    <button
                      key={p.src}
                      type="button"
                      onClick={() => setOpened({ ...opened, index: n })}
                      aria-label={`Go to photo ${n + 1}`}
                      aria-current={n === opened.index}
                      className={`h-2 rounded-full transition-all ${
                        n === opened.index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
