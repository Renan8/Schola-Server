import express, { Request, Response } from 'express';
import { BaseController } from "../../core/base-controller";
import { UserService } from './user.service';
import obj from '../../extensions/object.extension';
import '../../extensions/array.extension';

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
        this.router.post('/authenticate', this.auth);
        this.router.get(this.path, this.index);
        this.router.post(this.path, this.create);
    }

    public auth = async (request: Request, response: Response) => {
        const { email, password } = request.body;

        const user = await this.service.authenticate(email, password);

        if (obj.notExists(user)) {
            return this.unauthorized(response);
        }

        return this.ok(response);
    }

    public index = async (request: Request, response: Response) => {
        const users = await this.service.findAll();

        if (users.isEmpty()) {
            return this.notFound(response);
        }

        return this.ok(response, users);
    }

    public create = async (request: Request, response: Response) => {
        const { name, email, password } = request.body;
        
        const user = await this.service.create({
            name,
            email,
            password
        } as User);

        if (obj.notExists(user)) {
           return this.fail(response, "Not Created");
        }

        return this.created(response, user);
    }
}