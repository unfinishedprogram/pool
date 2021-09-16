class soundSlot {
	free:boolean = true;
	elm:HTMLAudioElement;
	constructor(src:string){
		this.elm = document.createElement("audio") as  HTMLAudioElement;
		this.elm.src = src;
		this.elm.style.display = "none";
		this.elm.setAttribute("preload", "auto");
		this.elm.setAttribute("controls", "none");
		this.elm.volume 

		document.body.appendChild(this.elm);

		this.elm.onended = () => {
			this.free = true;
		}
	}
	play(vol:number) {
		this.elm.volume = vol;
		this.elm.play();
	}
}

class soundBuffer {
	buffer:soundSlot[];
	constructor(src:string, size:number){
		this.buffer = [];

		for(let i = 0; i < size; i++){
			this.buffer.push(new soundSlot(src))
		}
	}

	play(vol:number){
		for(let i = 0; i < this.buffer.length; i++){
			if(this.buffer[i].free){
				this.buffer[i].play(vol);
				return;
			}
		}
	}
}

let hitBuffer = new soundBuffer("hit.mp3", 16);
export function playSound(src:string, vol:number){
	vol = vol <= 1 ? vol : 1
	hitBuffer.play(vol);
}