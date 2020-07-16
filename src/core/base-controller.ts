import { Response } from 'express';

abstract class BaseController {
    
    protected abstract initializeRoutes() : void;

    protected jsonResponse(response: Response, code: number, message: string) {
        return response.status(code).json({ message });
    }

    protected ok<T>(response: Response, dto?: T) {
        if (!!dto) {
            return response.status(200).json(dto);
        }

        return response.sendStatus(200);
    }

    protected created<T>(response: Response, dto?: T) {
        if (!!dto) {
            return response.status(201).json(dto);
        }

        return response.sendStatus(201);
    }

    protected noContent(response: Response) {
        return response.sendStatus(204);
    }

    protected notFound(response: Response, message?: string) {
        return this.jsonResponse(response, 404, message ? message : 'Not found');
    }

    protected fail(response: Response, error: Error | string) {
        return response.status(500).json({
            message: error.toString()
        });
    }

    protected unauthorized(response: Response) {
        return response.sendStatus(401);
    }
}

export default BaseController;