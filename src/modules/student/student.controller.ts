import express, { Request, Response } from 'express';
import StudentRepository from './student.repository';
import StudentMap from './mapper/student.map';
import { BaseController } from '../../core/base-controller';

import '../student/dto/student.dto';

export default class StudentController extends BaseController {

    private path = '/students';
    private router = express();
    private repository: StudentRepository;

    constructor() {
        super();
        this.initializeRoutes();
        this.repository = new StudentRepository;
    }
    
    public initializeRoutes() {
        this.router.get(this.path, this.index);
    }

    public index = async (request: Request, response: Response) => {
        const result = await this.repository.findAll();

        const studentsDTO = result.map(student => StudentMap.toDTO(student));

        return this.ok<StudentDTO[]>(response, studentsDTO);
    }
}