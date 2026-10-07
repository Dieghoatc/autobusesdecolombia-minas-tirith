import { HeaderMobile } from "./HeaderMobile";
import { HeaderDesktop } from "./HeaderDesktop";

export function Header() {
  return (
    <section className="sticky top-0 z-40 w-full border-b border-zinc-800/40 bg-zinc-950/80 backdrop-blur-md shadow-lg shadow-black/20">
      <div className="md:hidden px-4 py-2">
        <HeaderMobile />
      </div>
      <div className="hidden md:block">
        <HeaderDesktop />
      </div>
    </section>
  );
}
