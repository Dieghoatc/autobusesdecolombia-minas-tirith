import { HeaderMobile } from "./HeaderMobile";
import { HeaderDesktop } from "./HeaderDesktop";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
      {/* `relative` anchors the desktop mega menu panel under the bar */}
      <div className="relative hidden md:block">
        <HeaderDesktop />
      </div>
      <div className="md:hidden">
        <HeaderMobile />
      </div>
    </header>
  );
}
