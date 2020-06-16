import '../dto/student.dto';

class StudentMap {

    public static toDTO(domain: Student) : StudentDTO {
        return {
            registration_number: domain.registration_number,
            name: domain.name,
            cellphone: domain.cellphone,
            photo: domain.photo,
            birthday_date: domain.birthday_date
        }
    }

}

export default StudentMap;