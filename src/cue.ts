import Ball from "./ball";
import { PoolTable } from "./poolTable";
import Vec2 from "./vec2";

export class Cue {
	table:PoolTable;
	ball:Ball;
	selected:boolean;
	sprite: HTMLImageElement;
	mousePos: Vec2;
	max_dist:number = 40;

	constructor(table:PoolTable){
		this.mousePos = new Vec2(0, 0);
		this.ball = table.balls[0];
		this.selected = false;
		this.table = table;
		this.sprite = document.createElement("img");
		this.setup();
	}

	setup() {
		this.sprite.src = "../assets/cue.svg"
		this.table.canvas.addEventListener("mousedown", this.click)
	}

	click = (e:MouseEvent) => {
		if(this.ballClicked(e)){
			this.selected = true;
			this.updateMousePos(e);
			document.addEventListener('mousemove', this.updateMousePos)
			document.addEventListener('mouseup', this.release)
		}
	}

	ballClicked = (e:MouseEvent):boolean => {
		return Vec2.dist(this.ball.pos, this.clickToWorld(e)) < this.ball.radius;
	}

	clickToWorld = (e:MouseEvent): Vec2 => {
		let offX = this.table.canvas.offsetLeft;
		let offY = this.table.canvas.offsetTop;
		return new Vec2((e.clientX - offX)/this.table.canvas_scale - this.table.width/2, (e.clientY - offY)/this.table.canvas_scale - this.table.height/2);
	}

	release = (e:MouseEvent) => {
		document.removeEventListener('mousemove', this.updateMousePos)
		document.removeEventListener('mouseup', this.release)

		if(this.selected){
			let diff = this.ball.pos.sub(this.mousePos);
			let n = diff.normalize();
			let d = diff.magnitude();

			if(d > this.max_dist) d = this.max_dist;

			this.ball.vol = n.multiplyScalor(d)
			this.selected = false;
		}
	}

	updateMousePos = (e:MouseEvent) => {
		this.mousePos = this.clickToWorld(e);
	}

	draw(ctx:CanvasRenderingContext2D) {
		if(this.selected){
			let diff = this.ball.pos.sub(this.mousePos);
			let n = diff.normalize().multiplyScalor(-1);
			let d = diff.magnitude();
			if(d > this.max_dist) d = this.max_dist;
			let a = Math.atan2(n.y, n.x)
			ctx.translate(this.ball.pos.x, this.ball.pos.y)
			ctx.rotate(a)
			ctx.drawImage(this.sprite, d, -2);
			ctx.rotate(-a)
			ctx.translate(-this.ball.pos.x, -this.ball.pos.y)
		}
	}
}