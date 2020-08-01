import express, { Request, Response } from 'express';
import IAuthenticateService from '../../core/interfaces/services/iauthenticate.service';
import BaseController from '../../core/abstracts/base-controller';
import obj from '../../extensions/object.extension';


class AuthenticateController extends BaseController {

    private path = "/authenticate";
    private router = express();
    private authenticateService: IAuthenticateService;

    constructor(authenticateService: IAuthenticateService) {
        super();
        this.authenticateService = authenticateService;
        this.initializeRoutes();
    }

    protected initializeRoutes(): void {
        this.router.post(this.path, this.authenticate);
    }

    public authenticate = async (request: Request, response: Response) => {
        const basicAuthorization = request.headers.authorization;

        if (basicAuthorization === undefined)
            return this.unauthorized(response);

        const authenticationDTO = await this.authenticateService.authenticate(basicAuthorization);
  
        if (obj.notExists(authenticationDTO))
            return this.unauthorized(response);

        return this.ok(response, authenticationDTO);
    }

}

export default AuthenticateController;