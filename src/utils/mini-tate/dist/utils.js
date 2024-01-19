"use strict";
// Copyright (c) 2023 Alteryx, Inc. All rights reserved.
exports.__esModule = true;
exports.cssToRawAnno = exports.rawToCSSAnno = exports.pixelToNum = void 0;
var pixelToNum = function (pixelStr) {
  return +pixelStr.substring(0, pixelStr.length - 2);
};
exports.pixelToNum = pixelToNum;
var rawToCSSAnno = function (rawAnnos, imgHeight, imgWidth) {

  return rawAnnos.map(function (anno) {
    return ({
      left: "".concat(anno.x * imgWidth, "px"),
      top: "".concat(anno.y * imgHeight, "px"),
      width: "".concat(anno.w * imgWidth, "px"),
      height: "".concat(anno.h * imgHeight, "px"),
      name: anno.name,
      type: anno.type,
      tagId: anno.id
    });
  });
};
exports.rawToCSSAnno = rawToCSSAnno;
var cssToRawAnno = function (cssAnnos, imgHeight, imgWidth) {
  return cssAnnos.map(function (anno) {
    return ({
      x: (0, exports.pixelToNum)(anno.left) / imgWidth,
      y: (0, exports.pixelToNum)(anno.top) / imgHeight,
      w: (0, exports.pixelToNum)(anno.width) / imgWidth,
      h: (0, exports.pixelToNum)(anno.height) / imgHeight,
      name: anno.name,
      type: anno.type,
      here: 'no'

    });
  });
};
exports.cssToRawAnno = cssToRawAnno;
//# sourceMappingURL=utils.js.map