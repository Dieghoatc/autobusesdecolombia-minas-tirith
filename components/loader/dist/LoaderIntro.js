"use strict";
exports.__esModule = true;
exports.LoaderIntro = void 0;
require("./loader-intro.css");
var singlelogo_png_1 = require("@/assets/singlelogo.png");
var image_1 = require("next/image");
function LoaderIntro() {
    return (React.createElement("div", { className: "loader-intro_container" },
        React.createElement("div", null,
            React.createElement(image_1["default"], { src: singlelogo_png_1["default"].src, alt: "autobuses de colombia logo", className: "abc-logo", width: 100, height: 100 }),
            React.createElement("h1", null, "Autobuses de Colombia"))));
}
exports.LoaderIntro = LoaderIntro;
