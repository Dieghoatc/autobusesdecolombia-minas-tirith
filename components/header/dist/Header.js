"use client";
"use strict";
exports.__esModule = true;
exports.Header = void 0;
var react_1 = require("react");
var image_1 = require("next/image");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var react_2 = require("motion/react");
var overlay_1 = require("./components/overlay");
var Header_module_css_1 = require("./Header.module.css");
var singlelogo_png_1 = require("@/assets/singlelogo.png");
var logox2_png_1 = require("@/assets/logox2.png");
function Header() {
    var _a = react_1.useState(false), open = _a[0], setOpen = _a[1];
    react_1.useEffect(function () {
        if (open) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }
        return function () {
            document.body.style.overflow = "";
        };
    }, [open]);
    return (React.createElement("div", { className: Header_module_css_1["default"].container },
        React.createElement("div", { className: Header_module_css_1["default"].container_menu },
            React.createElement("div", { className: Header_module_css_1["default"].menu_mobile },
                React.createElement(react_2.AnimatePresence, { mode: "wait" }, open ? (React.createElement(react_2.motion.div, { key: "close", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.3 }, onClick: function () { return setOpen(false); } },
                    React.createElement(lucide_react_1.X, { className: Header_module_css_1["default"].xmenu }))) : (React.createElement(react_2.motion.div, { key: "menu", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.3 }, onClick: function () { return setOpen(true); } },
                    React.createElement(lucide_react_1.Menu, { className: Header_module_css_1["default"].listMenu }))))),
            React.createElement("div", { className: Header_module_css_1["default"].logo },
                React.createElement(image_1["default"], { src: singlelogo_png_1["default"], alt: "Logo de Autobuses de Colombia", title: "Logo de Autobuses de Colombia", width: 100, height: 100 })),
            React.createElement("div", { className: Header_module_css_1["default"].login }),
            React.createElement("div", { className: Header_module_css_1["default"].logo_large },
                React.createElement(image_1["default"], { src: logox2_png_1["default"], alt: "Logo de Autobuses de Colombia", title: "Logo de Autobuses de Colombia", width: 180, height: 100 })),
            React.createElement("div", { className: Header_module_css_1["default"].menu_desktop },
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement(link_1["default"], { href: "/" }, "Inicio")),
                    React.createElement("li", null,
                        React.createElement(link_1["default"], { href: "/posts" }, "Noticias")),
                    React.createElement("li", null,
                        React.createElement(link_1["default"], { href: "#gallery" }, "Galerias")),
                    React.createElement("li", null,
                        React.createElement(link_1["default"], { href: "/contact" }, "Contacto"))))),
        React.createElement(overlay_1.Overlay, { open: open })));
}
exports.Header = Header;
