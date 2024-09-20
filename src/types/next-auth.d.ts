import { users } from "@/db/schema"
import type { Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string
type UserRole = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
      role: UserRole
    }
  }
}
