"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var material_1 = require("@mui/material");
var blue_1 = __importDefault(require("@mui/material/colors/blue"));
// Copyright (c) 2023 Alteryx, Inc. All rights reserved.
var theme = (0, material_1.createTheme)({
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        secondary: blue_1["default"]
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white'
                }
            }
        }
    }
});
exports["default"] = theme;
//# sourceMappingURL=theme.js.map