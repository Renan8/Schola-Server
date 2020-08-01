import express, { Request, Response } from 'express';
import BaseController from '../../core/abstracts/base-controller';
import AuthMiddleware from '../../middlewares/auth.middleware';
import IStudentService from '../../core/interfaces/services/istudent.service';
import './domain/student';


class StudentController extends BaseController {

    private path = '/students';
    private router = express();
    private studentService: IStudentService;

    constructor(studentService: IStudentService) {
        super();
        this.studentService = studentService;
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    public initializeMiddleware() {
        this.router.use(AuthMiddleware.verifyToken);
    }

    public initializeRoutes() {
        this.router.get(this.path, this.index);
    }

    public index = async (request: Request, response: Response) => {
        const students = await this.studentService.findAll();
        
        if (students.isEmpty())
            return this.notFound(response);

        return this.ok<StudentDTO[]>(response, students);
    }
} 

export default StudentController;