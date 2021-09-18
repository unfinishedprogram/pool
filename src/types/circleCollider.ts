import Vec2 from "../vec2";

export class CircleCollider {
	radius:number;
	pos:Vec2;

	constructor(pos:Vec2, radius:number){
		this.radius = radius;
		this.pos = pos;
	}

	static isColliding(a:CircleCollider, b:CircleCollider){
		let r = a.radius + b.radius;

		if(Math.abs(a.pos.x - b.pos.x) > r){
			return false;
		}

		if(Math.abs(a.pos.y - b.pos.y) > r){
			return false;
		}

		if(Vec2.dist(a.pos, b.pos) > r){
			return false;
		}

		return true;
	}
}