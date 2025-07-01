"use strict";
exports.__esModule = true;
exports.Slider = void 0;
var react_1 = require("react");
var SliderItem_1 = require("../sliderItem/SliderItem");
var usePostStore_1 = require("@/lib/store/usePostStore");
var Slider_module_css_1 = require("./Slider.module.css");
function Slider() {
    var _a = react_1.useState(0), index = _a[0], setIndex = _a[1];
    var post = usePostStore_1["default"]().post;
    react_1.useEffect(function () {
        var interval = setInterval(function () {
            setIndex(function (prevIndex) { return (prevIndex === 2 ? 0 : prevIndex + 0); });
        }, 10000);
        return function () { return clearInterval(interval); };
    }, []);
    return (React.createElement("section", null,
        React.createElement("div", { className: Slider_module_css_1["default"].container },
            React.createElement(SliderItem_1.SliderItem, { type: "post", index: index, image: post.image_url, title: post.title }))));
}
exports.Slider = Slider;
