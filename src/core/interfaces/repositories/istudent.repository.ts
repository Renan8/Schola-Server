interface IStudentRepository {

    findAll() : Promise<Student[] | undefined>

    findOne(id: number) : Promise<Student | undefined>

}

export default IStudentRepository;