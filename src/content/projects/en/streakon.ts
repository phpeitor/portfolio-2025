import streakon0 from "../../../assets/images/projects/streakon/streakon-0.jpg";
import streakon1 from "../../../assets/images/projects/streakon/streakon-1.jpg";
import streakon2 from "../../../assets/images/projects/streakon/streakon-2.jpg";
import streakon3 from "../../../assets/images/projects/streakon/streakon-3.jpg";

import type { ProjectContent } from "../../types";

export default {
  title: "Cotix360",
  theme: "dark",
  tags: ["next", "node", "mysql"],
  videoBorder: false,
  live: "https://mgindusol.com",
  description:
    "Web application for user management, item loading, and quotation generation with automatic calculation of costs, freight, expenses, interest, factors, and final prices.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: streakon0,
        alt: "Animated Login with Recaptcha",
        caption: "Animated Login with Recaptcha",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: streakon1,
        alt: "Users, Roles, and Permissions",
        caption: "Users, Roles, and Permissions",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: streakon2,
        alt: "Item and Quotation Management",
        caption: "Item and Quotation Management",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: streakon3,
        alt: "Report Generation",
        caption: "Report Generation",
      },
    },
  ],
} as const satisfies ProjectContent;
