declare enum DrawingToolType {
    Select = 0,
    Rectangle = 1,
    Circle = 2,
    Line = 3,
    Freehand = 4
}
declare enum CanvasEngineAction {
    None = 0,
    Move = 1,
    Drag = 2,
    Resize = 3
}
interface IPoint {
    x: number;
    y: number;
}
interface IShape {
}
interface IRectangle extends IShape {
    height: number;
    width: number;
    resize(height: number, width: number): any;
}
interface ICircle extends IShape {
    radius: number;
    resize(radius: number): any;
    area(): number;
}
interface ILine extends IShape {
    p1: IPoint;
    p2: IPoint;
    length(): number;
}
interface IFreehand extends IShape {
    points: Array<IPoint>;
    addPoint(point: IPoint): any;
}
declare class Point implements IPoint {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
declare class Rectangle implements IRectangle {
    height: number;
    width: number;
    constructor(height: number, width: number);
    resize(height: number, width: number): void;
}
declare class Circle implements ICircle {
    radius: number;
    constructor(radius: number);
    resize(radius: number): void;
    area(): number;
}
declare class Line implements ILine {
    p1: IPoint;
    p2: IPoint;
    constructor(p1: IPoint, p2: IPoint);
    length(): number;
}
declare class Freehand implements IFreehand {
    points: Array<IPoint>;
    constructor();
    addPoint(point: Point): void;
}
interface IDraw {
    draw(ctx: CanvasRenderingContext2D): any;
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
interface ICanvasEngine {
    invalidate(): any;
    clear(): any;
    draw(): any;
}
interface IDrawingModel {
    selection: IDrawingShape;
    shapes: IDrawingShape[];
    addShape(shape: IDrawingShape): any;
    getNewShape(location: IPoint): IDrawingShape;
    getDrawingTool(): DrawingToolType;
}
declare class DrawingShapeBase implements IDrawingShape {
    shape: IShape;
    location: IPoint;
    isSelected: boolean;
    selectionZoneWidth: number;
    opacity: number;
    constructor();
    inResizeZone(mouse: IPoint): boolean;
    move(to: IPoint): void;
    resizeToLocation(to: IPoint): void;
    contains(mousePoint: IPoint, ctx: CanvasRenderingContext2D): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
    getMoveOffset(mousePos: IPoint): IPoint;
    getCursorType(mousePoint: IPoint): string;
    getClickLocationAction(mousePoint: Point, ctx: CanvasRenderingContext2D): CanvasEngineAction;
}
declare class DrawingRectangle extends DrawingShapeBase implements IFillStyle {
    shape: IRectangle;
    fillStyle: string;
    constructor();
    draw(ctx: CanvasRenderingContext2D): void;
    inResizeZone(point: IPoint): boolean;
    resizeToLocation(to: IPoint): void;
    contains(mousePoint: IPoint, context: CanvasRenderingContext2D): boolean;
    getMoveOffset(mousePosition: IPoint): IPoint;
    getCursorType(mousePoint: IPoint): "se-resize" | "move";
}
declare class CanvasEngine implements ICanvasEngine {
    private _canvas;
    private _model;
    private context;
    private action;
    private _dragOffsetX;
    private _dragOffsetY;
    constructor(_canvas: HTMLCanvasElement, _model: IDrawingModel);
    clear(): void;
    invalidate(): void;
    draw(): void;
    private _getMousePosition;
    private _setShapeAsSelected;
    private _clearEngineState;
    private _bringToFront;
    private _mousedown;
    private _mousemove;
    private _mouseup;
}
declare class DrawingModel implements IDrawingModel {
    selection: IDrawingShape;
    shapes: IDrawingShape[];
    private _drawingTool;
    private _drawingColor;
    constructor();
    private _addEventListeners;
    addShape(shape: IDrawingShape): void;
    getNewShape(location: IPoint): IDrawingShape;
    getDrawingTool(): DrawingToolType;
}
declare var canvas: HTMLCanvasElement;
declare var model: IDrawingModel;
declare var engine: ICanvasEngine;
