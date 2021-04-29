import express, { Application } from "express";
import cors from 'cors';
import mongoose from 'mongoose'
import morgan from 'morgan';
import routes from './routes/routes';

import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
console.log(__dirname + '/.env');

export class Server {

    private app: Application;

    constructor() {
        this.app = express();
        this.database()
        this.middlewares();
        this.routes();
    }

    private database(): void {
        const bd_url = String(process.env.BD_URL)
        console.log(bd_url);
        mongoose.connect(bd_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log('Database connected!'))
        .catch(err => console.log(err));
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan(''));
    }

    private routes(): void {
        this.app.use(routes);
    }

    async listen(port: Number) {
        await this.app.listen(port);
        console.log(`Server is running on port: ${port}`)
    }

    getApp(): Application {
        return this.app;
    }
}