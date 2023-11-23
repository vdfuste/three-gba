import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GBA } from "./gba";
import "./style.css";

// Init some variables
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const mouse = new Three.Vector2(0, 0);

const scene = new Three.Scene();
const gba = new GBA(scene);


// Lights
const pointLight = new Three.PointLight(0xFFFFFF, 50, 1000);
pointLight.position.set(3.0, 15.0, 0.0);
scene.add(pointLight);


// Helpers
//const grid = new Three.GridHelper(50, 100, "#FF0000", "#333");
//scene.add(grid);


// Render elements
const canvas = document.getElementById("canvas");
const renderer = new Three.WebGLRenderer({ canvas, alpha: false });
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
renderer.setPixelRatio(2);


// Camera and Controls
const camera = new Three.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100);
camera.position.set(0.0, 25.0, 0.0);
scene.add(camera);

const cameraControls = new OrbitControls(camera, canvas);
cameraControls.enableZoom = false;
cameraControls.enableRotate = false;
cameraControls.enablePan = false;


// Update loop
renderer.setAnimationLoop(() => {
	// Update loop here
	gba.update(mouse);

	// Other stuff
	renderer.render(scene, camera);
});


// Event Listeners
window.addEventListener("mousemove", event => {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});
