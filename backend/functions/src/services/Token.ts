import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'

export class Token {
    constructor() { }

    async generateToken(params: string): Promise<string> {
        const token = await jwt.sign({ id: params }, String(process.env.JWT_HASH_KEY), {
            expiresIn: 86400
        })
        return token;
    };

    async verifyToken(params: string): Promise<IUser | null> {
        const token : any = await jwt.verify(params, String(process.env.JWT_HASH_KEY));
        return await User.findOne({_id: token.id});
    }
}