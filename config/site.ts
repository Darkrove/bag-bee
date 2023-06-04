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
      title: "Products",
      href: "/products",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
