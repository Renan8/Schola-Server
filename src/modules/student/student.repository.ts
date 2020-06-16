import conn from '../../infra/connection';
import './domain/student';

class StudentRepository {

    async findAll() : Promise<Student[]> {
        const students = await conn.select('*')
                                   .from<Student>('student');

        return students;
    }

    async find() {

    }
    
    async create(student: Student) {

    }

}

export default StudentRepository;