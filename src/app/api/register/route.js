import { NextResponse } from "next/server";
import connectDB  from "../../../../utils/connect";
import User from '../../../../models/userModel'
import bcrypt from 'bcrypt'

export async function POST(req){
    try {
        await connectDB();
        const{username , email , password} = await req.json()
        console.log({username , email , password})
        const existUser = await User.findOne({$or:[{email},{username}]})
        if(existUser){
            return NextResponse.json({message: "Username or email already exist"},  {status: 409})
           
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({username, email , password:hashedPassword})
        return NextResponse.json({message: "User Registered"}, {status: 201})
    } catch (error) {
        console.log("error while connecting", error)
        return NextResponse.json({message: "Error While creating User"}, {status: 500})

    }
}