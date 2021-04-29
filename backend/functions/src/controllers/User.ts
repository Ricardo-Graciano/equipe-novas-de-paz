import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/User';

export class UserController {
    
    constructor() {
    }

    async save(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { name, email, password } = req.body;
            if (name != null && email != null && password != null) {
                const hash = bcrypt.hashSync(password, 10);
                const user = await User.create({
                    name: name,
                    email: email,
                    password: hash
                });
                if (user != null) {
                    return res.status(200).json({
                        "success": true,
                        "user": user

                    })
                } else {
                    return res.status(500).json({
                        "success": false,
                        "error": "Não foi possivel atender a solicitação"

                    })
                }
            } else {
                return res.status(400).json({
                    "success": false,
                    "error": "Faltam parametros"

                })
            }
        } catch (err) {
            return res.status(500).json({
                "success": false,
                "error": err
            })
        }
    }
}