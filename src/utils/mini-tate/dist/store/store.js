"use strict";
// Copyright (c) 2023 Alteryx, Inc. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var modes_1 = __importDefault(require("./reducers/modes"));
var currAnno_1 = __importDefault(require("./reducers/currAnno"));
var cursor_1 = __importDefault(require("./reducers/cursor"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        mode: modes_1["default"],
        currAnno: currAnno_1["default"],
        cursor: cursor_1["default"]
    }
});
//# sourceMappingURL=store.js.map