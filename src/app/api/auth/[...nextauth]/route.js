import { MongoDBAdapter } from '@auth/mongodb-adapter'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '../../../../../lib/mongodb'
import CredentialsProvider from "next-auth/providers/credentials"
import User from '../../../../../models/userModel'
import connectDB from '../../../../../utils/connect'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth/next'



const login = async (credentials)=>{
  try {
    connectDB()
    const user = await User.findOne({email:credentials.email})
    if (!user){
      throw new Error("No user found")
    }
    const isCorrect = await bcrypt.compare(credentials.password , user.password)
    console.log(isCorrect)
    if(!isCorrect){
      throw new Error("Wrong Password")
    }
    return user
  } catch (error) {
    console.log("Error", error)
  }
}

const handler = NextAuth({
  pages:{
    signIn: '/login'
  },
  providers: [

    CredentialsProvider({
      name: "credentials",
      credentials:{},
      async authorize(credentials) {
            try {
              const user = await login(credentials)
             console.log({credentials})
             return user
            } catch (error) {
             throw new Error("Failed to Login")
            }
                },
    }),


    GoogleProvider({
      clientId: "199596075772-qc25615rjnitc80f2vnoiu31q0bhq5ib.apps.googleusercontent.com" , 
      clientSecret: "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"
    }),
],
callbacks:{
  async jwt({token, user}){
if(user){
  token.username = user.username 
  token.email = user.email
  token.id = user.id
}
console.log("this is token",token)
return token
},
 async session({session,token}){
  if(token){
    session.user.username = token.username
    session.user.email = token.email
    session.user.id = token.id
  }
  return session
 }

},

adapter: MongoDBAdapter(clientPromise)
})

export { handler as GET, handler as POST }