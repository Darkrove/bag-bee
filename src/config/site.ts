export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Buzz Bag",
  description: "pos system for buzz bag",
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

export type DocsConfig = typeof docsConfig

export const docsConfig = {
  mainNav: [
    {
      title: "Invoice",
      href: "/invoice",
    },
    {
      title: "Sales",
      href: "/sales",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
  ],
}
