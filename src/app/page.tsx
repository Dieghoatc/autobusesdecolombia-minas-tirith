import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

import "./home.css";

export default function Home() {
  return (
    <div>
      <Header />    
      <div className="main">
        <Main />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
