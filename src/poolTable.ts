import Ball from "./ball";
import { Cue } from "./cue";
import { StaticCollider } from "./staticCollider";
import { CircleCollider } from "./types/circleCollider";
import { Drawable } from "./types/drawable";
import { Wall } from "./types/wall";
import Vec2 from "./vec2";

interface IDict {
	[index: number]: number[];
}

export class PoolTable {
	canvas_scale = 8;
	balls: Ball[] = [];
	colliders: StaticCollider[] = [];
	walls:Wall[] = [];

	drawables:Drawable[] = [];

	ctx:CanvasRenderingContext2D;
	canvas:HTMLCanvasElement;
	collision_buffer: Ball[][] = [];

	inner_width:number = 224;
	inner_height:number = 112;
	width: number = 224 + 16; // cm
	height: number = 112 + 16; // cm

	constructor(canvas:HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d")!;
		
		canvas.width = this.width * this.canvas_scale;
		canvas.height = this.height * this.canvas_scale;

		this.addObject(new Ball(new Vec2(0, 0)));

		this.makeBallTriangle();
		this.addObject(new Cue(this))

		this.ctx.transform(1, 0, 0, 1, this.width/2,  this.height/2);

		window.onresize = () => this.fitToWindow();

		this.fitToWindow();
	}

	addObject(obj:any){
		if(obj._isDrawable) this.drawables.push(obj as Drawable);
		if(obj._isBall) this.balls.push(obj as Ball);
		if(obj._isWall)  this.walls.push(obj as Wall);
		if(obj._isStaticCollider) this.colliders.push(obj as StaticCollider);
	}

	draw(){
		this.ctx.scale(this.canvas_scale, this.canvas_scale);
		this.ctx.clearRect(-this.width/2, -this.height/2, this.width, this.height);
		this.drawables.forEach((obj:Drawable) => obj.draw(this.ctx))
		this.ctx.scale(1/this.canvas_scale, 1/this.canvas_scale);
	}

	fitToWindow(){
		let ratio = window.innerWidth / window.innerHeight;
		if(window.innerWidth / window.innerHeight > 2){
			this.canvas_scale = window.innerHeight / this.height;
		} else{
			this.canvas_scale = window.innerWidth / this.width;
		}

		let scaled_height = this.height * this.canvas_scale;
		let scaled_width = this.width * this.canvas_scale;
		this.canvas.width = scaled_width;
		this.canvas.height = scaled_height;
		this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
	}

	makeBallTriangle() {
		let x = 5;
		let r = 6;
		for(let i = 0; i < 5; i++){
			for(let j = x; j > 0; j--){
				this.addObject(new Ball(new Vec2((i * r) - 60, (j * r + r / 2 * i) - r * 3)));
			}
			x -= 1;
		}
	}

	step(t:number) {
		this.balls.forEach(ball => {
			this.walls.forEach(wall => {
				if(wall.isColliding(ball)) {
					wall.applyCollision(ball)
				}
			})
		})

		this.findCollisions();
		this.processCollisions();
		
		this.balls.forEach(ball => {
			this.colliders.forEach(c => {
				if(CircleCollider.isColliding(ball, c)){
					Ball.applyStaticCollision(ball, c);
				}
			})
		})

		this.balls.forEach(ball => ball.step(t));
	}

	findCollisions() {
		let added = {} as IDict;
		this.balls.forEach(a => {
			added[a.id] = [];
			this.balls.forEach(b => {
				if ((a.id != b.id) && CircleCollider.isColliding(a, b)) {
					if(
					!added[a.id]?.includes(b.id) && 
					!added[b.id]?.includes(a.id)) {
						this.collision_buffer.push([a, b])
						added[a.id].push(b.id)
					}
				}
			})
		})
	}

	processCollisions() {
		this.collision_buffer.forEach((pair:Ball[]) => {
			Ball.applyCollison(pair[0], pair[1])
		})
		this.collision_buffer = [];
	}
}