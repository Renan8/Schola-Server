import '../../user/dto/user.dto';
import '../dto/authenticate.dto';

class AuthenticateMap {

    public static toDTO(domain: User, token: string) : AuthenticateDTO {
        return {
            user: {
                name: domain.name,
                email: domain.email
            },
            token: token     
        }
    }

}

export default AuthenticateMap;