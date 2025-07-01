"use client";
"use strict";
exports.__esModule = true;
exports.Hero = void 0;
var react_1 = require("react");
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
var react_2 = require("@gsap/react");
var Slider_1 = require("./components/slider/Slider");
var Hero_module_css_1 = require("./Hero.module.css");
var chassis_webp_1 = require("@/assets/hero/chassis.webp");
var destinations_webp_1 = require("@/assets/hero/destinations.webp");
var bodywork_webp_1 = require("@/assets/hero/bodywork.webp");
var companies_webp_1 = require("@/assets/hero/companies.webp");
var routes_webp_1 = require("@/assets/hero/routes.webp");
var terminal_webp_1 = require("@/assets/hero/terminal.webp");
var news_webp_1 = require("@/assets/hero/news.webp");
var community_jpg_1 = require("@/assets/hero/community.jpg");
function Hero() {
    var heroRef = react_1.useRef(null);
    react_2.useGSAP(function () {
        gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
        if (heroRef.current) {
            var tl = gsap_1.gsap.timeline({
                scrollTrigger: {
                    start: "top top",
                    end: "+=100%",
                    scrub: true
                }
            });
            tl.to(heroRef.current, {
                scale: 1,
                duration: 1
            });
        }
        return function () {
            ScrollTrigger_1.ScrollTrigger.getAll().forEach(function (trigger) { return trigger.kill(); });
        };
    }, []);
    return (React.createElement("section", { className: Hero_module_css_1["default"].container },
        React.createElement("div", { className: Hero_module_css_1["default"].content_wrapper },
            React.createElement("div", { className: Hero_module_css_1["default"].hero_images, ref: heroRef },
                React.createElement("div", { className: Hero_module_css_1["default"].item },
                    React.createElement("picture", null,
                        React.createElement("img", { src: chassis_webp_1["default"].src, alt: "Fotografia chasis", className: Hero_module_css_1["default"].image }))),
                React.createElement("div", { className: Hero_module_css_1["default"].item },
                    React.createElement("picture", null,
                        React.createElement("img", { src: destinations_webp_1["default"].src, alt: "Fotografia destinos", className: Hero_module_css_1["default"].image }))),
                React.createElement("div", { className: Hero_module_css_1["default"].item },
                    React.createElement("picture", null,
                        React.createElement("img", { src: bodywork_webp_1["default"].src, alt: "Fotografia carroceria de buses", className: Hero_module_css_1["default"].image }))),
                React.createElement("div", { className: Hero_module_css_1["default"].item },
                    React.createElement("picture", null,
                        React.createElement("img", { src: companies_webp_1["default"].src, alt: "Fotografia compa\u00F1ias de transporte", className: Hero_module_css_1["default"].image }))),
                React.createElement("div", { className: Hero_module_css_1["default"].item },
                    React.createElement(Slider_1.Slider, null)),
                React.createElement("div", { className: Hero_module_css_1["default"].item },
                    React.createElement("picture", null,
                        React.createElement("img", { src: community_jpg_1["default"].src, alt: "Fotografia comunidad de transporte", className: Hero_module_css_1["default"].image }))),
                React.createElement("div", { className: Hero_module_css_1["default"].item },
                    React.createElement("picture", null,
                        React.createElement("img", { src: news_webp_1["default"].src, alt: "Fotografia noticias de transporte", className: Hero_module_css_1["default"].image }))),
                React.createElement("div", { className: Hero_module_css_1["default"].item },
                    React.createElement("picture", null,
                        React.createElement("img", { src: terminal_webp_1["default"].src, alt: "Fotografia terminal de transporte colombia", className: Hero_module_css_1["default"].image }))),
                React.createElement("div", { className: Hero_module_css_1["default"].item },
                    React.createElement("picture", null,
                        React.createElement("img", { src: routes_webp_1["default"].src, alt: "Fotografia rutas de colombia", className: Hero_module_css_1["default"].image })))))));
}
exports.Hero = Hero;
