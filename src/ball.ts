import { playSound } from "./audio";
import { spriteFromId } from "./ballSprite";
import { StaticCollider } from "./staticCollider";
import { CircleCollider } from "./types/circleCollider";
import { Drawable } from "./types/drawable";
import { Wall } from "./types/wall";
import Vec2 from "./vec2";


export default class Ball extends CircleCollider implements Drawable {
	_isDrawable = true;
	_isBall = true;
	static current_id = 0;
	pos:Vec2;
	vol:Vec2 = new Vec2(0,0);
	mass: number = 0.15 ; //kg
	radius: number = 5.7/2; //cm
	active: boolean = true;
	friction: number = 0.0436;
	damping: number = 0.99;

	id:number;
	sprite:HTMLImageElement;

	constructor(pos:Vec2) {
		super(pos, 5.7/2);
		this.id = Ball.getId();
		this.sprite = spriteFromId(this.id);
		this.pos = pos;
		this.vol = new Vec2(0, 0);
	}

	static getId = () => Ball.current_id ++;

	static applyCollison(a:Ball, b:Ball) {
		const n = a.pos.sub(b.pos).normalize();
		let dist = a.pos.sub(b.pos).magnitude();

		b.pos = b.pos.add(n.multiplyScalor( dist-(a.radius+b.radius)))
		a.pos = a.pos.add(n.multiplyScalor( -(dist-(a.radius+b.radius))))

		let p = 2 * ((a.vol.x * n.x + a.vol.y * n.y) - (b.vol.x * n.x + b.vol.y * n.y)) / (a.mass + b.mass);
		
		p = p * (a.damping * b.damping)

		playSound("hit.mp3", Math.abs(p))

		a.vol = a.vol.add(n.multiplyScalor(b.mass * -p));
		b.vol = b.vol.add(n.multiplyScalor(a.mass * p));
	}

	static applyStaticCollision (a:Ball, c:StaticCollider){
		const n = a.pos.sub(c.pos).normalize();
		let dist = a.pos.sub(c.pos).magnitude();
		a.pos = a.pos.add(n.multiplyScalor(-(dist-(a.radius+c.radius))));
		let p = a.vol.x * n.x + a.vol.y * n.y;
		a.vol = a.vol.add(n.multiplyScalor(-p));
	}


	step(t:number) {
		this.pos = this.pos.add(this.vol.multiplyScalor(t))
		this.vol = this.vol.multiplyScalor(1 - (t * this.friction))
	}

	draw(ctx:CanvasRenderingContext2D):void {
		const x1 = (this.pos.x - this.radius);
		const y1 = (this.pos.y - this.radius);
		const x2 = this.radius * 2;
		const y2 = this.radius * 2;
		ctx.drawImage(this.sprite,x1 , y1, x2, y2);
	}
}
