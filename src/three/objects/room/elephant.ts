import {
  Box3,
  ConeGeometry,
  CylinderGeometry,
  Group,
  LinearFilter,
  LinearSRGBColorSpace,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  ShaderMaterial,
  Vector3,
} from "three";
import { raycast } from "../../utils/raycast";
import { planeGeometry } from "../../common/geometries";
import { resources } from "../../../utils/resources";
import { room } from ".";
import gsap from "gsap";
import vertexShader from "../../shaders/heart/vertex.glsl";
import fragmentShader from "../../shaders/heart/fragment.glsl";
import { playSound } from "../../../features/sounds/utils/sounds";

import type { ClickableBox3 } from "../../types";
import type { Object3D } from "three";

let mesh: Mesh | null = null;
let model: Group | null = null;
let box3: ClickableBox3 | null = null;
let heart: Mesh | null = null;
let heartMaterial: ShaderMaterial | null = null;
let isJumping = false;
let initialized = false;
const targetSize = new Vector3();
const modelSize = new Vector3();
const targetCenter = new Vector3();
const modelCenter = new Vector3();
const elephantMaterial = new MeshBasicMaterial({ color: 0x8f8f8f });
const elephantLightMaterial = new MeshBasicMaterial({ color: 0xb0b0b0 });
const elephantDarkMaterial = new MeshBasicMaterial({ color: 0x2f2f2f });
const tuskMaterial = new MeshBasicMaterial({ color: 0xf1ead8 });

const init = (_mesh: Mesh) => {
  mesh = _mesh;

  if (initialized) return;
  initialized = true;

  mesh.visible = false;

  initModel();
  initHeart();

  box3 = new Box3().setFromObject(model ?? mesh);
  box3.onClick = handleClick;
  box3.hoverSound = "hover";

  raycast.boxesToCheck.push(box3);
};

const initModel = () => {
  if (!mesh) return;

  model = createElephantModel();
  model.name = "elephant-model";

  fitModelToPlaceholder();
  room.group.add(model);
};

const createElephantModel = () => {
  const elephant = new Group();
  const sphere = new SphereGeometry(0.5, 24, 16);
  const cylinder = new CylinderGeometry(0.5, 0.5, 1, 20);
  const cone = new ConeGeometry(0.5, 1, 16);

  const body = new Mesh(sphere, elephantMaterial);
  body.scale.set(1.1, 0.68, 0.58);
  body.position.set(0.18, 0.58, 0);
  elephant.add(body);

  const head = new Mesh(sphere, elephantMaterial);
  head.scale.set(0.58, 0.56, 0.5);
  head.position.set(-0.78, 0.68, 0.08);
  elephant.add(head);

  const nearEar = new Mesh(sphere, elephantLightMaterial);
  nearEar.scale.set(0.12, 0.52, 0.48);
  nearEar.position.set(-0.56, 0.7, 0.42);
  nearEar.rotation.z = -0.12;
  elephant.add(nearEar);

  const farEar = new Mesh(sphere, elephantMaterial);
  farEar.scale.set(0.08, 0.42, 0.38);
  farEar.position.set(-0.57, 0.7, -0.28);
  elephant.add(farEar);

  const trunk = new Mesh(cylinder, elephantMaterial);
  trunk.scale.set(0.15, 0.55, 0.15);
  trunk.rotation.z = -0.08;
  trunk.position.set(-1.12, 0.26, 0.1);
  elephant.add(trunk);

  const trunkTip = new Mesh(sphere, elephantMaterial);
  trunkTip.scale.set(0.17, 0.12, 0.15);
  trunkTip.position.set(-1.18, -0.25, 0.1);
  elephant.add(trunkTip);

  const nearTusk = new Mesh(cone, tuskMaterial);
  nearTusk.scale.set(0.055, 0.28, 0.055);
  nearTusk.rotation.z = -Math.PI * 0.52;
  nearTusk.position.set(-1.17, 0.44, 0.33);
  elephant.add(nearTusk);

  const farTusk = new Mesh(cone, tuskMaterial);
  farTusk.scale.set(0.045, 0.22, 0.045);
  farTusk.rotation.z = -Math.PI * 0.52;
  farTusk.position.set(-1.15, 0.42, -0.12);
  elephant.add(farTusk);

  const eye = new Mesh(sphere, elephantDarkMaterial);
  eye.scale.set(0.05, 0.05, 0.05);
  eye.position.set(-1.03, 0.81, 0.42);
  elephant.add(eye);

  const cheek = new Mesh(sphere, elephantLightMaterial);
  cheek.scale.set(0.11, 0.08, 0.06);
  cheek.position.set(-1.02, 0.58, 0.43);
  elephant.add(cheek);

  const tail = new Mesh(cylinder, elephantMaterial);
  tail.scale.set(0.035, 0.32, 0.035);
  tail.rotation.z = -0.85;
  tail.position.set(1.15, 0.62, -0.02);
  elephant.add(tail);

  const tailTip = new Mesh(sphere, elephantDarkMaterial);
  tailTip.scale.set(0.06, 0.06, 0.06);
  tailTip.position.set(1.32, 0.4, -0.02);
  elephant.add(tailTip);

  const footPositions: [number, number, number][] = [
    [-0.48, 0.08, 0.28],
    [0.55, 0.08, 0.28],
    [-0.34, 0.08, -0.26],
    [0.7, 0.08, -0.26],
  ];

  footPositions.forEach(([x, y, z]) => {
    const leg = new Mesh(cylinder, elephantMaterial);
    leg.scale.set(0.18, 0.34, 0.18);
    leg.position.set(x, y, z);
    elephant.add(leg);

    const foot = new Mesh(sphere, elephantLightMaterial);
    foot.scale.set(0.22, 0.08, 0.18);
    foot.position.set(x - 0.03, -0.19, z + 0.02);
    elephant.add(foot);
  });

  elephant.traverse((child: Object3D) => {
    if (!(child as Mesh).isMesh) return;
    (child as Mesh).castShadow = true;
    (child as Mesh).receiveShadow = true;
  });

  return elephant;
};

const fitModelToPlaceholder = () => {
  if (!mesh || !model) return;

  const targetBox = new Box3().setFromObject(mesh);

  model.rotation.set(0, -0.15, 0);
  model.scale.setScalar(1);
  model.updateMatrixWorld(true);

  const modelBox = new Box3().setFromObject(model);

  targetBox.getSize(targetSize);
  targetBox.getCenter(targetCenter);
  modelBox.getSize(modelSize);

  const scale = targetSize.y / modelSize.y;

  model.scale.setScalar(scale * 1.85);
  model.position.copy(mesh.position);

  const fittedBox = new Box3().setFromObject(model);
  fittedBox.getCenter(modelCenter);

  model.position.x += targetCenter.x - modelCenter.x;
  model.position.y += targetBox.min.y - fittedBox.min.y;
  model.position.z += targetCenter.z - modelCenter.z;
  model.position.x -= targetSize.x * 0.18;
  model.position.z += targetSize.z * 0.02;
};

const initHeart = () => {
  if (!mesh) return;

  const texture = resources.items["icon-spritesheet"];
  texture.colorSpace = LinearSRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;

  heartMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      uTexture: { value: texture },
      uProgress: { value: 0 },
    },
  });

  heart = new Mesh(planeGeometry, heartMaterial);
  heart.position.copy(mesh.position);
  heart.position.x += 0.1;
  heart.position.y += 0.4;
  heart.position.z += 0.1;
  heart.visible = false;

  room.group.add(heart);
};

const handleClick = () => {
  const target = model ?? mesh;
  if (isJumping || !target) return;
  isJumping = true;

  const tl = gsap.timeline();

  playSound("click");

  tl.add(() => {
    isJumping = false;
  }, 0.8);

  tl.to(
    target.position,
    {
      y: target.position.y + 0.18,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    },
    0,
  );

  tl.to(
    target.scale,
    {
      y: target.scale.y * 1.08,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    },
    0,
  );

  if (heart && heartMaterial && heartMaterial.uniforms.uProgress) {
    tl.set(heartMaterial.uniforms.uProgress, { value: 0 }, 0);
    tl.set(heart, { visible: true }, 0);
    tl.to(
      heartMaterial.uniforms.uProgress,
      {
        value: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      0,
    );
    tl.set(heartMaterial.uniforms.uProgress, { value: 1 });
  }
};

const tick = () => {
  if (!mesh || !box3) return;

  box3.setFromObject(model ?? mesh);
  box3.expandByScalar(0.15);

  if (heart && heartMaterial && heartMaterial.uniforms.uProgress) {
    const progress = heartMaterial.uniforms.uProgress.value;
    heart.visible = progress > 0.001 && progress < 0.999;
  }
};

const destroy = () => {
  if (box3) {
    const index = raycast.boxesToCheck.indexOf(box3);
    if (index !== -1) raycast.boxesToCheck.splice(index, 1);
  }
  if (model) room.group.remove(model);
  if (heart) room.group.remove(heart);

  model = null;
  heart = null;
  heartMaterial = null;
  box3 = null;
  mesh = null;
};

export const elephant = { init, tick, destroy };
