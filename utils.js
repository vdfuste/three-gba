import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { gba } from "./gba";

const assetLoader = new GLTFLoader();

export const loadModel = (url, callback) => {
	assetLoader.load(url, gltf => callback(gltf), undefined, error => console.log(error));
};

export const addColors = colors => {
	const grid = document.getElementById("colors");

	colors.forEach((color, index) => {
		const button = document.createElement("div");
		button.setAttribute("class", `color ${color.class}`);
		button.addEventListener("click", () => gba.setColor(index));

		grid.appendChild(button);
	});
};