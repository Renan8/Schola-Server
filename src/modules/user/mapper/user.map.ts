import '../dto/user.dto';

class UserMap {

    public static toDTO(domain: User) : UserDTO {
        return {
            id: domain.id,
            name: domain.name,
            email: domain.email
        }
    }

}

export default UserMap;