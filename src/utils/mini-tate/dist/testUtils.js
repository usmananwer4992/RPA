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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.render = exports.renderEditableAnno = exports.testAnno = void 0;
var react_1 = __importDefault(require("react"));
var react_2 = require("@testing-library/react");
var toolkit_1 = require("@reduxjs/toolkit");
var react_redux_1 = require("react-redux");
var modes_1 = __importDefault(require("./store/reducers/modes"));
var currAnno_1 = __importDefault(require("./store/reducers/currAnno"));
var cursor_1 = __importDefault(require("./store/reducers/cursor"));
var AnnotationWrapper_1 = __importDefault(require("./components/AnnotationWrapper"));
exports.testAnno = {
    name: 'test',
    type: 'cat',
    top: '20px',
    left: '20px',
    width: '20px',
    height: '20px'
};
var renderEditableAnno = function () {
    return (0, exports.render)(react_1["default"].createElement(AnnotationWrapper_1["default"], { annotationTypes: ['cat', 'dog'], handleCancelEdit: jest.fn(), handleEditAnnotation: jest.fn(), handleKeyPress: jest.fn(), handlePointerMove: jest.fn(), handleSaveEdit: jest.fn(), height: "20px", left: "20px", name: exports.testAnno.name, options: {}, removeAnnotation: jest.fn(), top: "20px", type: "cat", width: "20px", rainbowMode: false }), {
        preloadedState: {
            currAnno: {
                selectedAnno: exports.testAnno,
                updatedCoords: {
                    width: exports.testAnno.width,
                    height: exports.testAnno.height,
                    top: exports.testAnno.top,
                    left: exports.testAnno.left
                }
            }
        }
    });
};
exports.renderEditableAnno = renderEditableAnno;
var render = function (ui, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.preloadedState, preloadedState = _b === void 0 ? {} : _b, _c = _a.store, store = _c === void 0 ? (0, toolkit_1.configureStore)({
        reducer: {
            mode: modes_1["default"],
            currAnno: currAnno_1["default"],
            cursor: cursor_1["default"]
        },
        preloadedState: preloadedState
    }) : _c, renderOptions = __rest(_a, ["preloadedState", "store"]);
    function Wrapper(_a) {
        var children = _a.children;
        return react_1["default"].createElement(react_redux_1.Provider, { store: store }, children);
    }
    return (0, react_2.render)(ui, __assign({ wrapper: Wrapper }, renderOptions));
};
exports.render = render;
__exportStar(require("@testing-library/react"), exports);
//# sourceMappingURL=testUtils.js.map