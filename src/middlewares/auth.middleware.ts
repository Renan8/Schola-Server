import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/auth.json';

class AuthMiddleware {

    public static verifyToken(request: Request, response: Response, next: NextFunction) {

        const authorizationHeader = request.headers.authorization;
    
        if (!authorizationHeader)
            return response.status(401).send({ message: "No token provided" });
    
        const parts = authorizationHeader.split(' ');
    
        if (parts.length !== 2)
            return response.status(401).send({ message: "Token error" });
    
        const [ type, token ] = parts;

        if (type !== config.token.type)
            return response.status(401).send({ message: "Token malformed" });
    
        jwt.verify(token, config.token.key, (err) => 
        {
            if (err)
                return response.status(401).send({ message: "Token invalid" });
            
            return next();
        });
    }

}

export default AuthMiddleware;