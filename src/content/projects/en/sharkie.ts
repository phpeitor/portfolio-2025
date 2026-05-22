import videoSharkie from "../../../assets/videos/sharkie.mp4";

import sharkie0 from "../../../assets/images/projects/sharkie/sharkie-0.jpg";
import sharkie1 from "../../../assets/images/projects/sharkie/sharkie-1.jpg";

import type { ProjectContent } from "../../types";

export default {
  title: "MotherDay",
  theme: "light",
  tags: ["javascript", "html", "css"],
  live: "https://ubuntux.metadatape.com/mothers-day",
  source: "https://github.com/phpeitor/mothers-day",
  description:
    "Interactive landing page for Mother's Day with modern animations, particle effects, and smooth transitions. It includes multiple animated sections and a reactive visual experience.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoSharkie,
        caption: "Gameplay",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie0,
        alt: "Heart Card Design",
        caption: "Heart Card Design",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie1,
        alt: "Love Animation",
        caption: "Love Animation",
      },
    },
  ],
} as const satisfies ProjectContent;
