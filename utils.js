import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const assetLoader = new GLTFLoader();

export const loadModel = (url, callback) => {
	assetLoader.load(url, gltf => callback(gltf), undefined, error => console.log(error));
};