"use strict";
// Copyright (c) 2023 Alteryx, Inc. All rights reserved.
var _a;
exports.__esModule = true;
exports.selectMode = exports.setCornerDrag = exports.setDrag = exports.setEdit = exports.modeSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
  edit: false,
  drag: false,
  cornerDrag: false
};
exports.modeSlice = (0, toolkit_1.createSlice)({
  name: 'mode',
  initialState: initialState,
  reducers: {
    setEdit: function (state, action) {
      state.edit = action.payload;
    },
    setDrag: function (state, action) {
      state.drag = action.payload;
    },
    setCornerDrag: function (state, action) {
      state.cornerDrag = action.payload;
    }
  }
});
exports.setEdit = ((_a = exports.modeSlice.actions, _a.setEdit), exports.setDrag = _a.setDrag, exports.setCornerDrag = _a.setCornerDrag);
var selectMode = function (state) { return state.mode; };
exports.selectMode = selectMode;
exports["default"] = exports.modeSlice.reducer;
//# sourceMappingURL=modes.js.map