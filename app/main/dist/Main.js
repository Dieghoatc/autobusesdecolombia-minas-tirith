"use client";
"use strict";
exports.__esModule = true;
var Magazine_1 = require("./components/magazine/Magazine");
var Gallery_1 = require("./components/gallery/Gallery");
var header_1 = require("@/components/header");
var hero_1 = require("./components/hero");
//import { AdHorizontal } from "@/components/adsense/AdHorizontal";
//import Footer from "@/components/footer/Footer";
require("./main.css");
var useIsMobile_1 = require("@/lib/hooks/useIsMobile");
function Main() {
    var isMobile = useIsMobile_1.useIsMobile();
    return (React.createElement("div", { className: "main-container" },
        React.createElement(header_1.Header, null),
        !isMobile && React.createElement(hero_1.Hero, null),
        React.createElement(Magazine_1.Magazine, null),
        React.createElement(Gallery_1.Gallery, null)));
}
exports["default"] = Main;
