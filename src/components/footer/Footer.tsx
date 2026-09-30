import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090909]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        {/* Top Row */}
        <div className="flex w-full items-center justify-between gap-5">
          {/* Full Logo */}
          <div className="shrink-0">
            <Image
              src="/corex-arena-academy-logo.svg"
              alt="CoreX Arena & Academy"
              width={150}
              height={90}
              className="h-auto w-[105px] sm:w-[125px]"
            />
          </div>

          {/* Copyright */}
          <p className="max-w-[250px] text-right font-[family-name:var(--font-inter)] text-xs leading-6 text-white/40 sm:max-w-none sm:text-sm">
            © {new Date().getFullYear()} CoreX Arena & Academy. All rights
            reserved.
          </p>
        </div>

        {/* Developer Credit */}
        <div className="mt-7 border-t border-white/[0.06] pt-5 text-center">
          <p className="font-[family-name:var(--font-inter)] text-xs text-white/30 sm:text-sm">
            Developed by{" "}
            <a
              href="https://vertexorasolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
        group relative ml-1 inline-flex items-center gap-1.5
        font-[family-name:var(--font-sora)]
        text-sm font-bold tracking-wide text-white/70
        transition-all duration-300
        sm:text-base
      "
            >
              <span className="transition-colors duration-300 group-hover:text-[#EF1B23]">
                Vertexora
              </span>

              <span className="text-[#EF1B23]">Solutions</span>

              <span
                className="
          absolute -bottom-1 left-0 h-[2px] w-0
          rounded-full bg-[#EF1B23]
          transition-all duration-500
          group-hover:w-full
        "
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
