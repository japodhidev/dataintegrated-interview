import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import * as jose from 'jose'

const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
)
const alg = 'HS256'

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
				console.log(token)
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
			}

			return token
		},
		async session({ token, session, user }) {
			session.accessToken = token.accessToken

			return session
		}
	}
}

async function generateJWT (audience ='') {
	return await new jose.SignJWT({'urn:example:claim': true})
		.setProtectedHeader({alg})
		.setIssuedAt()
		.setIssuer('japodhidev@gmail.com')
		.setAudience(audience)
		.setExpirationTime('2h')
		.sign(secret)
}

export default NextAuth(authOptions)
