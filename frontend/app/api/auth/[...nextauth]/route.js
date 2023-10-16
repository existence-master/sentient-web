import User from '@models/user'
import { connectToDB } from '@utils/database'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email 
            })
            
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({ profile }) {
            try {
                await connectToDB()
    
                const userExists = await User.findOne({
                    email : profile.email
                })
    
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "".toLowerCase()),
                        image : profile.picture
                    })
                }
                return true
            }
    
            catch (error) {
                console.log(error)
                return false
            }
        } 
    }
})

export {handler as GET, handler as POST}