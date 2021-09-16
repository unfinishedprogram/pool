export abstract class Drawable {
	abstract draw(ctx:CanvasRenderingContext2D):void;
	_isDrawable = true;
}