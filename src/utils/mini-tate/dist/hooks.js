"use strict";
// Copyright (c) 2023 Alteryx, Inc. All rights reserved.
exports.__esModule = true;
exports.useCurrentImg = exports.useAppSelector = exports.useAppDispatch = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var useAppDispatch = function () { return (0, react_redux_1.useDispatch)(); };
exports.useAppDispatch = useAppDispatch;
exports.useAppSelector = react_redux_1.useSelector;
var useCurrentImg = function () {
    var _a = (0, react_1.useState)({ height: 0, width: 0 }), imgRect = _a[0], setImgRect = _a[1];
    (0, react_1.useEffect)(function () {
        var resizeListener = function () {
            var newImgRect = { height: 0, width: 0 };
            var annoImg = document.getElementById('anno-img');
            if (annoImg) {
                var _a = annoImg.getBoundingClientRect(), height = _a.height, width = _a.width;
                newImgRect = { height: height, width: width };
            }
            setImgRect(newImgRect);
        };
        window.addEventListener('resize', resizeListener);
        return function () {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);
    return imgRect;
};
exports.useCurrentImg = useCurrentImg;
//# sourceMappingURL=hooks.js.map