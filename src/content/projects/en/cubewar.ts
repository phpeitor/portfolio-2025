import videoCubeWar from "../../../assets/videos/cubewar.mp4";

import cubewar0 from "../../../assets/images/projects/cubewar/cubewar-0.jpg";
import cubewar1 from "../../../assets/images/projects/cubewar/cubewar-1.jpg";
import cubewar2 from "../../../assets/images/projects/cubewar/cubewar-2.jpg";
import cubewar3 from "../../../assets/images/projects/cubewar/cubewar-3.jpg";
import cubewar4 from "../../../assets/images/projects/cubewar/cubewar-4.jpg";

import type { ProjectContent } from "../../types";

export default {
  title: "Xintra",
  theme: "dark",
  tags: ["three", "laravel", "websockets", "redis"],
  videoBorder: false,
  live: "https://sales.metadatape.com",
  description:
    "XINTRA Elephpant is a comprehensive web application for managing tickets, clients, users, and inventory with an interactive and animated interface. Developed with Laravel, Three.js, WebSockets, and Redis, it offers a smooth and visually appealing experience for service and product administration.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoCubeWar,
        caption: "Demo",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar0,
        alt: "Dashboard",
        caption: "Dashboard",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar1,
        alt: "Ticket Management",
        caption: "Ticket Management",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar2,
        alt: "Sales Analytics",
        caption: "Sales Analytics",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar3,
        alt: "Responsive Design",
        caption: "Responsive Design",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar4,
        alt: "Calendar View",
        caption: "Calendar View",
      },
    },
  ],
} as const satisfies ProjectContent;
