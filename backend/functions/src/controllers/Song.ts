import { Request, Response } from 'express';
import Song from '../models/Song';

export class SongController {
    
    constructor() {
    }

    async store(req: Request, res: Response): Promise<Response | undefined> {
        const body = req.body
        body.user = req.body.user_data._id
        return Song.create(body)
            .then(suc => {
                return res.json({
                    status: 200,
                    song: suc
                })
            })
            .catch(err => {
                return res.status(400).json({
                    status: 400,
                    error: err
                })
            })
    }

    async index(req: Request, res: Response): Promise<Response | undefined> {
        return Song.find(req.query)
            .then(suc => {
                return res.json({
                    status: 200,
                    songs: suc
                })
            })
            .catch(err => {
                return res.status(400).json({
                    status: 400,
                    error: err
                })
            })
    }
    
    async update(req: Request, res: Response): Promise<Response | undefined> {
        const { _id } = req.params
        const body = req.body
        body.user = req.body.user_data._id
        return Song.findOneAndUpdate({_id}, body, {new: true})
            .then(suc => {
                return res.json({
                    status: 200,
                    song: suc
                })
            })
            .catch(err => {
                return res.status(400).json({
                    status: 400,
                    error: err
                })
            })
    }

    async destroy (req: Request, res: Response): Promise<Response | undefined> {
        const { _id } = req.params
        return Song.findOneAndDelete({_id})
            .then(suc => {
                return res.status(204).send()
            })
            .catch(err => {
                return res.status(400).json({
                    status: 400,
                    error: err
                })
            })
    }
}