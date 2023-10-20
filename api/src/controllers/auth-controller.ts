import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'

interface User {
    name: string;
    email: string;
    password: string;
}

const getPasswordHash = (password: string): Promise<string> => {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    return bcrypt.hash(password, saltRounds);
}

const signupEmailPassword = async ({ name, email, password }: Partial<User>): Promise<boolean> => {
    try {
        const passwordHash = await getPasswordHash(password as string);
        const prisma = new PrismaClient()

        if(!email) {
            throw Error('Email not set');
        }

        if(!name) {
            name = "";
        }

        const res = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash
            }
        })

        return true;
    } catch (error: any) {
        throw new Error(`Error signing up: ${error.message}`);
    }
}

const loginEmailPassword = async ({ email, password }: Partial<User>): Promise<boolean> => {
    try {
        if(!email) throw Error('Email not specified');
        if(!password) throw Error('Password not specified');
        
        const prisma = new PrismaClient();
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        const passwordHash = user?.passwordHash as string;

        const isPasswordMatch = await bcrypt.compare(password, passwordHash);
        if (isPasswordMatch) {
            return  true;
        } else {
            throw new Error('Incorrect password. Please try again.');
        }
    } catch (error:any) {
        throw new Error(`Error logging in: ${error.message}`);
    }
}

export loginEmailPassword
export signupEmailPassword
export default {}
