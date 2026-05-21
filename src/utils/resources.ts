import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { SRGBColorSpace, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import EventEmitter from "./EventEmitter";
import { sources, type Source } from "../sources";

import type { Texture } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const isProd = import.meta.env.PROD;

import type { Group } from "three";

type ResourceType = Texture | GLTF | Group;

class Resources extends EventEmitter<{
  ready: void;
  progress: number;
}> {
  toLoad = sources.length;
  isReady = false;
  loaded = 0;
  items: Record<string, any> = {};

  loaders: {
    gltfLoader: GLTFLoader;
    textureLoader: TextureLoader;
    fontLoader: FontLoader;
    objLoader: OBJLoader;
    mtlLoader: MTLLoader;
  };

  constructor() {
    super();

    const gltfLoader = new GLTFLoader();
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    this.loaders = {
      gltfLoader,
      textureLoader: new TextureLoader(),
      fontLoader: new FontLoader(),
      objLoader: new OBJLoader(),
      mtlLoader: new MTLLoader(),
    };
  }

  startLoading() {
    if (this.isReady) return;

    for (const source of (sources as Source[])) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "objModel") {
        // Try to load an associated .mtl file (same base name) and apply materials.
        try {
          const mtlPath = source.path.replace(/\.obj($|\?)/, ".mtl$1");
          this.loaders.mtlLoader.load(
            mtlPath,
            (materials) => {
              materials.preload();
              this.loaders.objLoader.setMaterials(materials);
              this.loaders.objLoader.load(source.path, (file) => {
                this.sourceLoaded(source, file);
              });
            },
            undefined,
            () => {
              // mtl failed to load; fallback to plain OBJ
              this.loaders.objLoader.load(source.path, (file) => {
                this.sourceLoaded(source, file);
              });
            }
          );
        } catch (e) {
          // If anything goes wrong, just load the OBJ
          this.loaders.objLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
        }
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file: Texture) => {
          file.colorSpace = SRGBColorSpace;
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: { name: string; type: string; path: string }, file: ResourceType) {
    this.items[source.name] = file;

    this.loaded++;

    this.emit("progress", this.loaded / this.toLoad);

    if (this.loaded === this.toLoad) {
      this.isReady = true;
      this.emit("ready");
      this.log("All resources loaded");
    }
  }

  log(message: string) {
    if (isProd) return;
    console.log(`[Resources] ${message}`);
  }
}

export const resources = new Resources();
resources.startLoading();
