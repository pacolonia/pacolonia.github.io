// import { DrawingToolType, CanvasEngineAction } from './Enums';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// == Enums ==
var DrawingToolType;
(function (DrawingToolType) {
    DrawingToolType[DrawingToolType["Select"] = 0] = "Select";
    DrawingToolType[DrawingToolType["Rectangle"] = 1] = "Rectangle";
    DrawingToolType[DrawingToolType["Circle"] = 2] = "Circle";
    DrawingToolType[DrawingToolType["Line"] = 3] = "Line";
    DrawingToolType[DrawingToolType["Freehand"] = 4] = "Freehand";
})(DrawingToolType || (DrawingToolType = {}));
var CanvasEngineAction;
(function (CanvasEngineAction) {
    CanvasEngineAction[CanvasEngineAction["None"] = 0] = "None";
    CanvasEngineAction[CanvasEngineAction["Move"] = 1] = "Move";
    CanvasEngineAction[CanvasEngineAction["Drag"] = 2] = "Drag";
    CanvasEngineAction[CanvasEngineAction["Resize"] = 3] = "Resize";
})(CanvasEngineAction || (CanvasEngineAction = {}));
// Shapes Implementation
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(height, width) {
        this.height = height;
        this.width = width;
    }
    Rectangle.prototype.resize = function (height, width) {
        this.height = height;
        this.width = width;
    };
    return Rectangle;
}());
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.radius = radius;
    }
    Circle.prototype.resize = function (radius) {
        this.radius = radius;
    };
    Circle.prototype.area = function () {
        return Math.PI * this.radius * this.radius;
    };
    return Circle;
}());
var Line = /** @class */ (function () {
    function Line(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    Line.prototype.length = function () {
        var a2 = Math.pow(this.p2.x - this.p1.x, 2);
        var b2 = Math.pow(this.p2.y - this.p1.y, 2);
        return Math.sqrt(a2 + b2);
    };
    return Line;
}());
var Freehand = /** @class */ (function () {
    function Freehand() {
        this.points = [];
    }
    Freehand.prototype.addPoint = function (point) {
        this.points.push(point);
    };
    return Freehand;
}());
// Drawing Implementation
var DrawingShapeBase = /** @class */ (function () {
    function DrawingShapeBase() {
        this.shape = null;
        this.location = new Point(0, 0);
        this.isSelected = false;
        this.selectionZoneWidth = 4;
        this.opacity = 1;
    }
    DrawingShapeBase.prototype.inResizeZone = function (mouse) {
        throw "Method not implemented";
    };
    DrawingShapeBase.prototype.move = function (to) {
        this.location = to;
    };
    DrawingShapeBase.prototype.resizeToLocation = function (to) {
        throw "Method not implemented";
    };
    DrawingShapeBase.prototype.contains = function (mousePoint, ctx) {
        throw "Method not implemented";
    };
    DrawingShapeBase.prototype.draw = function (ctx) {
        throw "Method not implemented";
    };
    DrawingShapeBase.prototype.getMoveOffset = function (mousePos) {
        return new Point(0, 0);
    };
    DrawingShapeBase.prototype.getCursorType = function (mousePoint) {
        throw "Method not implemented";
    };
    DrawingShapeBase.prototype.getClickLocationAction = function (mousePoint, ctx) {
        if (this.inResizeZone(mousePoint)) {
            return CanvasEngineAction.Resize;
        }
        else if (this.contains(mousePoint, ctx)) {
            return CanvasEngineAction.Drag;
        }
        return CanvasEngineAction.None;
    };
    return DrawingShapeBase;
}());
var DrawingRectangle = /** @class */ (function (_super) {
    __extends(DrawingRectangle, _super);
    function DrawingRectangle() {
        var _this = _super.call(this) || this;
        _this.shape = new Rectangle(0, 0);
        _this.fillStyle = "#FF0000";
        return _this;
    }
    DrawingRectangle.prototype.draw = function (ctx) {
        ctx.fillStyle = this.fillStyle;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(this.location.x, this.location.y, this.shape.width, this.shape.height);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.strokeRect(this.location.x, this.location.y, this.shape.width, this.shape.height);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.strokeRect(this.location.x, this.location.y, this.shape.width, this.shape.height);
    };
    DrawingRectangle.prototype.inResizeZone = function (point) {
        return ((point.x >= this.location.x + this.shape.width - this.
            selectionZoneWidth &&
            point.x <= this.location.x + this.shape.width + this.
                selectionZoneWidth) &&
            (point.y >= this.location.y + this.shape.height - this.
                selectionZoneWidth &&
                point.y <= this.location.y + this.shape.height + this.
                    selectionZoneWidth));
    };
    DrawingRectangle.prototype.resizeToLocation = function (to) {
        var cursor = window.document.body.style.cursor;
        if (cursor == "se-resize") {
            this.shape.width = to.x - this.location.x;
            this.shape.height = to.y - this.location.y;
        }
    };
    DrawingRectangle.prototype.contains = function (mousePoint, context) {
        if (this.shape.height < 0) {
            this.location.y = this.location.y + this.shape.height;
            this.shape.height = this.shape.height * -1;
        }
        if (this.shape.width < 0) {
            this.location.x = this.location.x + this.shape.width;
            this.shape.width = this.shape.width * -1;
        }
        return (this.location.x <= mousePoint.x) &&
            (this.location.x + this.shape.width >= mousePoint.x) &&
            (this.location.y <= mousePoint.y) &&
            (this.location.y + this.shape.height >= mousePoint.y);
    };
    DrawingRectangle.prototype.getMoveOffset = function (mousePosition) {
        return new Point(mousePosition.x - this.location.x, mousePosition.y - this.location.y);
    };
    DrawingRectangle.prototype.getCursorType = function (mousePoint) {
        if (this.inResizeZone(mousePoint))
            return "se-resize";
        else
            return "move";
    };
    return DrawingRectangle;
}(DrawingShapeBase));
// Engine Implementation
var CanvasEngine = /** @class */ (function () {
    function CanvasEngine(_canvas, _model) {
        var _this = this;
        this._canvas = _canvas;
        this._model = _model;
        this.action = CanvasEngineAction.None;
        this._dragOffsetX = 0;
        this._dragOffsetY = 0;
        this.context = this._canvas.getContext("2d");
        this._canvas.addEventListener('mousedown', function (e) { return _this._mousedown(e); }, true);
        this._canvas.addEventListener('mousemove', function (e) { return _this._mousemove(e); }, true);
        this._canvas.addEventListener('mouseup', function (e) { return _this._mouseup(e); }, true);
    }
    CanvasEngine.prototype.clear = function () {
        this.context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };
    CanvasEngine.prototype.invalidate = function () {
        var _this = this;
        window.requestAnimationFrame(function () { return _this.draw(); });
    };
    CanvasEngine.prototype.draw = function () {
        var shapes = this._model.shapes;
        this.clear();
        if (shapes) {
            for (var i = 0; i < shapes.length; i++) {
                this.context.save();
                shapes[i].draw(this.context);
                this.context.restore();
            }
        }
    };
    // #region Private
    CanvasEngine.prototype._getMousePosition = function (canvas, e) {
        var rect = canvas.getBoundingClientRect(), root = window.document.documentElement;
        var mouseX = e.clientX - rect.left - root.scrollLeft;
        var mouseY = e.clientY - rect.top - root.scrollTop;
        return new Point(mouseX, mouseY);
    };
    CanvasEngine.prototype._setShapeAsSelected = function (shape) {
        shape.isSelected = true;
        this._model.selection = shape;
        this.invalidate();
    };
    CanvasEngine.prototype._clearEngineState = function () {
        this.action = CanvasEngineAction.None;
        this._model.selection = null;
        this.invalidate();
    };
    CanvasEngine.prototype._bringToFront = function (index) {
        var shape = this._model.shapes[index];
        if (shape) {
            this._model.shapes.splice(index, 1);
            this._model.shapes.push(shape);
            this.invalidate();
        }
    };
    CanvasEngine.prototype._mousedown = function (e) {
        var mouse = this._getMousePosition(this._canvas, e);
        var i, shape;
        if (this._model.shapes) {
            for (i = this._model.shapes.length - 1; i >= 0; i--) {
                this._model.shapes[i].isSelected = false;
            }
        }
        if (this._model.getDrawingTool() != DrawingToolType.Select) {
            shape = this._model.getNewShape(mouse);
            this._model.addShape(shape);
            this.action = CanvasEngineAction.Resize;
            this._setShapeAsSelected(shape);
            return;
        }
        else if (this._model.shapes) {
            for (i = this._model.shapes.length - 1; i >= 0; i--) {
                this.action = this._model.shapes[i].
                    getClickLocationAction(mouse, this.context);
                switch (this.action) {
                    case CanvasEngineAction.Resize:
                    case CanvasEngineAction.Move:
                        var moveOffsetPoint = this._model.shapes[i].getMoveOffset(mouse);
                        this._dragOffsetX = moveOffsetPoint.x;
                        this._dragOffsetY = moveOffsetPoint.y;
                        this._setShapeAsSelected(this._model.shapes[i]);
                        this._bringToFront(i);
                        return;
                    default:
                        break;
                }
            }
        }
        this._clearEngineState();
    };
    CanvasEngine.prototype._mousemove = function (e) {
        var mouse = this._getMousePosition(this._canvas, e);
        ;
        switch (this.action) {
            case CanvasEngineAction.Move:
                var newLocationX = mouse.x - this._dragOffsetX;
                var newLocationY = mouse.y - this._dragOffsetY;
                var newLocation = new Point(newLocationX, newLocationY);
                this._model.selection.move(newLocation);
                this.invalidate();
                break;
            case CanvasEngineAction.Resize:
                this._model.selection.resizeToLocation(mouse);
                this.invalidate();
                break;
            case CanvasEngineAction.None:
            default:
                var mousePointer = "auto";
                if (this._model.shapes) {
                    for (var i = this._model.shapes.length - 1; i >= 0; i--) {
                        if (this._model.shapes[i].inResizeZone(mouse) ||
                            this._model.shapes[i].contains(mouse, this.
                                context)) {
                            mousePointer = this._model.shapes[i].getCursorType(mouse);
                            break;
                        }
                    }
                }
                window.document.body.style.cursor = mousePointer;
                break;
        }
    };
    CanvasEngine.prototype._mouseup = function (e) {
        var selection = this._model.selection;
        if (selection) {
            selection.isSelected = false;
        }
        this._clearEngineState();
    };
    return CanvasEngine;
}());
var DrawingModel = /** @class */ (function () {
    function DrawingModel() {
        this.selection = null;
        this.shapes = [];
        this._drawingTool = DrawingToolType.Select;
        this._drawingColor = "#000000";
        this._addEventListeners();
    }
    DrawingModel.prototype._addEventListeners = function () {
        var _this = this;
        var selectButton = window.document.getElementById("selectButton");
        selectButton.addEventListener("click", function (e) {
            _this._drawingTool = DrawingToolType.Select;
        }, true);
        var rectButton = window.document.getElementById("rectangleButton");
        rectButton.addEventListener("click", function (e) {
            _this._drawingTool = DrawingToolType.Rectangle;
        }, true);
        var lineButton = window.document.getElementById("lineButton");
        lineButton.addEventListener("click", function (e) {
            _this._drawingTool = DrawingToolType.Line;
        }, true);
        var colorPicker = window.document.getElementById("colorPicker");
        colorPicker.addEventListener("change", function (e) {
            _this._drawingColor = e.currentTarget.value;
        }, true);
    };
    DrawingModel.prototype.addShape = function (shape) {
        this.shapes.push(shape);
    };
    DrawingModel.prototype.getNewShape = function (location) {
        var shape = null;
        var cursor = "auto";
        switch (this._drawingTool) {
            case DrawingToolType.Rectangle:
                shape = new DrawingRectangle();
                shape.move(location);
                shape.shape.height = 3;
                shape.shape.width = 3;
                shape.fillStyle = this._drawingColor;
                cursor = "se-resize";
                break;
            case DrawingToolType.Line:
                // shape = new DrawingLine();
                // (<DrawingLine>shape).shape.p1 = location;
                // (<DrawingLine>shape).shape.p2 = new Point(location.x +
                //     1, location.y + 1);
                // (<DrawingLine>shape).strokeStyle = this._drawingColor;
                // cursor = "e-resize";
                break;
        }
        window.document.body.style.cursor = cursor;
        return shape;
    };
    DrawingModel.prototype.getDrawingTool = function () {
        return this._drawingTool;
    };
    return DrawingModel;
}());
// == App ==
var canvas = window.document.getElementById("drawingCanvas");
// var ctx = canvas.getContext("2d");
// var shape1 = new DrawingRectangle();
// shape1.move(new Point(60, 80));
// shape1.shape.resize(60, 80);
// shape1.draw(ctx);
var model = new DrawingModel();
// model.addShape(shape1);
var engine = new CanvasEngine(canvas, model);
// function moveObject(counter: number, upperLimit: number) {
//     if (counter > upperLimit) {
//         return;
//     }
//     setTimeout(() => {
//         shape1.move(new Point(shape1.location.x + 1, shape1.location.y
//             + 1));
//         engine.invalidate();
//         counter++;
//         moveObject(counter, upperLimit);
//     }, 20);
// }
// moveObject(0, 75);
