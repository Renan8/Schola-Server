import express, { Request, Response } from 'express';
import BaseController from "../../core/base-controller";
import UserService from './user.service';
import AuthMiddleare from '../../middlewares/auth.middleware';
import obj from '../../extensions/object.extension';
import UserSchema from './user.schema';
import '../../extensions/array.extension';
import './domain/user';

class UserController extends BaseController {

    private path = '/users';
    private router = express();
    private service: UserService;
    private schema: UserSchema;

    constructor() {
        super();
        this.schema = new UserSchema();
        this.service = new UserService();
        this.initializeRoutes();
    }
    
    public initializeRoutes() {
        this.router.post('/authenticate', this.auth);
        this.router.post(this.path, this.schema.verifyCreateBody(), this.create);
        this.router.get(this.path, AuthMiddleare.verifyToken, this.index);
        this.router.get(`${this.path}/:id`, AuthMiddleare.verifyToken, this.schema.verifyParamsId(), this.show);
        this.router.put(`${this.path}/:id`, AuthMiddleare.verifyToken, this.schema.verifyUpdateBody(), this.update);
        this.router.delete(`${this.path}/:id`, AuthMiddleare.verifyToken, this.schema.verifyParamsId(), this.delete);
    }

    public auth = async (request: Request, response: Response) => {
        const basicAuthorization = request.headers.authorization;
        
        if (basicAuthorization == undefined)
            return this.unauthorized(response);

        const authentication = await this.service.authenticate(basicAuthorization);

        if (obj.notExists(authentication))
            return this.unauthorized(response);

        return this.ok(response, authentication);
    }

    public create = async (request: Request, response: Response) => {
        const { name, email, password } = request.body;
        
        const user = await this.service.create({
            name,
            email,
            password
        } as User);

        if (obj.notExists(user))
           return this.badRequest(response, "Not Created");

        return this.created(response, user);
    }

    public index = async (request: Request, response: Response) => {
        const users = await this.service.findAll();

        if (users.isEmpty())
            return this.notFound(response);

        return this.ok(response, users);
    }

    public show = async (request: Request, response: Response) => {
        const id = request.params.id;

        const user = await this.service.findOneBy({ id });

        if (obj.notExists(user))
            return this.notFound(response);

        return this.ok(response, user);
    }

    public update = async (request: Request, response: Response) => {
        const id = request.params.id;

        if (obj.notExists(request.body))
            return this.badRequest(response, "Object body is empty");

        const { name, email, password } = request.body;

        const isSuccess = this.service.update({ id }, { name, email, password } as User);

        if (!isSuccess)
            return this.badRequest(response, "Not Updated");

        return this.ok(response);
    }

    public delete = async (request: Request, response: Response) => {
        const id = request.params.id;

        const isSuccess = this.service.delete(Number(id));

        if (!isSuccess)
            return this.badRequest(response, "Not deleted");

        return this.ok(response);
    }
}

export default UserController;