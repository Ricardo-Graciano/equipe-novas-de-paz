import { Token } from './Token';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User'

export class AuthToken {
    constructor() { }

    async AuthUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const authHeader = req.headers.authorization;
        if (authHeader != null) {
            const partsofToken = authHeader.split(' ');
            console.log(partsofToken);
            if (partsofToken.length == 2) {
                const [bearer, token] = partsofToken;
                if (bearer == 'Bearer') {
                    try {
                        const tokenResponse:IUser | null = await new Token().verifyToken(String(token));
                        if (tokenResponse != null) {
                            req.body.user_data = tokenResponse
                            next();
                        }
                    } catch {
                        return res.status(401).send({ error: "Token invalido na requisição", success: false })
                    }
                } else {
                    return res.status(401).send({ error: "Token invalido na requisição", success: false })
                }
            } else {
                return res.status(401).send({ error: "Token invalido sem partes", success: false })
            }
        } else {
            return res.status(401).send({ error: "Usuário não autenticado.", success: false })
        }
    }

    async AdminUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        if(req.body.user_data.isAdmin) next()
        else return res.status(403).json({ error: "Usuário não possui permissão.", success: false })
    }
}