import express, { Request, Response } from 'express';
import { BaseController } from "../../core/base-controller";
import { UserService } from './user.service';

export default class UserController extends BaseController {

    private path = '/users';
    private router = express();
    private service: UserService;

    constructor() {
        super();
        this.initializeRoutes();
        this.service = new UserService();
    }
    
    public initializeRoutes() {
        this.router.post('/authentication', this.auth);
        this.router.post(this.path, this.create);
    }

    public auth = async (request: Request, response: Response) => {
        const { email, password } = request.body;

        const result = await this.service.authenticate(email, password);

        return this.ok<User>(response);
    }

    public create = async (request: Request, response: Response) => {
        const { email, password } = request.body;
        
        const user = await this.service.create({
            email,
            password,
            created_at: new Date()
        });

        return this.created(response, user);
    }
}