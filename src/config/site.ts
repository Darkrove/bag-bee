export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Bag Bee",
  description: "pos system for bag bee",
  mainNav: [
    {
      title: "Invoice",
      href: "/invoice",
    },
    {
      title: "Sales",
      href: "/sales",
    },
  ],
  url: "https://emailvalidatorv1.vercel.app/",
  ogImage: "https://emailvalidatorv1.vercel.app/og.png",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
