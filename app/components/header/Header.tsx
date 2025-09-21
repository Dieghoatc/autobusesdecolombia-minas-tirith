import { HeaderMobile } from "./components/header-mobile";
import { HeaderDesktop } from "./components/header-desktop";

export function Header() {
  return (
    <section>
      <HeaderMobile />
      <HeaderDesktop />
    </section>
  );
}
