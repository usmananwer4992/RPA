"use strict";
// Copyright (c) 2023 Alteryx, Inc. All rights reserved.
var _a;
exports.__esModule = true;
exports.selectCurrAnno = exports.clearSelectedAnno = exports.setLeft = exports.setTop = exports.setHeight = exports.setWidth = exports.setSelectedCorner = exports.setSelectedAnno = exports.currAnnoSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
  selectedAnno: null,
  selectedCorner: '',
  updatedCoords: {}
};
exports.currAnnoSlice = (0, toolkit_1.createSlice)({
  name: 'currAnno',
  initialState: initialState,
  reducers: {
    setSelectedAnno: function (state, action) {
      state.selectedAnno = action.payload;
      if (action.payload !== null) {
        state.updatedCoords = {
          width: action.payload.width,
          height: action.payload.height,
          top: action.payload.top,
          left: action.payload.left
        };
      }
    },
    clearSelectedAnno: function (state) {
      state.selectedAnno = null;
      state.updatedCoords = {};
    },
    setSelectedCorner: function (state, action) {
      state.selectedCorner = action.payload;
    },
    setWidth: function (state, action) {
      state.updatedCoords.width = action.payload;
    },
    setHeight: function (state, action) {
      state.updatedCoords.height = action.payload;
    },
    setTop: function (state, action) {
      state.updatedCoords.top = action.payload;
    },
    setLeft: function (state, action) {
      state.updatedCoords.left = action.payload;
    }
  }
});
exports.setSelectedAnno = ((_a = exports.currAnnoSlice.actions, _a.setSelectedAnno), exports.setSelectedCorner = _a.setSelectedCorner, exports.setWidth = _a.setWidth, exports.setHeight = _a.setHeight, exports.setTop = _a.setTop, exports.setLeft = _a.setLeft, exports.clearSelectedAnno = _a.clearSelectedAnno);
var selectCurrAnno = function (state) { return state.currAnno; };
exports.selectCurrAnno = selectCurrAnno;
exports["default"] = exports.currAnnoSlice.reducer;
//# sourceMappingURL=currAnno.js.map