import Vec2 from "./vec2";

export class StaticCollider {
	pos:Vec2;
	radius:number;
	constructor(pos:Vec2, radius:number){
		this.pos = pos;
		this.radius = radius;
	}
	draw(ctx:CanvasRenderingContext2D){
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
	}
}