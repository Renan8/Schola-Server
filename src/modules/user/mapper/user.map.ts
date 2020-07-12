import '../dto/user.dto';

class UserMap {

    public static toDTO(domain: User) : UserDTO {
        return {
            id: domain.id,
            email: domain.email
        }
    }

}

export default UserMap;