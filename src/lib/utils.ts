import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function linkConstructor({
  key,
  domain = "yourbill.vercel.app",
  localhost,
  pretty,
  noDomain,
}: {
  key: string
  domain?: string
  localhost?: boolean
  pretty?: boolean
  noDomain?: boolean
}) {
  const link = `${
    localhost ? "http://home.localhost:8888" : `https://${domain}`
  }${key !== "_root" ? `/${key}` : ""}`

  if (noDomain) return `/${key}`
  return pretty ? link.replace(/^https?:\/\//, "") : link
}
