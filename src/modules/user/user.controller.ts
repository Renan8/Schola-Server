import express, { Request, Response } from 'express';
import BaseController from "../../core/abstracts/base-controller";
import IUserService from '../../core/interfaces/services/iuser.service';
import IUserSchema from '../../core/interfaces/schemas/iuser.schema';
import AuthMiddleare from '../../middlewares/auth.middleware';
import obj from '../../extensions/object.extension';
import '../../extensions/array.extension';
import './domain/user';

class UserController extends BaseController {

    private path = '/users';
    private router = express();
    private userService: IUserService;
    private userSchema: IUserSchema;

    constructor(userSchema: IUserSchema, userService: IUserService) {
        super();
        this.userSchema = userSchema;
        this.userService = userService;
        this.initializeRoutes();
    }
    
    public initializeRoutes() {
        this.router.get(this.path, AuthMiddleare.verifyToken, this.index);
        this.router.get(`${this.path}/:id`, AuthMiddleare.verifyToken, this.userSchema.verifyParamsId(), this.show);
        this.router.post(this.path, this.userSchema.verifyCreateBody(), this.create);
        this.router.put(`${this.path}/:id`, AuthMiddleare.verifyToken, this.userSchema.verifyIdParamsAndUpdateBody(), this.update);
        this.router.delete(`${this.path}/:id`, AuthMiddleare.verifyToken, this.userSchema.verifyParamsId(), this.delete);
    }

    public create = async (request: Request, response: Response) => {
        const { name, email, password } = request.body;
        
        const userDTO = await this.userService.create({
            name,
            email,
            password
        } as User);

        if (obj.notExists(userDTO))
           return this.badRequest(response, "Not Created");

        return this.created(response, userDTO);
    }

    public index = async (request: Request, response: Response) => {
        const usersDTO = await this.userService.findAll();

        if (usersDTO.isEmpty())
            return this.notFound(response);

        return this.ok(response, usersDTO);
    }

    public show = async (request: Request, response: Response) => {
        const id = request.params.id;

        const userDTO = await this.userService.findOneBy({ id });

        if (obj.notExists(userDTO))
            return this.notFound(response);

        return this.ok(response, userDTO);
    }

    public update = async (request: Request, response: Response) => {
        const id = request.params.id;

        if (obj.notExists(request.body))
            return this.badRequest(response, "Object body is empty");

        const { name, email, password } = request.body;

        const isUpdated = this.userService.update({ id }, { name, email, password } as User);

        if (!isUpdated)
            return this.badRequest(response, "Not Updated");

        return this.ok(response);
    }

    public delete = async (request: Request, response: Response) => {
        const id = request.params.id;

        const isDeleted = await this.userService.delete(Number(id));

        if (!isDeleted)
            return this.badRequest(response, "Not deleted");

        return this.ok(response);
    }
}

export default UserController;