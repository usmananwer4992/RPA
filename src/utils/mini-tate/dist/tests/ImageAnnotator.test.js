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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("@testing-library/react");
var user_event_1 = __importDefault(require("@testing-library/user-event"));
require("@testing-library/jest-dom/extend-expect");
var react_2 = __importDefault(require("react"));
var testUtils_1 = require("../testUtils");
var ImageAnnotator_1 = require("../components/ImageAnnotator");
var testAnnos = [
    {
        name: 'test',
        type: 'string',
        x: 0.2,
        y: 0.2,
        w: 0.2,
        h: 0.2
    },
    {
        name: 'test2',
        type: 'string',
        x: 0.007936507936507936,
        y: 0.20422004521477016,
        w: 0.23412698412698413,
        h: 0.08590806330067823
    },
];
var loadImg = function () {
    return react_1.fireEvent.load(react_1.screen.getByRole('img'), {
        target: { getBoundingClientRect: function () { return ({ height: 100, width: 100 }); } }
    });
};
describe('<ImmageAnnotator />', function () {
    test('renders image', function () {
        (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        expect(react_1.screen.getByRole('img')).toBeDefined();
    });
    test('has no annotations to start', function () {
        (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        expect(react_1.screen.queryByTestId('new-annotation')).toBeNull();
    });
    test('pointerDown creates new annotation', function () {
        (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        var el = react_1.screen.getByTestId('new-annotation');
        expect(el).not.toBeNull();
    });
    test('creating new annotation brings up form', function () {
        (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        for (var i = 1; i <= 20; i++) {
            react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
        }
        react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
        // save and cancel
        expect(react_1.screen.getAllByRole('button')).toHaveLength(2);
    });
    test('form is hidden by default', function () {
        (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        expect(react_1.screen.queryAllByRole('button')).toHaveLength(0);
    });
    test('renders annotations if initialized with annos', function () {
        (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { annos: testAnnos, imageSrc: "" }));
        loadImg();
        expect(react_1.screen.queryAllByTestId('static-annotation')).toHaveLength(2);
    });
    test('filling out form creates new static annotation', function () { return __awaiter(void 0, void 0, void 0, function () {
        var i, inputs, textBox;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
                    react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
                    for (i = 1; i <= 100; i++) {
                        react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
                    }
                    react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
                    inputs = react_1.screen.getAllByRole('textbox');
                    textBox = inputs.find(function (input) { return input.id === 'annotation-name'; });
                    return [4 /*yield*/, user_event_1["default"].type(textBox, 'ANNOTATION NAME')];
                case 1:
                    _a.sent();
                    react_1.fireEvent.click(react_1.screen.getByText('Save'));
                    expect(react_1.screen.queryAllByTestId('static-annotation')).toHaveLength(1);
                    return [2 /*return*/];
            }
        });
    }); });
    test('saving new annotation triggers onChange function', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockOnChange, i, inputs, textBox;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockOnChange = jest.fn();
                    (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "", onChange: mockOnChange }));
                    react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
                    for (i = 1; i <= 100; i++) {
                        react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
                    }
                    react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
                    inputs = react_1.screen.getAllByRole('textbox');
                    textBox = inputs.find(function (input) { return input.id === 'annotation-name'; });
                    return [4 /*yield*/, user_event_1["default"].type(textBox, 'ANNOTATION NAME')];
                case 1:
                    _a.sent();
                    react_1.fireEvent.click(react_1.screen.getByText('Save'));
                    expect(mockOnChange).toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    test('hide form dropdown if there is no type array', function () {
        (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { imageSrc: "" }));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
        react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
        expect(react_1.screen.getAllByRole('textbox')).toHaveLength(1);
    });
    test('form dropdown defaults to first entry in type array when passed custom options', function () {
        (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { annotationTypes: ['cat', 'dog', 'banana'], imageSrc: "" }));
        react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
        react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
        react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
        expect(react_1.screen.getByDisplayValue('cat')).not.toBeNull();
        expect(react_1.screen.getAllByRole('button')).toHaveLength(3);
    });
    test('clicking on static annotation puts it into edit mode', function () { return __awaiter(void 0, void 0, void 0, function () {
        var staticAnno;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { annos: [testAnnos[0]], imageSrc: "" }));
                    loadImg();
                    staticAnno = react_1.screen.getByTestId('static-annotation');
                    return [4 /*yield*/, user_event_1["default"].click(staticAnno)];
                case 1:
                    _a.sent();
                    expect(react_1.screen.getByTestId('editable-annotation')).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    test('editing name of created annotation updates the annotation name', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockOnChange, staticAnno, inputs, textBox, newAnno;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockOnChange = jest.fn();
                    (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { annos: [testAnnos[0]], imageSrc: "", onChange: mockOnChange }));
                    loadImg();
                    staticAnno = react_1.screen.getByTestId('static-annotation');
                    return [4 /*yield*/, user_event_1["default"].click(staticAnno)];
                case 1:
                    _a.sent();
                    inputs = react_1.screen.getAllByRole('textbox');
                    textBox = inputs.find(function (input) { return input.id === 'annotation-name'; });
                    expect(textBox).toBeDefined();
                    return [4 /*yield*/, user_event_1["default"].clear(textBox)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user_event_1["default"].type(textBox, 'UPDATED NAME')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user_event_1["default"].click(react_1.screen.getByText('Save'))];
                case 4:
                    _a.sent();
                    newAnno = __assign(__assign({}, testAnnos[0]), { name: 'UPDATED NAME', h: 0.2, w: 0.2, x: 0.2, y: 0.2 });
                    expect(mockOnChange).toHaveBeenNthCalledWith(1, [newAnno]);
                    return [2 /*return*/];
            }
        });
    }); });
    test('deleting annotation removes it from list', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockOnChange, staticAnno, inputs, textBox;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockOnChange = jest.fn();
                    (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { annos: [testAnnos[0]], imageSrc: "", onChange: mockOnChange }));
                    loadImg();
                    staticAnno = react_1.screen.getByTestId('static-annotation');
                    return [4 /*yield*/, user_event_1["default"].click(staticAnno)];
                case 1:
                    _a.sent();
                    inputs = react_1.screen.getAllByRole('textbox');
                    textBox = inputs.find(function (input) { return input.id === 'annotation-name'; });
                    return [4 /*yield*/, user_event_1["default"].clear(textBox)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user_event_1["default"].type(textBox, 'UPDATED NAME')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user_event_1["default"].click(react_1.screen.getByText('Delete'))];
                case 4:
                    _a.sent();
                    expect(mockOnChange).toHaveBeenNthCalledWith(1, []);
                    return [2 /*return*/];
            }
        });
    }); });
    test('editing name of created annotation then cancelling does not update the annotation', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockOnChange, staticAnno, inputs, textBox;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockOnChange = jest.fn();
                    (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { annos: [testAnnos[0]], imageSrc: "", onChange: mockOnChange }));
                    loadImg();
                    staticAnno = react_1.screen.getByTestId('static-annotation');
                    return [4 /*yield*/, user_event_1["default"].click(staticAnno)];
                case 1:
                    _a.sent();
                    inputs = react_1.screen.getAllByRole('textbox');
                    textBox = inputs.find(function (input) { return input.id === 'annotation-name'; });
                    return [4 /*yield*/, user_event_1["default"].clear(textBox)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user_event_1["default"].type(textBox, 'UPDATED NAME')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user_event_1["default"].click(react_1.screen.getByText('Cancel'))];
                case 4:
                    _a.sent();
                    expect(mockOnChange).toHaveBeenCalledTimes(0);
                    return [2 /*return*/];
            }
        });
    }); });
    test('reusing name calls onError function and does not create new annotation', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockOnError, i, inputs, textBox;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockOnError = jest.fn();
                    (0, testUtils_1.render)(react_2["default"].createElement(ImageAnnotator_1.ImageAnnotator, { annos: testAnnos, imageSrc: "", onError: mockOnError }));
                    loadImg();
                    react_1.fireEvent.pointerDown(react_1.screen.getByRole('img'));
                    for (i = 1; i <= 20; i++) {
                        react_1.fireEvent.pointerMove(react_1.screen.getByTestId('container'));
                    }
                    react_1.fireEvent.pointerUp(react_1.screen.getByRole('img'));
                    inputs = react_1.screen.getAllByRole('textbox');
                    textBox = inputs.find(function (input) { return input.id === 'annotation-name'; });
                    return [4 /*yield*/, user_event_1["default"].clear(textBox)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user_event_1["default"].type(textBox, 'test')];
                case 2:
                    _a.sent();
                    react_1.fireEvent.click(react_1.screen.getByText('Save'));
                    expect(react_1.screen.getAllByTestId('static-annotation')).toHaveLength(2);
                    expect(mockOnError).toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=ImageAnnotator.test.js.map