import Image from "next/image";

import { companies } from "@/lib/constants/companies";

const numberFormat = new Intl.NumberFormat("es-CO");

// Company logos (transparent PNGs) scrolling in a loop
const LOGOS = Object.values(companies).filter(
  (company): company is (typeof company & { logo: Exclude<typeof company.logo, ""> }) =>
    Boolean(company.logo)
);

// Speed tied to the number of logos so it stays the same as the list grows:
// about 45px/s (the first version moved ~300px/s)
const SECONDS_PER_LOGO = 3.5;

interface LogoStripProps {
  totalPhotos: number;
}

export function LogoStrip({ totalPhotos }: LogoStripProps) {
  return (
    <section
      aria-label="Empresas en la galería"
      className="relative z-10 -mx-4 md:-mx-6 -mt-6 rounded-t-[2rem] border-t border-white/[0.06] bg-zinc-950 pb-8 pt-10"
    >
      <div className="group/strip relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul
          className="flex w-max animate-marquee items-center gap-14 motion-reduce:animate-none group-hover/strip:[animation-play-state:paused]"
          style={{ animationDuration: `${LOGOS.length * SECONDS_PER_LOGO}s` }}
        >
          {[...LOGOS, ...LOGOS].map((company, index) => (
            <li key={`${company.name}-${index}`} aria-hidden={index >= LOGOS.length}>
              <Image
                src={company.logo}
                alt={index < LOGOS.length ? company.name : ""}
                height={36}
                className="h-9 w-auto opacity-60 transition-opacity hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm text-zinc-400">
        <span>
          <span className="font-semibold text-white">{numberFormat.format(totalPhotos)}</span> fotografías
        </span>
        <span aria-hidden className="text-zinc-700">•</span>
        <span>
          <span className="font-semibold text-white">{LOGOS.length}+</span> empresas de transporte
        </span>
        <span aria-hidden className="text-zinc-700">•</span>
        <span>Hecho por la comunidad</span>
      </p>
    </section>
  );
}
