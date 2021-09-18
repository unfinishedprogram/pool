import Ball from "./ball";
import { CircleCollider } from "./types/circleCollider";
import Vec2 from "./vec2";

export class StaticCollider extends CircleCollider {
	// _isDrawable = true;
	_isStaticCollider = true;
	constructor(pos:Vec2, radius:number){
		super(pos, radius);
	}
	draw(ctx:CanvasRenderingContext2D){
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
	}
}