import Ball from "../ball";
import Vec2 from "../vec2";

export class Wall {
	p1:Vec2;
	p2:Vec2;
	mid:Vec2;
	normal:Vec2;
	color: string = "black";

	constructor(a:Vec2, b:Vec2) {
		this.p1 = a;
		this.p2 = b;
		this.mid = this.p1.sub(this.p1.sub(this.p2).multiplyScalor(0.5));

		this.normal = a.sub(b).normalize();
		[this.normal.x, this.normal.y] = [this.normal.y, -this.normal.x]
		console.log(this.normal);

		console.log(this.p1.sub(this.mid).rotateByVec(this.normal), this.p2.sub(this.mid).rotateByVec(this.normal));
	}

	getNormal(){
		return this.normal;
	}

	draw(ctx:CanvasRenderingContext2D){
		ctx.beginPath();

		ctx.moveTo(this.p1.x, this.p1.y);
		ctx.lineTo(this.p2.x, this.p2.y);
		ctx.strokeStyle = this.color;

		let arrow_end = this.mid.add(this.normal.multiplyScalor(2));
		ctx.moveTo(this.mid.x, this.mid.y);
		ctx.lineTo(arrow_end.x, arrow_end.y);
		ctx.stroke();
		ctx.strokeStyle = "black"
	}

	isColliding(ball:Ball) {
		let t_ball = ball.pos.sub(this.mid);
		let t_p1 = this.p1.sub(this.mid);
		let t_p2 = this.p2.sub(this.mid);

		t_ball = t_ball.rotateByVec(this.normal);
		t_p1 = t_p1.rotateByVec(this.normal);
		t_p2 = t_p2.rotateByVec(this.normal);


		if(t_ball.x + ball.radius > t_p1.y) {
			if(t_ball.x < t_p1.x - ball.radius)
				return false;
			if(t_ball.x > t_p2.x + ball.radius)
				return false;
			return true;
		}
		return false;
	}
}
