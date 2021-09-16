export function makeBallSprite(color:string, val:number, stripe:boolean) : HTMLImageElement{
	let img = document.createElement("img") as HTMLImageElement;
	let svg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
	<style>
    .small { font: bold 12px serif }
  </style>
<g filter="url(#filter0_ii)">
<mask id="mask0" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
<circle cx="16" cy="16" r="16" fill="#000"/></mask><g mask="url(#mask0)">
<circle cx="16" cy="16" r="16" fill="${stripe ? "#E9E8CD" : color }"/>
<g filter="url(#filter1_d)">
${val >= 8 ? '<rect y="8" width="32" height="16" fill="' + color + '"/>' : ""}
</g>
<g filter="url(#filter2_d)">
${val ? '<circle cx="16" cy="16" r="7.5" fill="#E9E8CD"/>' : ""}
</g></g></g>
<g filter="url(#filter3_d)">
<text id="ball_number" class="small" x="16" y="20" fill="black" text-anchor="middle" alignment-baselin="middle">${val ? val : ""}</text>
</g><defs>
<filter id="filter0_ii" x="0" y="-3" width="32" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-4"/>
<feGaussianBlur stdDeviation="1.5"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/><feGaussianBlur stdDeviation="0.5"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/></filter>
<filter id="filter1_d" x="0" y="8" width="32.2" height="16.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="0.2" dy="0.2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter>
<filter id="filter2_d" x="8.5" y="8.5" width="15.2" height="15.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="0.2" dy="0.2"/><feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter>
<filter id="filter3_d" x="10.7442" y="11.7789" width="11.0936" height="8.42109" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="0.2" dy="0.2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>
`
	img.src= 'data:image/svg+xml;base64,' + window.btoa(svg);
	return img;
}

export function spriteFromId(id:number): HTMLImageElement {
		const color_index = [
			"#E9E8CD", "#FFD707",
			"#1E6D9D", "#FF3501",
			"#7141A3", "#FC900A",
			"#50A323", "#760602",
			"#313131", "#FFD707",
			"#1E6D9D", "#FF3501",
			"#7141A3", "#FC900A",
			"#50A323", "#760602",
		]
		return makeBallSprite(color_index[id], id, id > 8)
}