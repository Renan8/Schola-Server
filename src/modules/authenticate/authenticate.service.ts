import IAuthenticateService from '../../core/interfaces/services/iauthenticate.service';
import IUserRepository from '../../core/interfaces/repositories/iuser.repository';
import AuthenticateMap from '../authenticate/mapper/authenticate.map';
import CryptHelper from '../../helper/crypt.helper';
import config from '../../config/auth.json';
import jwt from 'jsonwebtoken';

class AuthenticateService implements IAuthenticateService {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async authenticate(basicAuthorization: string) : Promise<AuthenticateDTO> {
        const [ basic, hash ] = basicAuthorization.split(' ');
        
        if (basic !== config.credentials_type)
            return { } as AuthenticateDTO;
        
        const [ emailSent, passwordSent ] = hash.decodeBase64().split(':');
        
        const user = await this.userRepository.findOneBy({ email: emailSent });
        
        if (user === undefined || !await CryptHelper.compare(passwordSent, user.password))
            return { } as AuthenticateDTO;

        const token = jwt.sign({ userId: user.id }, config.token.key, 
        {
            expiresIn: config.token.expires_in
        });
        
        const authenticateDTO = AuthenticateMap.toDTO(user, token);

        return authenticateDTO;
    }

} 

export default AuthenticateService;