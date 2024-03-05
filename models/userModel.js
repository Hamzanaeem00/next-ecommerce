import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Must Provide a Username"],
        unique: [true, "Must be unique"]
    },
    email :  {
        type: String,
        required: [true, "Must Provide an Email"],
        unique: [true, "Must be unique"]
    },

    password : {
        type: String,
        required: [true, "Must Provide a Password"],
    }
}, {
    timeStamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;