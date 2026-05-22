export const social = [
  { url: "mailto:alex1991usat@gmail.com", name: "mail" },
  { url: "https://github.com/phpeitor", name: "github" },
  { url: "https://www.linkedin.com/in/drphp", name: "linkedin" },
  { url: "https://x.com/amvsoftech", name: "x" },
  { url: "https://www.instagram.com/amvsoft.tech", name: "instagram" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
