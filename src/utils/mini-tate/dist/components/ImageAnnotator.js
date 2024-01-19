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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ImageAnnotator = void 0;
var react_1 = __importStar(require("react"));
var hooks_1 = require("../hooks");
var currAnno_1 = require("../store/reducers/currAnno");
var cursor_1 = require("../store/reducers/cursor");
var modes_1 = require("../store/reducers/modes");
var types_1 = require("../types");
var utils_1 = require("../utils");
var debounce_1 = __importDefault(require("lodash/debounce"));
var AnnotationWrapper_1 = __importDefault(require("./AnnotationWrapper"));
var Form_1 = __importDefault(require("./Form"));
require("./styles.css");
function ImageAnnotator(_a) {
  var imageSrc = _a.imageSrc, annos = _a.annos, onChange = _a.onChange, onError = _a.onError, _b = _a.annotationTypes, annotationTypes = _b === void 0 ? [] : _b, _c = _a.options, options = _c === void 0 ? {} : _c, _d = _a.rainbowMode, rainbowMode = _d === void 0 ? false : _d;
  var dispatch = (0, hooks_1.useAppDispatch)();
  var _e = (0, react_1.useState)(false), imgLoaded = _e[0], setImgLoaded = _e[1];
  var imgRect = (0, hooks_1.useCurrentImg)();
  var _f = (0, hooks_1.useAppSelector)(modes_1.selectMode), edit = _f.edit, drag = _f.drag, cornerDrag = _f.cornerDrag;
  var _g = (0, hooks_1.useAppSelector)(currAnno_1.selectCurrAnno), selectedAnno = _g.selectedAnno, selectedCorner = _g.selectedCorner, updatedCoords = _g.updatedCoords;
  var coords = (0, hooks_1.useAppSelector)(cursor_1.selectCursor).coords;
  var _h = (0, react_1.useState)(false), drawingMode = _h[0], setDrawingMode = _h[1];
  var _j = (0, react_1.useState)(null), boundary = _j[0], setBoundary = _j[1];
  var _k = (0, react_1.useState)([0, 0]), origin = _k[0], setOrigin = _k[1];
  var _l = (0, react_1.useState)(false), displayForm = _l[0], setDisplayForm = _l[1];
  var _m = (0, react_1.useState)([]), annotations = _m[0], setAnnotations = _m[1];
  var _o = (0, react_1.useState)(imgRect), imgRatio = _o[0], setImgRatio = _o[1];
  var _p = (0, react_1.useState)(annos || []), rawAnnos = _p[0], setRawAnnos = _p[1];
  var debouncedPointerMove = (0, react_1.useCallback)((0, debounce_1["default"])(function (e) {
    var clientX = e.clientX, clientY = e.clientY;
    if (!cornerDrag && !drag)
      return;
    if (Number.isNaN(+clientX) || Number.isNaN(+clientY))
      return;
    if (pointOutOfBounds(+clientX, +clientY))
      return;
    if (cornerDrag)
      handleCornerPointerMove(e);
    if (drag)
      handleDrag(e);
  }, 0), [drag, cornerDrag]);
  (0, react_1.useEffect)(function () {
    if (imgRect.height !== 0 && imgRect.width !== 0)
      setImgRatio(imgRect);
  }, [imgRect]);
  (0, react_1.useEffect)(function () {
    if (imgLoaded && imgRatio.height > 0 && imgRatio.width > 0) {
      console.log({ rawAnnos })
      setAnnotations((0, utils_1.rawToCSSAnno)(rawAnnos, imgRatio.height, imgRatio.width));
    }
  }, [rawAnnos, imgLoaded, imgRatio.height, imgRatio.width]);
  (0, react_1.useEffect)(function () {
    var img = document.getElementById('anno-img');
    if (options.imgStyles && img) {
      var _a = img.getBoundingClientRect(), height = _a.height, width = _a.width;
      setImgRatio({ height: height, width: width });
    }
  }, [options.imgStyles]);
  (0, react_1.useEffect)(function () {
    if (annos)
      setRawAnnos(annos);
    dispatch((0, currAnno_1.clearSelectedAnno)());
    dispatch((0, modes_1.setEdit)(false));
  }, [annos]);
  var createNewBoundary = function (x, y) {
    var _a, _b;
    var newBoundary = document.createElement('div');
    var image = (_a = document.getElementById('anno-img')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    if (image) {
      newBoundary.style.top = "".concat(y - image.y, "px");
      newBoundary.style.left = "".concat(x - image.x, "px");
    }
    newBoundary.style.borderWidth = '3px';
    newBoundary.style.borderStyle = 'solid';
    newBoundary.style.position = 'absolute';
    newBoundary.style.boxSizing = 'border-box';
    newBoundary.style.backgroundColor = 'rgba(255, 112, 130, .4)';
    newBoundary.setAttribute('data-testid', 'new-annotation');
    // user overrides default styles
    var annoStyles = options.annoStyles;
    if (annoStyles) {
      Object.keys(annoStyles).forEach(function (key) {
        newBoundary.style[key] = annoStyles[key];
      });
    }
    (_b = document.getElementById('anno-container')) === null || _b === void 0 ? void 0 : _b.appendChild(newBoundary);
    setOrigin([x, y]);
    setBoundary(newBoundary);
    setDrawingMode(true);
    newBoundary.addEventListener('pointerup', function () {
      if (newBoundary.style.width === '') {
        newBoundary.remove();
        setDrawingMode(false);
        return;
      }
      setDrawingMode(false);
      setDisplayForm(true);
    });
  };
  var handleEditAnnotation = function (name) {
    var newSelectedAnno = annotations.find(function (a) { return a.name === name; }) || null;
    if (selectedAnno !== null && selectedAnno !== newSelectedAnno) {
      dispatch((0, currAnno_1.clearSelectedAnno)());
      dispatch((0, modes_1.setEdit)(false));
      return;
    }
    dispatch((0, modes_1.setEdit)(true));
    dispatch((0, currAnno_1.setSelectedAnno)(newSelectedAnno));
  };
  // expects screen coordinates (clientX and clientY from the event)
  // calculates if those screen coordinates are within the bounds of the visible image
  var pointOutOfBounds = function (x, y) {
    var _a, _b;
    var imgBounds = (_a = document.getElementById('anno-img')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    var containerBounds = ((_b = document.getElementById('anno-container')) === null || _b === void 0 ? void 0 : _b.parentNode).getBoundingClientRect();
    if (imgBounds) {
      var top_1 = Math.max(imgBounds.top, containerBounds.top);
      var bottom = Math.min(imgBounds.bottom, containerBounds.bottom);
      var right = Math.min(imgBounds.right, containerBounds.right);
      var left = Math.max(imgBounds.left, containerBounds.left);
      return x < left || x > right || y < top_1 || y > bottom;
    }
    return true;
  };
  var dragBoundary = function (x, y) {
    var _a;
    if (pointOutOfBounds(x, y))
      return;
    var image = (_a = document.getElementById('anno-img')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    if (boundary && image) {
      if (x < origin[0]) {
        boundary.style.left = "".concat(x - image.x, "px");
        boundary.style.width = "".concat(origin[0] - x, "px");
      }
      else {
        boundary.style.width = "".concat(x - origin[0], "px");
      }
      if (y < origin[1]) {
        boundary.style.top = "".concat(y - image.y, "px");
        boundary.style.height = "".concat(origin[1] - y, "px");
      }
      else {
        boundary.style.height = "".concat(y - origin[1], "px");
      }
    }
  };
  var addAnnotation = function (annotation, _a) {
    var name = _a.name, type = _a.type;
    var newAnnotation = {
      height: annotation.style.height,
      width: annotation.style.width,
      top: annotation.style.top,
      left: annotation.style.left,
      name: name,
      type: type,
    };
    if (annotations.find(function (a) { return a.name === name; })) {
      annotation.remove();
      if (onError)
        onError(types_1.errorTypes.DUPLICATE);
      return;
    }
    if (name === '') {
      annotation.remove();
      if (onError)
        onError(types_1.errorTypes.BLANK);
      return;
    }
    if (onChange)
      onChange((0, utils_1.cssToRawAnno)(__spreadArray(__spreadArray([], annotations, true), [newAnnotation], false), imgRatio.height, imgRatio.width));
    setRawAnnos((0, utils_1.cssToRawAnno)(__spreadArray(__spreadArray([], annotations, true), [newAnnotation], false), imgRatio.height, imgRatio.width));
    setAnnotations(__spreadArray(__spreadArray([], annotations, true), [newAnnotation], false));
    annotation.remove();
  };
  var removeAnnotation = function (name) {
    var newAnnotations = annotations.filter(function (a) { return a.name !== name; });
    setRawAnnos((0, utils_1.cssToRawAnno)(newAnnotations, imgRatio.height, imgRatio.width));
    setAnnotations(newAnnotations);
    dispatch((0, modes_1.setEdit)(false));
    dispatch((0, currAnno_1.clearSelectedAnno)());
    if (onChange)
      onChange((0, utils_1.cssToRawAnno)(newAnnotations, imgRatio.height, imgRatio.width));
  };
  var handleCancelEdit = function () {
    dispatch((0, modes_1.setEdit)(false));
    dispatch((0, currAnno_1.clearSelectedAnno)());
  };
  var handleSaveEdit = function (_a, originalName) {
    var height = _a.height, width = _a.width, top = _a.top, left = _a.left, name = _a.name, type = _a.type;
    if (name !== originalName && annotations.find(function (a) { return a.name === name; })) {
      if (onError)
        onError(types_1.errorTypes.DUPLICATE);
    }
    else if (name === '') {
      if (onError)
        onError(types_1.errorTypes.BLANK);
    }
    else {
      var updatedAnno_1 = { height: height, width: width, top: top, left: left, name: name, type: type };
      var newAnnotations = annotations.map(function (a) {
        if (a.name === (selectedAnno === null || selectedAnno === void 0 ? void 0 : selectedAnno.name))
          return updatedAnno_1;
        return a;
      });
      setAnnotations(newAnnotations);
      setRawAnnos((0, utils_1.cssToRawAnno)(newAnnotations, imgRatio.height, imgRatio.width));
      if (onChange)
        onChange((0, utils_1.cssToRawAnno)(newAnnotations, imgRatio.height, imgRatio.width));
    }
    dispatch((0, modes_1.setEdit)(false));
    dispatch((0, currAnno_1.clearSelectedAnno)());
  };
  var handleCornerPointerMove = function (e) {
    if (!cornerDrag)
      return;
    var clientX = e.clientX, clientY = e.clientY;
    var newWidth;
    var newHeight;
    switch (selectedCorner) {
      case types_1.corner.TOP_LEFT:
        newWidth = coords[0] - clientX + (0, utils_1.pixelToNum)(updatedCoords.width);
        newHeight = coords[1] - clientY + (0, utils_1.pixelToNum)(updatedCoords.height);
        if (newWidth <= 0 || newHeight <= 0)
          return;
        dispatch((0, currAnno_1.setLeft)("".concat((0, utils_1.pixelToNum)(updatedCoords.left) + (clientX - coords[0]), "px")));
        dispatch((0, currAnno_1.setTop)("".concat((0, utils_1.pixelToNum)(updatedCoords.top) + (clientY - coords[1]), "px")));
        break;
      case types_1.corner.TOP_RIGHT:
        newWidth = clientX - coords[0] + (0, utils_1.pixelToNum)(updatedCoords.width);
        newHeight = coords[1] - clientY + (0, utils_1.pixelToNum)(updatedCoords.height);
        if (newWidth <= 0 || newHeight <= 0)
          return;
        dispatch((0, currAnno_1.setTop)("".concat((0, utils_1.pixelToNum)(updatedCoords.top) + (clientY - coords[1]), "px")));
        break;
      case types_1.corner.BOTTOM_LEFT:
        newWidth = coords[0] - clientX + (0, utils_1.pixelToNum)(updatedCoords.width);
        newHeight = clientY - coords[1] + (0, utils_1.pixelToNum)(updatedCoords.height);
        if (newWidth <= 0 || newHeight <= 0)
          return;
        dispatch((0, currAnno_1.setLeft)("".concat((0, utils_1.pixelToNum)(updatedCoords.left) + (clientX - coords[0]), "px")));
        break;
      case types_1.corner.BOTTOM_RIGHT:
        newWidth = clientX - coords[0] + (0, utils_1.pixelToNum)(updatedCoords.width);
        newHeight = clientY - coords[1] + (0, utils_1.pixelToNum)(updatedCoords.height);
        if (newWidth <= 0 || newHeight <= 0)
          return;
        break;
      default:
        return;
    }
    dispatch((0, currAnno_1.setWidth)("".concat(newWidth, "px")));
    dispatch((0, currAnno_1.setHeight)("".concat(newHeight, "px")));
    dispatch((0, cursor_1.setCoords)([clientX, clientY]));
  };
  var handleDrag = function (e) {
    var _a;
    if (drag) {
      var clientX = e.clientX, clientY = e.clientY;
      var imgBounds = (_a = document
        .getElementById('anno-img')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
      if (!imgBounds)
        return;
      var newLeft = (0, utils_1.pixelToNum)(updatedCoords.left) + (clientX - coords[0]);
      var newTop = (0, utils_1.pixelToNum)(updatedCoords.top) + (clientY - coords[1]);
      var screenX_1 = newLeft + imgBounds.x;
      var screenY_1 = newTop + imgBounds.y;
      if (pointOutOfBounds(screenX_1, screenY_1))
        return;
      if (pointOutOfBounds(screenX_1 + (0, utils_1.pixelToNum)(updatedCoords.width), screenY_1 + (0, utils_1.pixelToNum)(updatedCoords.height)))
        return;
      dispatch((0, currAnno_1.setLeft)("".concat(newLeft, "px")));
      dispatch((0, currAnno_1.setTop)("".concat(newTop, "px")));
      dispatch((0, cursor_1.setCoords)([clientX, clientY]));
    }
  };
  var handleKeyPress = function (e, name) {
    var key = e.key;
    if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Backspace'].find(function (keyCode) { return keyCode === key; }))
      return;
    e.preventDefault();
    switch (key) {
      case 'ArrowRight':
        dispatch((0, currAnno_1.setLeft)("".concat((0, utils_1.pixelToNum)(updatedCoords.left) + 1, "px")));
        break;
      case 'ArrowLeft':
        dispatch((0, currAnno_1.setLeft)("".concat((0, utils_1.pixelToNum)(updatedCoords.left) - 1, "px")));
        break;
      case 'ArrowUp':
        dispatch((0, currAnno_1.setTop)("".concat((0, utils_1.pixelToNum)(updatedCoords.top) - 1, "px")));
        break;
      case 'ArrowDown':
        dispatch((0, currAnno_1.setTop)("".concat((0, utils_1.pixelToNum)(updatedCoords.top) + 1, "px")));
        break;
      case 'Backspace':
        removeAnnotation(name);
        break;
    }
  };
  return (react_1["default"].createElement("div", {
    "data-testid": "container", id: "anno-container", onPointerDown: function (e) {
      if (drawingMode || edit || displayForm)
        return;
      setDrawingMode(true);
      createNewBoundary(e.clientX, e.clientY);
    }, onPointerMove: function (e) {
      if (drawingMode)
        dragBoundary(e.clientX, e.clientY);
    }, onPointerUp: function () {
      if (drawingMode) {
        setDrawingMode(false);
        setDisplayForm(true);
      }
    }, style: {
      touchAction: 'none',
      display: 'inline-block',
      position: 'relative'
    }
  },
    react_1["default"].createElement("img", {
      alt: "", draggable: "false", id: "anno-img", onLoad: function (e) {
        var _a = e.target.getBoundingClientRect(), height = _a.height, width = _a.width;
        setImgRatio({ height: height, width: width });
        setImgLoaded(true);
      }, onPointerMove: function (e) { return debouncedPointerMove(e); }, src: imageSrc, style: options.imgStyles ? options.imgStyles : {}
    }),

    annotations.map(function (annotation) { console.log({ annotation }); return (react_1["default"].createElement(AnnotationWrapper_1["default"], __assign({ annotationTypes: annotationTypes, handleCancelEdit: handleCancelEdit, handleEditAnnotation: handleEditAnnotation, handleKeyPress: handleKeyPress, handlePointerMove: debouncedPointerMove, handleSaveEdit: handleSaveEdit, key: annotation.name, options: options, removeAnnotation: removeAnnotation, rainbowMode: rainbowMode }, annotation))); }),

    displayForm && (react_1["default"].createElement(Form_1["default"], {
      annotationTypes: annotationTypes, handleCancel: function () {
        boundary === null || boundary === void 0 ? void 0 : boundary.remove();
        setDisplayForm(false);
      }, handleDelete: null, handleSave: function (newAnnotation) {
        setDisplayForm(false);
        if (!boundary)
          return;
        addAnnotation(boundary, newAnnotation);
      }, height: (boundary === null || boundary === void 0 ? void 0 : boundary.style.height) || '', labels: options.labels || {}, left: (boundary === null || boundary === void 0 ? void 0 : boundary.style.left) || '', name: "", top: (boundary === null || boundary === void 0 ? void 0 : boundary.style.top) || '', type: annotationTypes.length ? annotationTypes[0] : '', width: (boundary === null || boundary === void 0 ? void 0 : boundary.style.width) || ''
    }))));
}
exports.ImageAnnotator = ImageAnnotator;
ImageAnnotator.defaultProps = {
  annos: null,
  annotationTypes: [],
  onChange: null,
  onError: null,
  options: []
};
//# sourceMappingURL=ImageAnnotator.js.map