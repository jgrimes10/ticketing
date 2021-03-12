// import dependencies
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// turn scrypt from callback-based to promise-based
const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string): Promise<string> {
        // generate a salt for the password
        const salt = randomBytes(8).toString('hex');
        // hash the given plain-text password
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        // return the hashedPassword.salt
        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
        // split apart the saved password and salt
        const [hashedPassword, salt] = storedPassword.split('.');
        // hash the given plain-text password
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        // compare the stored password and hashed suppliedPassword
        return buf.toString('hex') === hashedPassword;
    }
}
