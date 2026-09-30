"use client";

import { MapPin, Navigation, Phone, Clock3 } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="bg-[#090909] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#EF1B23]" />
            <span className="font-[family-name:var(--font-sora)] text-xs font-bold uppercase tracking-[0.25em] text-[#EF1B23]">
              Visit CoreX
            </span>
            <span className="h-px w-8 bg-[#EF1B23]" />
          </div>

          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Come Play With Us
          </h2>

          <p className="mt-4 font-[family-name:var(--font-inter)] text-base leading-7 text-white/50 sm:text-lg">
            Find CoreX Arena, book your slot, and get ready for your next match.
          </p>
        </div>

        {/* Main Card */}
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] shadow-2xl lg:grid-cols-[1.4fr_0.6fr]">
          {/* Map */}
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[520px]">
            <iframe
              title="CoreX Arena Location"
              src="https://www.google.com/maps?q=23.8311818,90.3796598&z=18&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale brightness-[45%] contrast-[125%]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Dark Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-black/20" />

            {/* Map Location Badge */}
            <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/80 px-4 py-3 shadow-2xl backdrop-blur-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EF1B23] text-white shadow-[0_0_20px_rgba(239,27,35,0.25)]">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-[family-name:var(--font-sora)] text-sm font-semibold text-white">
                    CoreX Arena
                  </p>

                  <p className="mt-0.5 font-[family-name:var(--font-inter)] text-xs text-white/45">
                    Mirpur, Dhaka
                  </p>
                </div>
              </div>
            </div>

            {/* Map Bottom Gradient */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
          </div>

          {/* Location Details */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <span className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-[0.2em] text-[#EF1B23]">
              Location
            </span>

            <h3 className="mt-3 font-[family-name:var(--font-sora)] text-2xl font-bold leading-tight text-white sm:text-3xl">
              Your Next Match
              <br />
              Starts Here.
            </h3>

            <p className="mt-5 font-[family-name:var(--font-inter)] text-sm leading-7 text-white/45 sm:text-base">
              Whether you&rsquo;re playing a competitive match, training with
              your team, or just looking for a place to enjoy football, CoreX is
              ready for you.
            </p>

            {/* Address */}
            <div className="mt-8 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#EF1B23]/10 bg-[#EF1B23]/10 text-[#EF1B23]">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <p className="font-[family-name:var(--font-sora)] text-sm font-semibold text-white">
                  Address
                </p>

                <p className="mt-1 font-[family-name:var(--font-inter)] text-sm leading-6 text-white/45">
                  Section 12, Sagufta, Pallabi
                  <br />
                  Mirpur, Dhaka 1206
                </p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="mt-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#EF1B23]/10 bg-[#EF1B23]/10 text-[#EF1B23]">
                <Clock3 className="h-5 w-5" />
              </div>

              <div>
                <p className="font-[family-name:var(--font-sora)] text-sm font-semibold text-white">
                  Opening Hours
                </p>

                <p className="mt-1 font-[family-name:var(--font-inter)] text-sm leading-6 text-white/45">
                  Every Day
                  <br />
                  6:00 AM – 2:00 AM
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#EF1B23]/10 bg-[#EF1B23]/10 text-[#EF1B23]">
                <Phone className="h-5 w-5" />
              </div>

              <div>
                <p className="font-[family-name:var(--font-sora)] text-sm font-semibold text-white">
                  Contact
                </p>

                <a
                  href="tel:+8801701275099"
                  className="mt-1 block font-[family-name:var(--font-inter)] text-sm text-white/45 transition-colors hover:text-[#EF1B23]"
                >
                  +880 1701-275099
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-9">
              <a
                href="https://maps.app.goo.gl/Sy6E21HxYWkpwFr89"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#EF1B23] px-5 py-3.5 font-[family-name:var(--font-sora)] text-sm font-semibold text-white shadow-[0_8px_25px_rgba(239,27,35,0.15)] transition-all duration-300 hover:bg-[#ff2932] hover:shadow-[0_0_30px_rgba(239,27,35,0.3)] active:scale-[0.98] sm:w-auto"
              >
                <Navigation className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
