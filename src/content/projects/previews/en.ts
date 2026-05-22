import thumbnailCubeWar from "../../../assets/thumbnails/cubewar.jpg";
import thumbnailQuibbo from "../../../assets/thumbnails/quibbo.jpg";
//import thumbnailParticles from "../../../assets/thumbnails/particles.webp";
import thumbnailPokedex from "../../../assets/thumbnails/pokedex.jpg";
import thumbnailSharkie from "../../../assets/thumbnails/sharkie.jpg";
import thumbnailStreakon from "../../../assets/thumbnails/streakon.jpg";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Cotix360",
    slug: "cotix360",
    thumbnail: thumbnailStreakon,
    description: "App Cotizaciones",
  },
  {
    title: "Xintra",
    slug: "xintra",
    thumbnail: thumbnailCubeWar,
    description: "TicketWeb-App",
  },
  {
    title: "Elephpant",
    slug: "elephpant",
    thumbnail: thumbnailQuibbo,
    description: "Multiplayer-Gaming-Plattform",
  },
  {
    title: "MotherDay",
    slug: "motherday",
    thumbnail: thumbnailSharkie,
    description: "Interactive Landingpage",
  },
  /**  {
    title: "WebGL Particles",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "Dynamic 3D particles",
  }, */
  {
    title: "KinderVianney",
    slug: "kindervianney",
    thumbnail: thumbnailPokedex,
    description: "Open-source learning project",
  },
] as const satisfies ProjectPreview[];
