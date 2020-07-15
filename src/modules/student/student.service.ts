import { StudentRepository } from "./student.repository";
import "./domain/student";
import StudentMap from "./mapper/student.map";

export class StudentService {

    private repository: StudentRepository;

    constructor() {
        this.repository = new StudentRepository;
    }

    public async findAll() : Promise<StudentDTO[]> {
        const result = await this.repository.findAll();

        if(result == undefined)
            return [] as StudentDTO[];

        const studentsDTO = result?.map(student => StudentMap.toDTO(student));

        return studentsDTO;
    }
}