import videoPokedex from "../../../assets/videos/pokedex.mp4";

import pokedex0 from "../../../assets/images/projects/pokedex/pokedex-0.jpg";
import pokedex1 from "../../../assets/images/projects/pokedex/pokedex-1.jpg";
import pokedex2 from "../../../assets/images/projects/pokedex/pokedex-2.jpg";

import type { ProjectContent } from "../../types";

export default {
  title: "Kinder",
  theme: "light",
  tags: ["php", "javascript", "postgresql", "css"],
  live: "https://institucioneducativavianney.com",
  source: "https://github.com/phpeitor/kinder-vianney",
  videoBorder: true,
  description:
    "Institutional website for I.E.P. San Juan María Vianney with a responsive landing page, visual slider, informational sections, portfolio, contact details, and a complaints book form. Built with Filament, PHP, CSS, and JavaScript for an interactive and engaging experience.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoPokedex,
        caption: "Kinder Demo",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex0,
        alt: "Standard View",
        caption: "Standard View",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex1,
        alt: "Search Functionality",
        caption: "Search Functionality",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex2,
        alt: "Responsive Design",
        caption: "Responsive Design",
      },
    },
  ],
} as const satisfies ProjectContent;
