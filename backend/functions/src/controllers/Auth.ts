import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/User';
import { Token } from '../services/Token';
import jwt from 'jsonwebtoken';

export class AuthController {
    constructor() {
    }

    async verifyToken(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { token } = req.body;
            const partsofToken = token.split(' ');
            if (partsofToken.length > 1) {
                const [bearer, token] = partsofToken;
                if (bearer == 'Bearer') {
                    const tokenResponse: any = "kakka"
                    if (tokenResponse != null) {
                        return res.status(200).json({
                            "success": true,
                            "error": null
                        })
                    } else {
                        return res.status(400).json({
                            "success": false,
                            "error": "Token inválido"

                        })
                    }
                } else {
                    return res.status(400).json({
                        "success": false,
                        "error": "Token inválido"

                    })
                }
            } else {
                return res.status(400).json({
                    "success": false,
                    "error": "Token inválido"

                })
            }
        } catch (err) {
            return res.status(500).json({
                "success": false,
                "error": err

            })
        }
    }

    async login(req: Request, res: Response): Promise<Response | undefined | boolean> {
        try {
            const { email, password } = req.body;
            if (email != null && password != null) {
                const login = await User.findOne({email: email });
                if (login != null) {
                    const ress = await bcrypt.compare(password, login.password);
                    if (ress == true) {
                        const token = await new Token().generateToken(login._id)
                        return res.status(200).json({
                            "success": true,
                            "user": {email: login.email},
                            "token": token
                        })
                    } else {
                        return res.status(400).json({
                            "success": false,
                            "error": "Senhas não conferem",
                        })
                    }
                } else {
                    return res.status(404).json({
                        "success": true,
                        "error": "O usuário não existe",

                    })
                }
            } else {
                return res.status(400).json({
                    "success": false,
                    "error": "Faltam parametros"
                })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                "success": false,
                "error": err
            })
        }
    }
}