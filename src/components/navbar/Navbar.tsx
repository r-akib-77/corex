import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="
        fixed
        left-1/2
        top-4
        z-50
        w-[calc(100%-1.5rem)]
        -translate-x-1/2
        md:w-[calc(100%-4rem)]
        lg:w-[calc(100%-8rem)]
        xl:w-[calc(100%-12rem)]
        2xl:w-[calc(100%-16rem)]
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-white/[0.06]
          px-4
          shadow-[0_8px_40px_rgba(0,0,0,0.25)]
          backdrop-blur-xl
          md:px-8
          lg:px-10
          xl:px-12
          2xl:px-14
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center"
          aria-label="CoreX Arena & Academy"
        >
          <Image
            src="/corex-arena-academy-logo.svg"
            alt="CoreX Arena & Academy"
            width={150}
            height={90}
            priority
            className="
              h-auto
              w-[105px]
              object-contain
              transition-transform
              duration-300
              group-hover:scale-[1.03]
              md:w-[125px]
              lg:w-[140px]
            "
          />
        </Link>

        {/* Book Now */}
        <Link
          href="/book-now"
          className="
            group
            inline-flex
            items-center
            gap-2.5
            rounded-xl
            bg-[#EF1B23]
            px-4
            py-2.5
            font-[family-name:var(--font-sora)]
            text-sm
            font-semibold
            text-white
            shadow-[0_4px_20px_rgba(239,27,35,0.15)]
            transition-all
            duration-300
            hover:bg-[#ff2932]
            hover:shadow-[0_0_30px_rgba(239,27,35,0.35)]
            active:scale-95
            md:px-5
            md:py-3
          "
        >
          <span>Book Now</span>

          <span
            className="
              text-base
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </Link>
      </div>
    </nav>
  );
}
