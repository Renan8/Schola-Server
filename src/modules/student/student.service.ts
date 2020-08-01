import StudentMap from './mapper/student.map';
import IStudentRepository from '../../core/interfaces/repositories/istudent.repository';
import IStudentService from '../../core/interfaces/services/istudent.service';

class StudentService implements IStudentService {

    private studentRepository: IStudentRepository;

    constructor(studentRepository: IStudentRepository) {
        this.studentRepository = studentRepository;
    }

    public async findAll() : Promise<StudentDTO[]> {
        const students = await this.studentRepository.findAll();

        if(students == undefined)
            return [] as StudentDTO[];

        const studentsDTO = students?.map(student => StudentMap.toDTO(student));

        return studentsDTO;
    }
}

export default StudentService;