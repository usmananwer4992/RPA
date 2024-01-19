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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Circle_1 = __importDefault(require("@mui/icons-material/Circle"));
var material_1 = require("@mui/material");
var react_1 = __importStar(require("react"));
var Form_1 = __importDefault(require("./Form"));
var types_1 = require("../types");
var utils_1 = require("../utils");
function EditableAnnotation(_a) {
    var height = _a.height, width = _a.width, top = _a.top, left = _a.left, name = _a.name, type = _a.type, handleCancelEdit = _a.handleCancelEdit, handleCornerPointerDown = _a.handleCornerPointerDown, handleCornerPointerUp = _a.handleCornerPointerUp, handleKeyPress = _a.handleKeyPress, handlePointerDown = _a.handlePointerDown, handlePointerMove = _a.handlePointerMove, handlePointerUp = _a.handlePointerUp, handleSaveEdit = _a.handleSaveEdit, removeAnnotation = _a.removeAnnotation, annotationTypes = _a.annotationTypes, options = _a.options;
    var styles = options.editStyles || {};
    var annotationRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var _a;
        (_a = annotationRef === null || annotationRef === void 0 ? void 0 : annotationRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [annotationRef]);
    return (react_1["default"].createElement(material_1.ClickAwayListener, { onClickAway: function () {
            return handleSaveEdit({ height: height, width: width, top: top, left: left, name: name, type: type }, name);
        } },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", { className: "editableAnno", "data-testid": "editable-annotation", ref: annotationRef, onKeyDown: function (e) { return handleKeyPress(e, name); }, onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: handlePointerUp, style: __assign(__assign({}, styles), { top: top, left: left, height: height, width: width }), tabIndex: 0 },
                react_1["default"].createElement(Circle_1["default"], { "data-testid": "corner-tl", fontSize: "small", onPointerDown: function (e) { return handleCornerPointerDown(e, types_1.corner.TOP_LEFT); }, onPointerUp: handleCornerPointerUp, style: {
                        position: 'absolute',
                        marginTop: '-10px',
                        marginLeft: '-10px',
                        color: 'black'
                    } }),
                react_1["default"].createElement(Circle_1["default"], { "data-testid": "corner-tr", fontSize: "small", onPointerDown: function (e) { return handleCornerPointerDown(e, types_1.corner.TOP_RIGHT); }, onPointerUp: handleCornerPointerUp, style: {
                        position: 'absolute',
                        marginTop: '-10px',
                        marginLeft: "".concat((0, utils_1.pixelToNum)(width) - 15, "px"),
                        color: 'black'
                    } }),
                react_1["default"].createElement(Circle_1["default"], { "data-testid": "corner-bl", fontSize: "small", onPointerDown: function (e) {
                        return handleCornerPointerDown(e, types_1.corner.BOTTOM_LEFT);
                    }, onPointerUp: handleCornerPointerUp, style: {
                        position: 'absolute',
                        marginTop: "".concat((0, utils_1.pixelToNum)(height) - 15, "px"),
                        marginLeft: '-10px',
                        color: 'black'
                    } }),
                react_1["default"].createElement(Circle_1["default"], { "data-testid": "corner-br", fontSize: "small", onPointerDown: function (e) {
                        return handleCornerPointerDown(e, types_1.corner.BOTTOM_RIGHT);
                    }, onPointerUp: handleCornerPointerUp, style: {
                        position: 'absolute',
                        marginTop: "".concat((0, utils_1.pixelToNum)(height) - 15, "px"),
                        marginLeft: "".concat((0, utils_1.pixelToNum)(width) - 15, "px"),
                        color: 'black'
                    } })),
            react_1["default"].createElement(Form_1["default"], { annotationTypes: annotationTypes, handleCancel: handleCancelEdit, handleDelete: removeAnnotation, handleSave: handleSaveEdit, height: height, labels: options.labels || {}, left: left, name: name, top: top, type: type, width: width }))));
}
exports["default"] = EditableAnnotation;
//# sourceMappingURL=EditableAnnotation.js.map