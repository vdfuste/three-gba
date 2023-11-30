import * as Three from "three";
import { loadModel } from "./utils";

const gbaUrls = {
	frontCase: new URL("/models/case_front.glb", import.meta.url),
	backCase: new URL("/models/case_back.glb", import.meta.url),
	screen: new URL("/models/screen.glb", import.meta.url),
	buttonA: new URL("/models/button_a.glb", import.meta.url),
	buttonB: new URL("/models/button_b.glb", import.meta.url),
	buttonCross: new URL("/models/button_cross.glb", import.meta.url),
	buttonStart: new URL("/models/button_start.glb", import.meta.url),
	buttonSelect: new URL("/models/button_select.glb", import.meta.url),
};

const initRotation = new Three.Vector3(-0.2, 0.0, 0.3);

class Component {
	constructor(scene, url) {
		this.model;
		this.pos = new Three.Vector3(0, 0, 0);

		loadModel(url.href, gltf => {
			this.model = gltf.scene;
			this.update(this.pos, initRotation);
			scene.add(this.model);
		});
		
	}
	
	update(position, rotation) {
		if(this.model !== undefined) {
			this.model.position.set(position.x, position.y, position.z);
			this.model.rotation.set(rotation.x, rotation.y, rotation.z);
		}
	}
}

export class GBA {
	constructor(scene) {
		this.frontCase = new Component(scene, gbaUrls.frontCase);
		this.screen = new Component(scene, gbaUrls.screen);
		this.buttonA = new Component(scene, gbaUrls.buttonA);
		this.buttonB = new Component(scene, gbaUrls.buttonB);
		this.buttonCross = new Component(scene, gbaUrls.buttonCross);
		this.buttonStart = new Component(scene, gbaUrls.buttonStart);
		this.buttonSelect = new Component(scene, gbaUrls.buttonSelect);
		this.backCase = new Component(scene, gbaUrls.backCase);
	}

	update(mouse) {
		const position = new Three.Vector3(0, 0, 0);
		const rotation = { ...initRotation };

		rotation.x = initRotation.x + 0.5 * -mouse.y;
		rotation.z = initRotation.z - 0.5 * mouse.x;
		
		//rotation.x = -0.25;
		//rotation.z = 0.5;

		this.frontCase.update(position/*new Three.Vector3(-1, 1, -1)*/, rotation);
		this.screen.update(position/*new Three.Vector3(-0.5, 0, -0.5)*/, rotation);
		this.buttonA.update(position/*new Three.Vector3(-2.5, 4, -1)*/, rotation);
		this.buttonB.update(position/*new Three.Vector3(-2, 3, -1)*/, rotation);
		this.buttonCross.update(position/*new Three.Vector3(-1, 2.5, -1)*/, rotation);
		this.buttonStart.update(position/*new Three.Vector3(-1, 4.5, -1.5)*/, rotation);
		this.buttonSelect.update(position/*new Three.Vector3(-1, 3.5, -1.5)*/, rotation);
		this.backCase.update(position, rotation);
	}
}