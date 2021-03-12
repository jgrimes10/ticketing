import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<UserDoc>(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        // overwrite how the user object is converted to json
        toJSON: {
            transform(doc, ret) {
                // remap _id to id
                ret.id = ret._id;
                delete ret._id;

                // remove the password from the user object when converting to json
                delete ret.password;

                // remove the __v value from the user object when converting to json
                delete ret.__v;
            },
        },
    },
);

// intercept any save calls and hash the given password
// before saving it in the db
userSchema.pre('save', async function (done) {
    // check if password is being modified
    if (this.isModified('password')) {
        // hash the given password
        const hashed = await Password.toHash(this.get('password'));
        // update the password on the document with the newly hashed password
        this.set('password', hashed);
    }

    // call done() so the program can continue
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
