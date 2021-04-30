import express from 'express';
const routes = express.Router();

import { AuthToken } from '../services/Auth';

import { AuthController } from '../controllers/Auth';
import { UserController } from '../controllers/User';
import { SongController } from '../controllers/Song'

const authToken = new AuthToken();

const authController = new AuthController();
const userController = new UserController();
const songController = new SongController();

routes.post('/login', authController.login);
routes.route('/users')
    .post(userController.save)

routes.route('/songs')
    .post(authToken.AuthUser, authToken.AdminUser, songController.store)
    .get(songController.index)

routes.route('/songs/:_id')
    .get(songController.show)
    .put(authToken.AuthUser, authToken.AdminUser, songController.update)
    .delete(authToken.AuthUser, authToken.AdminUser, songController.destroy)


export default routes;