"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Photo = { src: string; alt: string };
type Opened = { photos: Photo[]; index: number };

const G = "/images/musings/glacier/";

export default function GlacierMusing() {
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
    caption,
    cols = 2,
    tile = "aspect-[4/3]",
    fullBleed = false,
    center = false,
  }: {
    photos: Photo[];
    caption?: string;
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
        {caption && (
          <figcaption className="mt-2 text-sm opacity-75 text-center">{caption}</figcaption>
        )}
      </figure>
    );
  };

  // A single photo at its natural aspect, still openable in the lightbox.
  const Single = ({
    photo,
    caption,
    className = "mx-auto max-w-md",
  }: {
    photo: Photo;
    caption: string;
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
      <figcaption className="mt-2 text-sm opacity-75 text-center">{caption}</figcaption>
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
            Some Moods of Glacier
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeIn}
            className="mt-2 text-sm opacity-70"
          >
            The North Circle Loop, Glacier National Park {/* TODO: set the real date */}
          </motion.p>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeIn}
            className="mt-1 text-sm opacity-60"
          >
            People on this trip: SM, KR, RW, MN, YM, AS
          </motion.p>
        </header>

        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="prose prose-neutral dark:prose-invert max-w-none mt-8"
        >
          <p>
            For many years, I had wanted to travel to Glacier National Park, as it had seemed to
            offer quite unique scenery, including some of the most "remote" backcountry trails that
            the national park system seemed to offer.
          </p>
        </motion.section>

        {/* On backcountry permits */}
        <section className="prose prose-neutral dark:prose-invert max-w-none mt-8">
          <h2>On backcountry permits</h2>
          <p>
            Glacier, like many national parks, requires one to book backcountry campsites in
            advance, with a pre-set itinerary. Personally I find this quite annoying, as it impedes
            my goals of going with the flow, seeing as much as I could in a day, and simply finding
            an empty dispersed camping site near where I made it that day. However, I also recognize
            the many positive impacts it has on LNT principles and reducing impact on the park
            itself.
          </p>
          <p>
            Our goal was to get permits for the North Circle Loop, as roughly outlined in{" "}
            <a
              href="https://www.alltrails.com/trail/us/montana/north-circle-loop"
              target="_blank"
              rel="noopener noreferrer"
            >
              this AllTrails link
            </a>
            .
          </p>
          <p>
            With a particular exception, we got most of our sites as planned, with the exception of
            Elizabeth Lake Foot (substituted for Head) and Stoney Indian Lake (substituted for
            Kootenai Lakes). It occurs to me that if one is willing to have longer days — e.g. add
            5–10 miles on top of a normal day — it is much easier to make a trip happen.
          </p>
        </section>

        {/* ── Day -1 ─────────────────────────────────────────────── */}
        <DayHeading day="Day −1" route="Seattle to Montana" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            For various fun and practical reasons, our trip began by a subset of the group flying to
            Seattle, and then driving to Montana to begin the trip. The drive was set amongst a thick
            haze for a large part of it, partly from fires in Spokane, and an overall early fire
            season exacerbated by a historically low snowpack. Though mostly uneventful, the smoke
            made for an excellent sunset, a red sun setting into the smoke in the horizon.
          </p>
        </section>

        <Single
          photo={{
            src: G + "smoke-sunset.jpg",
            alt: "A red sun setting into wildfire smoke, seen from the car on the drive to Montana",
          }}
          caption="A red sun setting into the smoke, somewhere on the drive east."
        />

        {/* ── Day 0 ──────────────────────────────────────────────── */}
        <DayHeading day="Day 0" route="Permits, Going-to-the-Sun Road, and Babb, MT" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            We picked up the rest of the group from the airport, a rental car, and also our permits
            from the wilderness permit center. There, we watched a rather humorous safety video
            complete with a bear encounter, from the point of view of the bear, how to use bear
            spray, and other useful information. The rangers were exceedingly kind and helpful. We
            also drove via the famous "going to the sun road" which had views that were partially
            obscured by the aforementioned smoke, but nevertheless were quite magnificent.
          </p>
        </section>

        <Album
          cols={2}
          caption="Going-to-the-Sun Road in the smoke, and the roaming dogs of Babb."
          photos={[
            {
              src: G + "going-to-the-sun.jpg",
              alt: "Smoke-obscured peaks along the Going-to-the-Sun Road",
            },
            {
              src: G + "roaming-dogs.jpg",
              alt: "The roaming dogs at the Learning Tree Cafe and Campground in Babb, MT",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            We stayed at the Learning Tree Cafe and Campground, in Babb, MT, which was quite
            pleasant, due in part to the roaming dogs that were extremely friendly and affectionate,
            free wi-fi, a nice fire ring, and some nice park benches.
          </p>
        </section>

        {/* ── Day 1 ──────────────────────────────────────────────── */}
        <DayHeading day="Day 1" route="Many Glacier to Elizabeth Lake Head" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            Armed with bagels and cream cheese, we set off on the Iceberg/Ptarmigan trail, next to
            the Swiftcurrent Motor Inn. Almost immediately, we saw a moose not far from the trail. We
            (I) would not see large wildlife for the rest of the trip. The first day offered a mix of
            forested terrain with canyon views. Wildflowers, which I later came to know are called
            "fireweed," felt as if they were "posing" for pictures. I greatly enjoyed taking these.
          </p>
        </section>

        <Album
          cols={3}
          caption="The start, the canyon, and the fireweed."
          photos={[
            {
              src: G + "day1-start.jpg",
              alt: "Setting off on the Iceberg/Ptarmigan trail at Many Glacier",
            },
            {
              src: G + "day1-view.jpg",
              alt: "Canyon views on the first day of the North Circle Loop",
            },
            {
              src: G + "day1-fireweed.jpg",
              alt: "Fireweed posing for the camera",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            Various small lakes along the trail, such as Ptarmigan Lake, offered scenic rest stops to
            have snacks and fill water, as well as take nice group pictures with my camera perched
            precariously upon rocks. Day 1 also presented the famous Ptarmigan Tunnel, a 250-foot
            tunnel cut into the mountain to avoid crossing "Red Gap." We made our way to the
            Elizabeth Lake Foot campground, accompanied by a quite magnificent sunset over the
            mountains, and a dip (or two) in the frigid water of Elizabeth Lake. The campsites in
            Glacier National Park are quite large and can fit three tents (though we didn't do this
            :) ).
          </p>
        </section>

        {/* Day 1's set runs bigger — two across, full-bleed. */}
        <Album
          fullBleed
          cols={2}
          tile="aspect-[3/4]"
          caption="Water, Ptarmigan Lake, the tunnel, and sunset over Elizabeth Lake."
          photos={[
            {
              src: G + "day1-water-filling.jpg",
              alt: "Filling water at a lake along the trail",
            },
            {
              src: G + "day1-group-ptarmigan-lake.jpg",
              alt: "Group photo at Ptarmigan Lake",
            },
            {
              src: G + "day1-ptarmigan-tunnel.jpg",
              alt: "The Ptarmigan Tunnel, cut 250 feet through the mountain",
            },
            {
              src: G + "day1-sunset-elizabeth-lake.jpg",
              alt: "Sunset over the mountains at Elizabeth Lake",
            },
          ]}
        />

        {/* ── Day 2 ──────────────────────────────────────────────── */}
        <DayHeading day="Day 2" route="Elizabeth Lake Head to Mokowanis Junction" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            The smoke situation progressively cleared up during the trip, and Day 2 offered
            significantly better views than Day 1. We began the morning with lakeside yoga led by RW.
            We traced our steps back along the side of Elizabeth Lake, graced now with views of the
            mountains behind Elizabeth Lake.
          </p>
        </section>

        <Album
          cols={3}
          caption="Morning yoga, the group, and the trail back along Elizabeth Lake."
          photos={[
            {
              src: G + "day2-morning-yoga.jpg",
              alt: "Lakeside morning yoga led by RW",
            },
            {
              src: G + "day2-group-elizabeth-lake.jpg",
              alt: "The group at Elizabeth Lake",
            },
            {
              src: G + "day2-trail-1.jpg",
              alt: "The trail along the side of Elizabeth Lake",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            This day featured a brief and tame crossing of the Mokowanis River, followed by lunch on
            the river bank. There we met a small group from the south who had a funny quip about the
            name of our campsite that night (mokowhat?). Rock skips of epic proportions were also
            achieved.
          </p>
        </section>

        <Album
          cols={3}
          tile="aspect-[3/4]"
          caption="The trail toward Mokowanis, MN mid-crossing, and the group on the far bank."
          photos={[
            {
              src: G + "day2-trail-2.jpg",
              alt: "Hikers walking away through a tall meadow toward layered peaks",
            },
            {
              src: G + "day2-mn-crossing.jpg",
              alt: "MN crossing the Mokowanis River barefoot, sandals in hand",
            },
            {
              src: G + "day2-group-mokowanis.jpg",
              alt: "The group at Mokowanis Creek",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            That night, the majority of the group had what I believe to be the best freeze-dried
            dehydrated meal on the market, butternut dal bhat (affectionately known as bndb).
          </p>
        </section>

        <Single
          photo={{
            src: G + "day2-bndb.jpg",
            alt: "Butternut dal bhat, the best freeze-dried meal on the market",
          }}
          caption="bndb."
        />

        {/* ── Day 3 ──────────────────────────────────────────────── */}
        <DayHeading day="Day 3" route="Mokowanis Junction to Kootenai Lake" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            Day 3 began with very lofty goals of a pre-dawn start to attempt to make it to the top of
            Mount Cleveland, with a back-up goal of "acquiring the ridge," or making it as far up as
            possible. We began around 4am, several hours before dawn, leaving camp intact, and
            proceeding with light packs. The foliage on the trail was moist with dew, and soon our
            pants, socks, and shoes were soaked. We did several "river crossings" which we later
            found out were easily circumventable by bridges that were obvious in the light.
          </p>
          <p>
            We made it to the top of the "off trail" section near sunrise, attempted some highly
            subpar route finding, and proceeded to turn around. We were also freezing / shivering, a
            state of being that I never really escaped until the end of the trip. During one of these
            river crossings, I also dropped my phone in the creek, which, while I recovered, spelled
            the end of my phone for the trip.
          </p>
        </section>

        <Album
          cols={2}
          caption="The crossings we later learned had bridges, and the morning after turning around."
          photos={[
            {
              src: G + "day3-river-crossing.jpg",
              alt: "A pre-dawn river crossing on the way toward Mount Cleveland",
            },
            {
              src: G + "day3-group-morning.jpg",
              alt: "The group in the early morning after turning around",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            After breaking down camp, we set off on the exact same portion of trail that we had just
            done, this time taking in the grand waterfalls and scenery. Clouds made for very diffuse
            light, which I found very appealing to take photos. It was certainly my favorite day for
            photography.
          </p>
        </section>

        <Album
          fullBleed
          cols={3}
          tile="aspect-[3/4]"
          caption="Diffuse light — my favorite day for photography."
          photos={[
            {
              src: G + "day3-flowers.jpg",
              alt: "Wildflowers in diffuse cloud light",
            },
            {
              src: G + "day3-mountains.jpg",
              alt: "Mountains under heavy cloud",
            },
            {
              src: G + "day3-overlook.jpg",
              alt: "An overlook on the way back down",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            Upon arrival at the campsite, we were graced with a view of Kootenai Lake, as well as
            some beautiful clouds, which looked a bit like fingers caressing the mountain. After
            being eaten alive by mosquitoes, we walked away to prepare dinner. Shortly after, AS
            spotted a moose walking past the site. I wondered if it was going to the water to have an
            evening drink, so I ran after it, capturing what I think is by far my favorite photo of
            the trip, and perhaps one of my favorite photos I've taken.
          </p>
        </section>

        <Single
          className="mx-auto max-w-2xl"
          photo={{
            src: G + "day3-moose.jpg",
            alt: "A moose standing in the water near Kootenai Lake at dusk",
          }}
          caption="A moose in water. My favorite photo of the trip."
        />

        {/* ── Day 4 ──────────────────────────────────────────────── */}
        <DayHeading day="Day 4" route="Kootenai Lake to Fifty Mountain" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            Day 4 began with a rather funny experience to remove the rope required to hang the bear
            hang. MN decided to perform an epic Mulan moment to climb the bear pole to unhook the
            rope (hopefully this picture does not incriminate anyone). The day featured terrain that
            bore resemblance to my mental model of what mountains in New Zealand might look like. I
            remember RW setting a brisk pace at the front through rather overgrown trails.
          </p>
        </section>

        <Album
          cols={3}
          tile="aspect-[3/4]"
          caption="The Mulan moment, the pace-setter, and the New Zealand of my imagination."
          photos={[
            {
              src: G + "day4-bear-pole.jpg",
              alt: "MN climbing the bear pole to unhook the rope",
            },
            {
              src: G + "day4-ryan.jpg",
              alt: "RW setting a brisk pace through overgrown trail",
            },
            {
              src: G + "day4-new-zealand.jpg",
              alt: "Terrain that looked like a mental model of New Zealand",
            },
          ]}
        />

        <Album
          cols={2}
          tile="aspect-[3/4]"
          caption="Views along the trail"
          photos={[
            {
              src: G + "day4-nice-view.jpg",
              alt: "Conifers framing a valley with cloud pouring over a green ridge",
            },
            {
              src: G + "day4-group-overlook.jpg",
              alt: "The group standing in a meadow with cloud swallowing the peak behind",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            I remember this day also being rather moist, with perpetually wet pants. We stopped to
            have lunch on a conveniently placed and sized rock. I once again was extremely cold, and
            had to do jumping jacks to stay warm.
          </p>
        </section>

        <Single
          className="mx-auto max-w-xl"
          photo={{
            src: G + "day4-lunch-rock.jpg",
            alt: "The group having lunch on a conveniently placed rock",
          }}
          caption="A conveniently placed and sized rock."
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            I have very few pictures from the end of this day, partially because my phone was
            destroyed, and partially because I was so incredibly cold that I had no desire to operate
            my camera. We got to camp, huddled in sleeping bags for warmth, and had dinner. We then,
            after careful jugglery of wet and muddy clothes, all huddled in the largest tent to play
            ERS (Egyptian Rat Screw) and tell some rather peculiar (according to me) riddles.
          </p>
        </section>

        {/* ── Day 5 ──────────────────────────────────────────────── */}
        <DayHeading day="Day 5" route="Fifty Mountain to Many Glacier (end)" />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            Due to predetermined plans, this would be my last day, and the rest of the group would
            stay for one more day, at Granite Park. We began slightly earlier (though not that
            early), and we hiked through rather thick cloud cover. Several pictures I took I felt gave
            the impression of traveling directly into the clouds.
          </p>
        </section>

        <Album
          cols={2}
          caption="Traveling directly into the clouds."
          photos={[
            {
              src: G + "day5-into-clouds-1.jpg",
              alt: "Hiking into thick cloud cover",
            },
            {
              src: G + "day5-into-clouds-2.jpg",
              alt: "The trail disappearing into the clouds",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            A few miles into the day, to make good time back to the car, I split off from the main
            group. MN graciously let me borrow her phone armed with music for the rest of the hike
            out. Following this, I encountered what some might say was rather miserable weather. I,
            however, could not be fazed. I was struck by the extreme beauty of the mountains
            enshrouded in clouds, further inspired by my newfound mood booster, the magic of music,
            and saying Hey Bear in various accents. I encountered a French lady we had seen several
            times before, who was purportedly impressed by my speed. I however, just needed to hike
            fast so I didn't get too cold and start shivering again. Below is a collection of
            pictures from my last day. Dare I say, I thought these views were strikingly beautiful,
            and perhaps representing a different mood of the park, one that was brooding, or pensive,
            perhaps?
          </p>
        </section>

        <Album
          fullBleed
          center
          tile="aspect-[3/4]"
          photos={[
            {
              src: G + "day5-rain-1.jpg",
              alt: "The trail traversing a green slope under low cloud",
            },
            {
              src: G + "day5-rain-2.jpg",
              alt: "Cloud spilling over a burned hillside",
            },
            {
              src: G + "day5-rain-3.jpg",
              alt: "Trail cut into a cliff face in the fog",
            },
            {
              src: G + "day5-rain-4.jpg",
              alt: "A waterfall below cloud-covered cliffs",
            },
            {
              src: G + "day5-rain-5.jpg",
              alt: "A lake below the trail, half swallowed by cloud",
            },
            {
              src: G + "day5-rain-6.jpg",
              alt: "Peaks emerging from fog above a meadow",
            },
            {
              src: G + "day5-rain-7.jpg",
              alt: "A hook-shaped tree bent back on itself in dim wet forest",
            },
          ]}
        />

        <section className="prose prose-neutral dark:prose-invert max-w-none mt-4">
          <p>
            Upon my return to the parking lot, I took a picture of our cars. On the drive out, I
            stopped by the side of the road to take my last picture of the trip. The return to the
            Airbnb and the airport without a phone was an endeavor in and of itself, but that is a
            story for another day. Suffice it to say that modern life becomes extremely difficult
            without a smartphone.
          </p>
        </section>

        <Album
          cols={2}
          tile="aspect-[3/4]"
          caption="The cars, and the last picture of the trip."
          photos={[
            {
              src: G + "day5-parking-lot.jpg",
              alt: "Our cars in the Many Glacier parking lot at the end of the hike",
            },
            {
              src: G + "day5-drive-out.jpg",
              alt: "The last picture of the trip, taken from the side of the road on the drive out",
            },
          ]}
        />

        {/* Closing reflection */}
        <section className="prose prose-neutral dark:prose-invert max-w-none mt-12 border-t border-neutral-200/70 dark:border-neutral-800 pt-8">
          <p>
            Several years ago, I went on a "first trip" to Yosemite. I was enamored by the beauty,
            and someone had asked me recently, aren't there so many places to go to and visit? Would
            you go to Yosemite again? Since then, I have visited Yosemite countless times, and am
            always enchanted by the different moods, experiences, and thoughts that grace me while I
            am there. Similarly, I feel quite taken by Glacier National Park. In some ways, I didn't
            even get to see the iconic views that the park is known for. Apparently, on the next day,
            the rest of the group was graced with by far the best weather day, and their trip up to
            Grinnell Glacier Overlook was apparently the highlight of the trip. Thankfully, there
            will be other days to visit Glacier, and I am rather thankful for the moods of the
            mountain that I got to experience.
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

        {/* Route card */}
        <div className="mx-auto max-w-prose my-8">
          <a
            href="https://www.alltrails.com/trail/us/montana/north-circle-loop"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-neutral-200/70 dark:border-neutral-800 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-base font-medium">The route: North Circle Loop</div>
                <p className="mt-1 text-sm opacity-80">
                  Map, mileage, and elevation on AllTrails.
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
