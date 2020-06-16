import { Response } from 'express';

export class BaseController {

    public jsonResponse(response: Response, code: number, message: string) {
        return response.status(code).json({ message });
    }

    public ok<T>(response: Response, dto?: T) {
        if (!!dto) {
            return response.status(200).json(dto);
        } else {
            return response.sendStatus(200);
        }
    }

    public created(response: Response) {
        return response.sendStatus(201);
    }

    public notFound (response: Response, message?: string) {
        return this.jsonResponse(response, 404, message ? message : 'Not found');
    }

    public fail(response: Response, error: Error | string) {
        return response.status(500).json({
            message: error.toString()
        });
    }
}