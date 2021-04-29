import * as functions from 'firebase-functions';
import { Server } from './server'

export const app = functions.https.onRequest(new Server().getApp());
