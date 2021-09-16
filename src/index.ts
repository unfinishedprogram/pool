import { PoolTable } from "./poolTable";
import { StaticCollider } from "./staticCollider";
import { Wall } from "./types/wall";
import Vec2 from "./vec2";

const SUBSTEPS = 8;
const c = document.querySelector("canvas")!;

let myTable = new PoolTable(c);

myTable.draw();
myTable.findCollisions();

const CORNERS = [
	new Vec2(8, 59), new Vec2(-8, 59),
	new Vec2(8, -59), new Vec2(-8, -59),
	new Vec2(105, 59), new Vec2(115, 50),
	new Vec2(-105, -59), new Vec2(-115, -50),
	new Vec2(105, -59), new Vec2(115, -50),
	new Vec2(-105, 59), new Vec2(-115, 50),
]

const WALLS = [
	new Wall(new Vec2(-112, 50), new Vec2(-112, -50)),
	new Wall(new Vec2(112, -50), new Vec2(112, 50)),

	new Wall(new Vec2(8, -56), new Vec2(105, -56)),
	new Wall(new Vec2(-105, -56), new Vec2(-8, -56)),

	new Wall(new Vec2(105, 56),new Vec2(8, 56)),
	new Wall(new Vec2(-8, 56), new Vec2(-105, 56)),
]

WALLS.forEach(wall => {
	myTable.addWall(wall);
})
CORNERS.forEach(vec => {
	myTable.addCollider(new StaticCollider(vec, 5.7/2));
})

let physicsLoop = setInterval(() => {
	for(let i = 0; i < SUBSTEPS; i++) {
		myTable.step(0.05);
	}
}, 8)

let drawLoop = setInterval(() => {
	myTable.draw();
}, 16)
