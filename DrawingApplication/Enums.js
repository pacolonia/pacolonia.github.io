"use strict";
exports.__esModule = true;
exports.CanvasEngineAction = exports.DrawingToolType = void 0;
var DrawingToolType;
(function (DrawingToolType) {
    DrawingToolType[DrawingToolType["Select"] = 0] = "Select";
    DrawingToolType[DrawingToolType["Rectangle"] = 1] = "Rectangle";
    DrawingToolType[DrawingToolType["Circle"] = 2] = "Circle";
    DrawingToolType[DrawingToolType["Line"] = 3] = "Line";
    DrawingToolType[DrawingToolType["Freehand"] = 4] = "Freehand";
})(DrawingToolType = exports.DrawingToolType || (exports.DrawingToolType = {}));
var CanvasEngineAction;
(function (CanvasEngineAction) {
    CanvasEngineAction[CanvasEngineAction["None"] = 0] = "None";
    CanvasEngineAction[CanvasEngineAction["Drag"] = 1] = "Drag";
    CanvasEngineAction[CanvasEngineAction["Resize"] = 2] = "Resize";
})(CanvasEngineAction = exports.CanvasEngineAction || (exports.CanvasEngineAction = {}));
