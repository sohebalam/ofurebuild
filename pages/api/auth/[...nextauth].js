// import NextAuth from "next-auth"
// import Providers from "next-auth/providers"
// import bcrypt from "bcryptjs"
// import User from "../../../models/userModel"
// import connectDB from "../../../connectDB"

// export default NextAuth({
//   session: {
//     jwt: true,
//   },
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     Providers.GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     Providers.Twitter({
//       clientId: process.env.TWITTER_ID,
//       clientSecret: process.env.TWITTER_SECRET,
//     }),
//     Providers.LinkedIn({
//       clientId: process.env.LINKEDIN_CLIENT_ID,
//       clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
//     }),

//     Providers.Credentials({
//       async authorize(credentials) {
//         connectDB()

//         const { email, password } = credentials

//         // console.log(credentials)

//         // Check if email and password is entered
//         if (!email || !password) {
//           throw new Error("Please enter email or password")
//         }

//         // Find user in the database
//         const user = await User.findOne({ email }).select("+password")

//         if (!user) {
//           throw new Error("Invalid Email or Password")
//         }

//         // Check if password is correct or not
//         const match = await bcrypt.compare(password, user.password)
//         if (!match) {
//           throw new Error("Invalid Email or Password")
//         }

//         return Promise.resolve(user)
//       },
//     }),
//   ],
//   // pages: {
//   //   signIn: "/user/login",
//   // },
//   callbacks: {
//     jwt: async (token, user) => {
//       user && (token.user = user)
//       return Promise.resolve(token)
//     },
//     session: async (session, user) => {
//       session.user = user.user
//       return Promise.resolve(session)
//     },
//   },
// })
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
import LinkedInProvider from "next-auth/providers/linkedin"
import { SocialReg } from "../../../controllers/authCont"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connectDB from "../../../connectDB"
import User from "../../../models/userModel"

export default NextAuth({
  providers: [
    // OAuth authentication providers
    CredentialsProvider({
      async authorize(credentials) {
        connectDB()

        const { email, password } = credentials

        // console.log(credentials)

        // Check if email and password is entered
        if (!email || !password) {
          throw new Error("Please enter email or password")
        }

        // Find user in the database
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
          throw new Error("Invalid Email or Password")
        }

        // Check if password is correct or not
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          throw new Error("Invalid Email or Password")
        }

        return Promise.resolve(user)
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
    }),
  ],
  //   pages: {
  //     signIn: "/login",
  //   },
  // SQL or MongoDB database (or leave empty)
  // database: process.env.DB,

  session: {
    jwt: true,
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    async jwt({ token, user }) {
      console.log("token", token)
      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub

      // console.log("nextauth", session.user)

      if (session?.user.id) {
        SocialReg(session.user)
      }

      return session
    },
  },
})
