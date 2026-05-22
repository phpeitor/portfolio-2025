import videoQuibbo from "../../../assets/videos/quibbo.mp4";

import quibbo0 from "../../../assets/images/projects/quibbo/quibbo-0.jpg";
import quibbo1 from "../../../assets/images/projects/quibbo/quibbo-1.jpg";
import quibbo2 from "../../../assets/images/projects/quibbo/quibbo-2.jpg";
import quibbo3 from "../../../assets/images/projects/quibbo/quibbo-3.jpg";

import type { ProjectContent } from "../../types";

export default {
  title: "Elephpant",
  theme: "light",
  tags: ["three", "php", "kubernetes", "redis", "postgresql"],
  videoBorder: true,
  description:
    "A Flappy Bird-style game built on PHP-GLFW. It supports real-time multiplayer matches using WebSockets and Redis for session and data management. The project is deployed on a Kubernetes cluster, showing that PHP can power modern, scalable applications.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoQuibbo,
        caption: "Gameplay",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo0,
        alt: "Avatar Creator",
        caption: "Avatar Creator",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo1,
        alt: "Multiplayer Tic-Tac-Toe",
        caption: "Multiplayer Tic-Tac-Toe",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo2,
        alt: "Multiple Mini-Games",
        caption: "Multiple Mini-Games",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: quibbo3,
        alt: "Avatar Variations",
        caption: "Avatar Variations",
      },
    },
  ],
} as const satisfies ProjectContent;
