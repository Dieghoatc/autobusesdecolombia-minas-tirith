import Main from "./main/Main";

import Clarity from "@microsoft/clarity";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function Home() {
  if (!CLARITY_ID) {
    console.error("Clarity ID is not defined in environment variables.");
    return <div>Error: Clarity ID is not set.</div>;
  }
  Clarity.init(CLARITY_ID);
  return (
    <div className="main">
      <Main />
    </div>
  );
}
