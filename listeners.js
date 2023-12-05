import * as Three from "three";
import { gba, GBAStates } from "./gba";

export const SCREEN_WIDTH = 1024; //window.innerWidth;
export const SCREEN_HEIGHT = 800; //window.innerHeight;
export const mouse = new Three.Vector2(0, 0);

// Event Listeners
window.addEventListener("mousemove", event => {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener("resize", event => {

});

window.addEventListener("mousedown", event => {
	gba.setState(
		["color", "colors"].includes(event.target.classList[0]) ?
		GBAStates.SELECT_COLOR : GBAStates.PLAYING
	);
})