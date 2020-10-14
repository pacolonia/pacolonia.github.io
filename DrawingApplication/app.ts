// import { DrawingToolType, CanvasEngineAction } from './Enums';

// == Enums ==
enum DrawingToolType {
    Select,
    Rectangle,
    Circle,
    Line,
    Freehand
}

enum CanvasEngineAction {
    None,
    Move,
    Drag,
    Resize
}

// == Interfaces ==
// Shapes Interfaces
interface IPoint {
    x: number;
    y: number;
}

interface IShape {
}

interface IRectangle extends IShape {
    height: number;
    width: number;
    resize(height: number, width: number);
}

interface ICircle extends IShape {
    radius: number;
    resize(radius: number);
    area(): number;
}

interface ILine extends IShape {
    p1: IPoint;
    p2: IPoint;
    length(): number;
}

interface IFreehand extends IShape {
    points: Array<IPoint>;
    addPoint(point: IPoint);
}

// Shapes Implementation
class Point implements IPoint {
    constructor(public x: number, public y: number) { }
}

class Rectangle implements IRectangle {
    constructor(public height: number, public width: number) { }

    public resize(height: number, width: number) {
        this.height = height;
        this.width = width;
    }
}

class Circle implements ICircle {
    constructor(public radius: number) { }
    public resize(radius: number) {
        this.radius = radius;
    }

    public area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Line implements ILine {
    constructor(public p1: IPoint, public p2: IPoint) { }
    public length(): number {
        var a2 = Math.pow(this.p2.x - this.p1.x, 2);
        var b2 = Math.pow(this.p2.y - this.p1.y, 2);
        return Math.sqrt(a2 + b2);
    }
}

class Freehand implements IFreehand {
    public points: Array<IPoint> = [];

    constructor() { }

    public addPoint(point: Point): void {
        this.points.push(point);
    }
}

// Drawing Interfaces
interface IDraw {
    draw(ctx: CanvasRenderingContext2D);
}

interface IResize {
    inResizeZone: (mouse: IPoint) => boolean;
    resizeToLocation: (to: IPoint) => void;
}

interface IMove {
    move: (to: IPoint) => void;
    contains: (mousePoint: IPoint, ctx: CanvasRenderingContext2D) => boolean;
    getMoveOffset(mousePos: IPoint): IPoint;
}

interface IDrawingShape extends IDraw, IResize, IMove {
    shape: IShape;
    location: IPoint;
    isSelected: boolean;
    selectionZoneWidth: number;
    opacity: number;
    getCursorType: (mousePoint: IPoint) => string;
    getClickLocationAction(mouse: IPoint, ctx: CanvasRenderingContext2D): CanvasEngineAction;
}

interface IFillStyle {
    fillStyle: string;
}

interface IStrokeStyle {
    strokeStyle: string;
}

// Engine Interfaces
interface ICanvasEngine {
    invalidate();
    clear();
    draw();
}

interface IDrawingModel {
    selection: IDrawingShape;
    shapes: IDrawingShape[];
    addShape(shape: IDrawingShape);
    getNewShape(location: IPoint): IDrawingShape;
    getDrawingTool(): DrawingToolType;
}

// Drawing Implementation
class DrawingShapeBase implements IDrawingShape {
    public shape: IShape = null;
    public location: IPoint = new Point(0, 0);
    public isSelected: boolean = false;
    public selectionZoneWidth: number = 4;
    public opacity: number = 1;

    constructor() { }

    public inResizeZone(mouse: IPoint): boolean {
        throw "Method not implemented";
    }

    public move(to: IPoint) {
        this.location = to;
    }

    public resizeToLocation(to: IPoint) {
        throw "Method not implemented";
    }

    public contains(mousePoint: IPoint, ctx: CanvasRenderingContext2D): boolean {
        throw "Method not implemented";
    }

    public draw(ctx: CanvasRenderingContext2D) {
        throw "Method not implemented";
    }

    public getMoveOffset(mousePos: IPoint): IPoint {
        return new Point(0, 0);
    }

    public getCursorType(mousePoint: IPoint): string {
        throw "Method not implemented";
    }

    public getClickLocationAction(mousePoint: Point, ctx: CanvasRenderingContext2D): CanvasEngineAction {
        if (this.inResizeZone(mousePoint)) {
            return CanvasEngineAction.Resize;
        }
        else if (this.contains(mousePoint, ctx)) {
            return CanvasEngineAction.Drag;
        }
        return CanvasEngineAction.None;
    }
}

class DrawingRectangle extends DrawingShapeBase implements IFillStyle {
    public shape: IRectangle = new Rectangle(0, 0);
    public fillStyle: string = "#FF0000";
    constructor() {
        super();
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.fillStyle;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(this.location.x, this.location.y, this.shape.width, this.shape.height); ctx.strokeStyle = "#000000"; ctx.lineWidth = 3;
        ctx.strokeRect(this.location.x, this.location.y, this.shape.width, this.shape.height);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.strokeRect(this.location.x, this.location.y, this.shape.width, this.shape.height);
    }

    public inResizeZone(point: IPoint): boolean {
        return ((point.x >= this.location.x + this.shape.width - this.
            selectionZoneWidth &&
            point.x <= this.location.x + this.shape.width + this.
                selectionZoneWidth) &&
            (point.y >= this.location.y + this.shape.height - this.
                selectionZoneWidth &&
                point.y <= this.location.y + this.shape.height + this.
                    selectionZoneWidth));
    }
    public resizeToLocation(to: IPoint) {
        var cursor = window.document.body.style.cursor;
        if (cursor == "se-resize") {
            this.shape.width = to.x - this.location.x;
            this.shape.height = to.y - this.location.y;
        }
    }
    public contains(mousePoint: IPoint, context:
        CanvasRenderingContext2D): boolean {
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
    }
    public getMoveOffset(mousePosition: IPoint): IPoint {
        return new Point(mousePosition.x - this.location.x,
            mousePosition.y - this.location.y);
    }
    public getCursorType(mousePoint: IPoint) {
        if (this.inResizeZone(mousePoint))
            return "se-resize";
        else
            return "move";
    }

}

// Engine Implementation
class CanvasEngine implements ICanvasEngine {
    private context: CanvasRenderingContext2D;
    private action: CanvasEngineAction = CanvasEngineAction.None;
    private _dragOffsetX: number = 0;
    private _dragOffsetY: number = 0;

    constructor(private _canvas: HTMLCanvasElement, private _model:
        IDrawingModel) {
        this.context = this._canvas.getContext("2d");
        this._canvas.addEventListener('mousedown', (e) => this._mousedown(e), true);
        this._canvas.addEventListener('mousemove', (e) => this._mousemove(e), true);
        this._canvas.addEventListener('mouseup', (e) => this._mouseup(e), true);
    }

    public clear() {
        this.context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    public invalidate() {
        window.requestAnimationFrame(() => this.draw());
    }
    public draw() {
        var shapes: Array<IDraw> = this._model.shapes;
        this.clear();
        if (shapes) {
            for (var i = 0; i < shapes.length; i++) {
                this.context.save();
                shapes[i].draw(this.context);
                this.context.restore();
            }
        }
    }

    // #region Private
    private _getMousePosition(canvas: HTMLCanvasElement, e: MouseEvent) {
        var rect = canvas.getBoundingClientRect(),
            root = window.document.documentElement;
        var mouseX = e.clientX - rect.left - root.scrollLeft;
        var mouseY = e.clientY - rect.top - root.scrollTop;
        return new Point(mouseX, mouseY);
    }
    private _setShapeAsSelected(shape: IDrawingShape) {
        shape.isSelected = true;
        this._model.selection = shape;
        this.invalidate();
    }
    private _clearEngineState() {
        this.action = CanvasEngineAction.None;
        this._model.selection = null;
        this.invalidate();
    }
    private _bringToFront(index: number) {
        var shape = this._model.shapes[index];
        if (shape) {
            this._model.shapes.splice(index, 1);
            this._model.shapes.push(shape);
            this.invalidate();
        }
    }
    private _mousedown(e) {
        var mouse: IPoint = this._getMousePosition(this._canvas, e);
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
                        var moveOffsetPoint: IPoint = this._model.shapes[i].getMoveOffset(mouse);
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
    }
    private _mousemove(e) {
        var mouse: IPoint = this._getMousePosition(this._canvas, e);;
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
    }
    private _mouseup(e) {
        var selection = this._model.selection;
        if (selection) {
            selection.isSelected = false;
        }
        this._clearEngineState();
    }
    ////#endregion Private
}

class DrawingModel implements IDrawingModel {
    public selection: IDrawingShape = null;
    public shapes: IDrawingShape[] = [];
    private _drawingTool: DrawingToolType = DrawingToolType.Select;
    private _drawingColor: string = "#000000";
    constructor() {
        this._addEventListeners();
    }
    private _addEventListeners() {
        var selectButton = window.document.getElementById("selectButton");
        selectButton.addEventListener("click", (e) => {
            this._drawingTool = DrawingToolType.Select;
        }, true);
        var rectButton = window.document.getElementById("rectangleButton");
        rectButton.addEventListener("click", (e) => {
            this._drawingTool = DrawingToolType.Rectangle;
        }, true);
        var lineButton = window.document.getElementById("lineButton");
        lineButton.addEventListener("click", (e) => {
            this._drawingTool = DrawingToolType.Line;
        }, true);
        var colorPicker = window.document.getElementById("colorPicker");
        colorPicker.addEventListener("change", (e) => {
            this._drawingColor = (<any>e.currentTarget).value;
        }, true);
    }
    public addShape(shape: IDrawingShape) {
        this.shapes.push(shape);
    }
    public getNewShape(location: IPoint): IDrawingShape {
        var shape: IDrawingShape = null;
        var cursor: string = "auto";
        switch (this._drawingTool) {
            case DrawingToolType.Rectangle:
                shape = new DrawingRectangle();
                shape.move(location);
                (<DrawingRectangle>shape).shape.height = 3;
                (<DrawingRectangle>shape).shape.width = 3;
                (<DrawingRectangle>shape).fillStyle = this._drawingColor;
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
    }
    public getDrawingTool(): DrawingToolType {
        return this._drawingTool;
    }
}




// == App ==
var canvas = <HTMLCanvasElement>window.document.getElementById("drawingCanvas");
// var ctx = canvas.getContext("2d");
// var shape1 = new DrawingRectangle();
// shape1.move(new Point(60, 80));
// shape1.shape.resize(60, 80);
// shape1.draw(ctx);

var model: IDrawingModel = new DrawingModel();
// model.addShape(shape1);
var engine: ICanvasEngine = new CanvasEngine(canvas, model);
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
