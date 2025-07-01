"use strict";
exports.__esModule = true;
var zustand_1 = require("zustand");
var usePostStore = zustand_1.create(function (set) { return ({
    post: {},
    setPost: function (newPost) {
        set({ post: newPost });
    },
    loading: true,
    setLoading: function (loading) {
        set({ loading: loading });
    }
}); });
exports["default"] = usePostStore;
