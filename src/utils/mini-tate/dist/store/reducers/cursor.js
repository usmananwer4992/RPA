"use strict";
// Copyright (c) 2023 Alteryx, Inc. All rights reserved.
exports.__esModule = true;
exports.selectCursor = exports.setCoords = exports.cursorSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    coords: []
};
exports.cursorSlice = (0, toolkit_1.createSlice)({
    name: 'cursor',
    initialState: initialState,
    reducers: {
        setCoords: function (state, action) {
            state.coords = action.payload;
        }
    }
});
exports.setCoords = exports.cursorSlice.actions.setCoords;
var selectCursor = function (state) { return state.cursor; };
exports.selectCursor = selectCursor;
exports["default"] = exports.cursorSlice.reducer;
//# sourceMappingURL=cursor.js.map