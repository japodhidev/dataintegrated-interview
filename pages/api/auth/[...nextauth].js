import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { generateJWT } from "@/utils/jwt";

export const authOptions = {
	secret: '3002f1c42167459001140ec6389b',
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "user@email.address" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				const token = await generateJWT(credentials.email)
				const user =  { id: "546473", name: credentials.email.split('@')[0], email: credentials.email, token: token }

				if (user) {
					return user
				} else {
					throw new Error("An authorization error occurred! Please try again.")
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.token
				token.name = user.name
			}

			return token
		},
		async session({ token, session, user }) {
			session.accessToken = token.accessToken
			session.name = token.name

			return session
		}
	}
}

export default NextAuth(authOptions)
