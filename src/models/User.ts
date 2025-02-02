import bcrypt from "bcryptjs";
import mongoose, { Schema, model, models } from "mongoose";

export interface UserTypes {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    UpdatedAt?: Date;
}

const userSchema = new Schema<UserTypes>(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    },
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
});

const User = models?.User || model<UserTypes>("User", userSchema)

export default User
