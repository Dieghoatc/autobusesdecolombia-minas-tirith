import { Bento } from "./components/Bento";
import "./magazine.css";
import Link from "next/link";

export function Magazine() {
  return (
    <section className="magazine">
      <Bento />
      <div className="magazine__more">
        <Link href="/posts">
          <span>Ver más</span>
        </Link>
      </div>
    </section>
  );
}
