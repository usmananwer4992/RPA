"use strict";
// Copyright (c) 2023 Alteryx, Inc. All rights reserved.
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function () { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
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
var react_1 = __importStar(require("react"));
var EditableAnnotation_1 = __importDefault(require("./EditableAnnotation"));
var StaticAnnotation_1 = __importDefault(require("./StaticAnnotation"));
var modes_1 = require("../store/reducers/modes");
var hooks_1 = require("../hooks");
var currAnno_1 = require("../store/reducers/currAnno");
var cursor_1 = require("../store/reducers/cursor");
function AnnotationWrapper(_a) {
  // console.log({ _a })
  var handleEditAnnotation = _a.handleEditAnnotation, name = _a.name, height = _a.height, width = _a.width, top = _a.top, left = _a.left, handleCancelEdit = _a.handleCancelEdit, handleKeyPress = _a.handleKeyPress, handlePointerMove = _a.handlePointerMove, handleSaveEdit = _a.handleSaveEdit, removeAnnotation = _a.removeAnnotation, type = _a.type, annotationTypes = _a.annotationTypes, options = _a.options, rainbowMode = _a.rainbowMode;
  var dispatch = (0, hooks_1.useAppDispatch)();
  var _b = (0, hooks_1.useAppSelector)(currAnno_1.selectCurrAnno), selectedAnno = _b.selectedAnno, updatedCoords = _b.updatedCoords;
  var editMode = name === (selectedAnno === null || selectedAnno === void 0 ? void 0 : selectedAnno.name);
  (0, react_1.useEffect)(function () {
    dispatch((0, currAnno_1.setWidth)(width));
    dispatch((0, currAnno_1.setHeight)(height));
    dispatch((0, currAnno_1.setTop)(top));
    dispatch((0, currAnno_1.setLeft)(left));
  }, [top, left, height, width]);
  var handlePointerDown = function (e) {
    e.preventDefault();
    dispatch((0, modes_1.setDrag)(true));
    dispatch((0, cursor_1.setCoords)([e.clientX, e.clientY]));
  };
  var handlePointerUp = function () {
    dispatch((0, modes_1.setDrag)(false));
  };
  var handleCornerPointerDown = function (e, selectedCorner) {
    e.preventDefault();
    e.stopPropagation();
    dispatch((0, modes_1.setCornerDrag)(true));
    dispatch((0, cursor_1.setCoords)([e.clientX, e.clientY]));
    dispatch((0, currAnno_1.setSelectedCorner)(selectedCorner));
  };
  var handleCornerPointerUp = function (e) {
    e.stopPropagation();
    dispatch((0, modes_1.setCornerDrag)(false));
    dispatch((0, currAnno_1.setSelectedCorner)(''));
  };
  var AnnotationToEdit = react_1["default"].forwardRef(function () {
    return (react_1["default"].createElement(EditableAnnotation_1["default"], {
      annotationTypes: annotationTypes, handleCancelEdit: function () {
        handleCancelEdit();
        dispatch((0, currAnno_1.setTop)(top));
        dispatch((0, currAnno_1.setWidth)(width));
        dispatch((0, currAnno_1.setLeft)(left));
        dispatch((0, currAnno_1.setHeight)(height));
      }, handleCornerPointerDown: handleCornerPointerDown, handleCornerPointerUp: handleCornerPointerUp, handleKeyPress: handleKeyPress, handlePointerDown: handlePointerDown, handlePointerMove: handlePointerMove, handlePointerUp: handlePointerUp, handleSaveEdit: function (anno, originalName) {
        handleSaveEdit(__assign(__assign({}, anno), { height: updatedCoords.height || '', width: updatedCoords.width || '', top: updatedCoords.top || '', left: updatedCoords.left || '' }), originalName);
        dispatch((0, modes_1.setDrag)(false));
        dispatch((0, modes_1.setCornerDrag)(false));
        dispatch((0, currAnno_1.setSelectedCorner)(''));
      }, height: updatedCoords.height || '', left: updatedCoords.left || '', name: name, options: options, removeAnnotation: removeAnnotation, top: updatedCoords.top || '', type: type, width: updatedCoords.width || ''
    }));
  });
  if (editMode) {
    return react_1["default"].createElement(AnnotationToEdit, null);
  }
  return (react_1["default"].createElement(StaticAnnotation_1["default"], { tagId: _a.tagId, height: height, left: left, onClick: function () { return handleEditAnnotation(name); }, options: options, top: top, width: width, name: name, types: annotationTypes, type: type, rainbowMode: rainbowMode }));
}
exports["default"] = AnnotationWrapper;
//# sourceMappingURL=AnnotationWrapper.js.map