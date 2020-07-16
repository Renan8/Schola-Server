import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/auth.json';

export default class AuthMiddleware {

    public static verifyToken(request: Request, response: Response, next: NextFunction) {

        const authHeader = request.headers.authorization;
    
        if (!authHeader)
            return response.status(401).send({ message: "No token provided" });
    
        const parts = authHeader.split(' ');
    
        if (parts.length !== 2)
            return response.status(401).send({ message: "Token error" });
    
        const [ scheme, token ] = parts;

        if (scheme !== "Bearer")
            return response.status(401).send({ message: "Token malformed" });
    
        jwt.verify(token, config.secret, (err) => {
            if (err)
                return response.status(401).send({ message: "Token invalid" });
            
            return next();
        });
    }

} 