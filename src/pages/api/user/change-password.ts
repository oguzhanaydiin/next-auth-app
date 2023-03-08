import { hashPassword, verifyPassword } from "@/lib/auth"
import connectToDatabase from "@/lib/db"
import { getSession } from "next-auth/react"

export default async function handler(req: any, res: any) {
  if (req.method !== "PATCH") {
    return
  }

  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" })
    return
  }

  const userEmail = session.user!.email
  const { oldPassword, newPassword } = req.body

  const client = await connectToDatabase()
  const usersCollection = client.db().collection("users")

  const user = await usersCollection.findOne({ email: userEmail })

  console.log(user)

  if (!user) {
    res.status(404).json({ message: "User not found!" })
    client.close()
  }

  const currentPassword = user!.hashedPassword

  console.log("currentPassword", currentPassword)

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

  if (!passwordsAreEqual) {
    client.close()
    res.status(403).json({ message: "Invalid password!" })
    client.close()
  }

  const hashedPassword = await hashPassword(newPassword)

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { hashedPassword } }
  )

  client.close()
  res.status(200).json({ message: "Password updated!" })

  return
}
