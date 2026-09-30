import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#090909]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/convertedImage.png"
          alt="CoreX Arena football turf"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover blur-[5px]"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Red Atmospheric Glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EF1B23]/10 blur-[120px]" />

        {/* Top Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

        {/* Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/30 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-16 pt-32 text-center md:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#EF1B23] shadow-[0_0_12px_rgba(239,27,35,0.8)]" />

            <span className="font-[family-name:var(--font-sora)] text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
              CoreX Arena & Academy
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              font-[family-name:var(--font-sora)]
              text-5xl
              font-extrabold
              uppercase
              leading-[0.92]
              tracking-[-0.04em]
              text-white
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              xl:text-9xl
            "
          >
            Play.
            <br />
            Train.
            <br />
            <span className="text-[#EF1B23]">Compete.</span>
          </h1>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-7
              max-w-2xl
              font-[family-name:var(--font-inter)]
              text-base
              leading-7
              text-white/65
              sm:text-lg
              md:mt-8
              md:text-xl
              md:leading-8
            "
          >
            Your game deserves the right arena. Book your turf, bring your team,
            and make every match count.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary CTA */}
            <Link
              href="/book-now"
              className="
                group
                inline-flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-[#EF1B23]
                px-7
                py-4
                font-[family-name:var(--font-sora)]
                text-sm
                font-bold
                uppercase
                tracking-wide
                text-white
                shadow-[0_8px_30px_rgba(239,27,35,0.2)]
                transition-all
                duration-300
                hover:bg-[#ff2932]
                hover:shadow-[0_0_45px_rgba(239,27,35,0.4)]
                active:scale-95
                sm:w-auto
              "
            >
              <span>Book Your Slot</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="#academy"
              className="
                inline-flex
                w-full
                items-center
                justify-center
                rounded-xl
                border
                border-white/15
                bg-white/[0.06]
                px-7
                py-4
                font-[family-name:var(--font-sora)]
                text-sm
                font-semibold
                uppercase
                tracking-wide
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-white/25
                hover:bg-white/10
                sm:w-auto
              "
            >
              Explore Academy
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mx-auto mt-14 grid max-w-xl grid-cols-3 border-t border-white/10 pt-7">
            <div className="px-3">
              <p className="font-[family-name:var(--font-sora)] text-xl font-bold text-white md:text-2xl">
                01
              </p>
              <p className="mt-1 font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-wider text-white/45 md:text-xs">
                Premium Turf
              </p>
            </div>

            <div className="border-x border-white/10 px-3">
              <p className="font-[family-name:var(--font-sora)] text-xl font-bold text-white md:text-2xl">
                24/7
              </p>
              <p className="mt-1 font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-wider text-white/45 md:text-xs">
                Booking
              </p>
            </div>

            <div className="px-3">
              <p className="font-[family-name:var(--font-sora)] text-xl font-bold text-white md:text-2xl">
                100%
              </p>
              <p className="mt-1 font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-wider text-white/45 md:text-xs">
                Game Ready
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>

        <span className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
