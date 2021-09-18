import Ball from "../ball";
import Vec2 from "../vec2";

export class Wall {
	_isWall = true;
	p1:Vec2;
	p2:Vec2;
	mid:Vec2;
	normal:Vec2;
	color: string = "black";

	constructor(a:Vec2, b:Vec2) {
		this.p1 = a;
		this.p2 = b;
		this.mid = this.p1.sub(this.p1.sub(this.p2).multiplyScalor(0.5))
		this.normal = a.sub(b).normalize().rotate(-90 * Math.PI / 180)
	}

	getNormal(){
		return this.normal;
	}

	draw(ctx:CanvasRenderingContext2D){
		ctx.beginPath();

		ctx.moveTo(this.p1.x, this.p1.y);
		ctx.lineTo(this.p2.x, this.p2.y);
		ctx.strokeStyle = this.color;

		let arrow_end = this.mid.add(this.normal.multiplyScalor(5));

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

		if(t_ball.y - ball.radius > 0) {
			return false;
		}

		if( t_ball.x + ball.radius < t_p1.x || t_ball.x - ball.radius > t_p2.x){
			return false;
		}
		return true
	}

	applyCollision(ball:Ball){
		let t_ball = ball.pos.sub(this.mid);
		t_ball = t_ball.rotateByVec(this.normal);

		ball.pos.add(this.normal.multiplyScalor(t_ball.y))
		ball.vol = ball.vol.sub((this.normal.multiplyScalor(Vec2.dotProduct(ball.vol, this.normal) * 2)))
	}
}
