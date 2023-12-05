import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./listeners";
import { gba } from "./gba";
import "./style.scss";


const scene = new Three.Scene();
gba.init(scene);

// Lights
const pointLight = new Three.PointLight(0xFFFFFF, 350, 1000);
pointLight.position.set(3.0, 15.0, 0.0);
scene.add(pointLight);

const ambientLight = new Three.AmbientLight(0xFFFFFF);
scene.add(ambientLight);


// Helpers
//const grid = new Three.GridHelper(50, 100, "#FF0000", "#333");
//scene.add(grid);


// Render elements
const canvas = document.getElementById("canvas");
const renderer = new Three.WebGLRenderer({ canvas, antialias: true, alpha: true });
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
	gba.update();

	// Other stuff
	renderer.render(scene, camera);
});
