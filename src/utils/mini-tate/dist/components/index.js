"use strict";
// Copyright (c) 2023 Alteryx, Inc. All rights reserved.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ImageAnnotatorWrapper = void 0;
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var store_1 = require("../store/store");
var ImageAnnotator_1 = require("./ImageAnnotator");
var theme_1 = __importDefault(require("../theme"));
function ImageAnnotatorWrapper(props) {
    return (react_1["default"].createElement(material_1.ThemeProvider, { theme: theme_1["default"] },
        react_1["default"].createElement(react_redux_1.Provider, { store: store_1.store },
            react_1["default"].createElement(ImageAnnotator_1.ImageAnnotator, __assign({}, props)))));
}
exports.ImageAnnotatorWrapper = ImageAnnotatorWrapper;
//# sourceMappingURL=index.js.map