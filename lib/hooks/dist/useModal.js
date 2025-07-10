"use strict";
exports.__esModule = true;
exports.useModal = void 0;
var react_1 = require("react");
function useModal() {
    var _a = react_1.useState({
        isOpen: false,
        photo: {}
    }), isModalOpen = _a[0], setIsModalOpen = _a[1];
    var openModal = function (photo) {
        return setIsModalOpen({ isOpen: true, photo: photo });
    };
    var closeModal = function () {
        return setIsModalOpen({ isOpen: false, photo: {} });
    };
    return {
        isModalOpen: isModalOpen,
        openModal: openModal,
        closeModal: closeModal
    };
}
exports.useModal = useModal;
