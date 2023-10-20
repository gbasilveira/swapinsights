import Router, { NextFunction, Request, Response } from 'express';
import {loginEmailPassword} from '../controllers/auth-controller'
const auth = Router();

auth.get('/login/password', (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    try {
        loginEmailPassword(email, password);

        return res.send(200).json({
            success: true
        })
    } catch (e:any) {
        return res.send(403).json({
            error: true,
            message: e.message
        })
    }
});