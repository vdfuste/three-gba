import * as Three from "three";
import { addColors, loadModel } from "./utils";
import { mouse } from "./listeners";

export const GBAStates = {
	SELECT_COLOR: "Select color",
	PLAYING: "Playing",
};

const initRotation = new Three.Vector3(-0.2, 0.0, 0.3);
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

const colors = [
	{ class: "purple", value: "C44DD4" },
	{ class: "orange", value: "D47E4D" },
];

addColors(colors);

class Component {
	constructor(scene, url) {
		this.model;
		this.urlMesh = url;
		this.pos = new Three.Vector3(0, 0, 0);

		loadModel(url.href, gltf => {
			this.model = gltf.scene;
			this.update(this.pos, initRotation);
			scene.add(this.model);
		});
	}
	
	update(position, rotation) {
		if(this.model !== undefined) {
			if(gba.state !== GBAStates.SELECT_COLOR) {
				position = new Three.Vector3();
			}
			
			this.model.position.set(position.x, position.y, position.z);
			this.model.rotation.set(rotation.x, rotation.y, rotation.z);

			/*this.model.traverse(obj => {
				if (obj.isMesh) {
					//obj.material.color.set(0xFF00AF);
				}
			});*/
		}
	}
}

class GBA {
	constructor() {
		this.state = GBAStates.PLAYING;
		this.color = colors[0].value;

		this.frontCase;
		this.screenfrontCase;
		this.buttonAfrontCase;
		this.buttonBfrontCase;
		this.buttonCrossfrontCase;
		this.buttonStartfrontCase;
		this.buttonSelectfrontCase;
		this.backCasefrontCase;
	}

	init(scene) {
		this.frontCase = new Component(scene, gbaUrls.frontCase);
		this.screen = new Component(scene, gbaUrls.screen);
		this.buttonA = new Component(scene, gbaUrls.buttonA);
		this.buttonB = new Component(scene, gbaUrls.buttonB);
		this.buttonCross = new Component(scene, gbaUrls.buttonCross);
		this.buttonStart = new Component(scene, gbaUrls.buttonStart);
		this.buttonSelect = new Component(scene, gbaUrls.buttonSelect);
		this.backCase = new Component(scene, gbaUrls.backCase);
	}

	update() {
		const position = new Three.Vector3(0, 0, 0);
		const rotation = { ...initRotation };

		if(this.state === GBAStates.PLAYING) {
			rotation.x = initRotation.x + 0.5 * -mouse.y;
			rotation.z = initRotation.z - 0.5 * mouse.x;
		}
		
		//rotation.x = -0.25;
		//rotation.z = 0.5;

		this.frontCase.update(new Three.Vector3(-1, 1, -1), rotation);
		this.screen.update(new Three.Vector3(-0.5, 0, -0.5), rotation);
		this.buttonA.update(new Three.Vector3(-2.5, 4, -1), rotation);
		this.buttonB.update(new Three.Vector3(-2, 3, -1), rotation);
		this.buttonCross.update(new Three.Vector3(-1, 2.5, -1), rotation);
		this.buttonStart.update(new Three.Vector3(-1, 4.5, -1.5), rotation);
		this.buttonSelect.update(new Three.Vector3(-1, 3.5, -1.5), rotation);
		this.backCase.update(position, rotation);
	}

	setState(newState) {
		this.state = newState;
	}

	setColor(index) {
		this.color = colors[index].value;
	}
}

export const gba = new GBA();
