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
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = __importStar(require("react"));
var utils_1 = require("../utils");
function Form(_a) {
    var name = _a.name, type = _a.type, top = _a.top, left = _a.left, height = _a.height, width = _a.width, handleSave = _a.handleSave, handleCancel = _a.handleCancel, handleDelete = _a.handleDelete, annotationTypes = _a.annotationTypes, labels = _a.labels;
    var _b = (0, react_1.useState)({ name: name, type: type }), values = _b[0], setValues = _b[1];
    var nameLabel = labels.nameLabel, typeLabel = labels.typeLabel, saveLabel = labels.saveLabel, cancelLabel = labels.cancelLabel, deleteLabel = labels.deleteLabel;
    var calculateFormPosition = function () {
        var leftCoord = (0, utils_1.pixelToNum)(left) + (0, utils_1.pixelToNum)(width) - 350;
        if (leftCoord < (0, utils_1.pixelToNum)(left))
            return left;
        return "".concat(leftCoord, "px");
    };
    return (react_1["default"].createElement(material_1.Card, { style: {
            top: "".concat((0, utils_1.pixelToNum)(top) + (0, utils_1.pixelToNum)(height) + 10, "px"),
            left: "".concat(calculateFormPosition()),
            position: 'absolute',
            zIndex: '1',
            width: 350
        } },
        react_1["default"].createElement("form", { onSubmit: function (e) {
                e.preventDefault();
                handleSave({
                    top: top,
                    left: left,
                    height: height,
                    width: width,
                    name: values.name,
                    type: values.type
                }, name);
            } },
            react_1["default"].createElement(material_1.CardContent, null,
                react_1["default"].createElement(material_1.Grid, { container: true, spacing: 4 },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                        react_1["default"].createElement(material_1.FormControl, { fullWidth: true },
                            react_1["default"].createElement(material_1.TextField, { autoFocus: name === '', id: "annotation-name", onChange: function (e) {
                                    return setValues(__assign(__assign({}, values), { name: e.target.value }));
                                }, value: values.name, label: nameLabel || 'Annotation Name', InputLabelProps: {
                                    shrink: true
                                }, size: "small" }))),
                    annotationTypes.length ? (react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                        react_1["default"].createElement(material_1.FormControl, { fullWidth: true },
                            react_1["default"].createElement(material_1.Autocomplete, { id: "combo-box-demo", options: annotationTypes, onChange: function (_, newValue, reason) {
                                    if (reason === 'clear' && annotationTypes.length)
                                        setValues(__assign(__assign({}, values), { type: annotationTypes[0] }));
                                    else
                                        setValues(__assign(__assign({}, values), { type: newValue }));
                                }, renderInput: function (params) { return (react_1["default"].createElement(material_1.TextField, __assign({}, params, { InputLabelProps: {
                                        shrink: true
                                    }, label: typeLabel || 'Annotation Type' }))); }, size: "small", value: values.type })))) : null)),
            react_1["default"].createElement(material_1.CardActions, { style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    justifyContent: 'right'
                } },
                react_1["default"].createElement(material_1.Button, { color: "primary", onClick: function (e) {
                        e.preventDefault();
                        handleSave({
                            top: top,
                            left: left,
                            height: height,
                            width: width,
                            name: values.name,
                            type: values.type
                        }, name);
                    }, type: "submit", variant: "contained" }, saveLabel || 'Save'),
                react_1["default"].createElement(material_1.Button, { color: "secondary", onClick: handleCancel, variant: "contained" }, cancelLabel || 'Cancel'),
                handleDelete && (react_1["default"].createElement(material_1.Button, { id: "removeAnnoBtn", onClick: function () { return handleDelete(name); }, variant: "contained" }, deleteLabel || 'Delete'))))));
}
exports["default"] = Form;
//# sourceMappingURL=Form.js.map