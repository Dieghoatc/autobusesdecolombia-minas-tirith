"use strict";
exports.__esModule = true;
exports.SliderItem = void 0;
var image_1 = require("next/image");
var SliderItem_module_css_1 = require("./SliderItem.module.css");
function SliderItem(data) {
    return (React.createElement("div", { className: SliderItem_module_css_1["default"].container + " " + SliderItem_module_css_1["default"]["translation-" + data.index] },
        React.createElement("div", { className: SliderItem_module_css_1["default"].slide },
            React.createElement(image_1["default"], { src: data.image || "", alt: "", width: 1920, height: 1080 })),
        React.createElement("div", { className: SliderItem_module_css_1["default"].overlay },
            React.createElement("div", { className: SliderItem_module_css_1["default"].content },
                React.createElement("h3", { className: SliderItem_module_css_1["default"].title }, data.title)))));
}
exports.SliderItem = SliderItem;
