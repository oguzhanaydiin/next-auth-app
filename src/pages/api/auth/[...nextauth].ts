import { verifyPassword } from "@/lib/auth"
import connectToDatabase from "@/lib/db"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const client: any = await connectToDatabase()
        const db = client.db()
        const user = await db.collection("users").findOne({
          email,
        })
        if (!user) {
          client.close()
          throw new Error("No user found!")
        }

        const isValid = await verifyPassword(password, user.hashedPassword)

        if (!isValid) {
          client.close()
          throw new Error("Email or Password is wrong!")
        }

        client.close()

        return { id: user._id, email: user.email }
      },
    }),
  ],
}

// async authorize(credentials: any) {
//   const client = await connectToDatabase()
//   const db = client.db()
//   const user = await db.collection("users").findOne({
//     email: credentials.email,
//   })
//   if (!user) {
//     client.close()
//     throw new Error("No user found!")
//   }

//   const isValid = await verifyPassword(
//     credentials.password,
//     user.hashedPassword
//   )

//   if (!isValid) {
//     client.close()
//     throw new Error("Email or Password is wrong!")
//   }

//   client.close()

//   return { email: user.email }
// },

export default NextAuth(authOptions)
