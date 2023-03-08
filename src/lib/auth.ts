import { compare, genSaltSync, hashSync } from "bcrypt-ts"
import { useSession } from "next-auth/react"

export const hashPassword = async (password: string) => {
  const salt = genSaltSync(10)
  const hashedPassword = hashSync(password, salt)

  return hashedPassword
}

export async function verifyPassword(password: any, hashedPassword: any) {
  const isValid = await compare(password, hashedPassword)

  return isValid
}

export function isAuthenticated() {
  const { status } = useSession()
  if (status === "authenticated") return true
  else return false
}

export function isLoading() {
  const { status } = useSession()
  if (status === "loading") return true
  else return false
}
