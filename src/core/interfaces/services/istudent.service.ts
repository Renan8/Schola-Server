interface IStudentService {

    findAll() : Promise<StudentDTO[]>

}

export default IStudentService;