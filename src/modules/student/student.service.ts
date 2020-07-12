import { StudentRepository } from "./student.repository";
import "./domain/student";
import StudentMap from "./mapper/student.map";
import ResponseFormat from "../../core/response-format"

export class StudentService {

    private repository: StudentRepository;

    constructor() {
        this.repository = new StudentRepository;
    }

    public async findAll() : Promise<StudentDTO[]> {
        const result = await this.repository.findAll();
        const reponse = undefined;

        if(result == undefined)
            return [] as StudentDTO[];

        const studentDTO = result?.map(student => StudentMap.toDTO(student));

        return studentDTO;
    }

}