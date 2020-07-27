import UserRepository from './user.repository';
import UserMap from './mapper/user.map';
import AuthenticateMap from './mapper/authenticate.map';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/auth.json';
import '../../extensions/string.extension';

class UserService {

    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository;
    }

    // Bloqueio por tentativas
    public async authenticate(credentials: string) : Promise<AuthenticateDTO> {
        const [ basic, hash ] = credentials.split(' ');

        if (basic !== config.credentials_type)
            return { } as AuthenticateDTO;

        const [ email, password ] = hash.decodeBase64().split(':');
        
        const result = await this.repository.findOneBy({ email });

        if (result == undefined)
            return { } as AuthenticateDTO;

        if (!await bcrypt.compare(password, result.password))
            return { } as AuthenticateDTO

        const token = jwt.sign({ userId: result.id }, config.token.key, 
        {
            expiresIn: config.token.expires_in
        });
        
        const authenticateDTO = AuthenticateMap.toDTO(result, token);

        return authenticateDTO;
    }

    public async create(user: User) : Promise<UserDTO> {     
        user.password = await bcrypt.hash(user.password, config.rounds);

        const result = await this.repository.create(user);
        
        if (!result)
            return {} as UserDTO;

        const userDTO = UserMap.toDTO({
            id: result,
            ... user
        } as User);

        return userDTO;
    }

    public async findAll() : Promise<UserDTO[]> {       
        const result = await this.repository.findAll();

        if (result == undefined)
            return [] as UserDTO[];

        const userDTO = result?.map(user => UserMap.toDTO(user));

        return userDTO;
    }   

    public async findOneBy(params: {}) : Promise<UserDTO> {       
        const result = await this.repository.findOneBy(params);

        if (result == undefined)
            return {} as UserDTO;

        const userDTO = UserMap.toDTO(result);

        return userDTO;
    }

    public async update(filter: {}, user: User) : Promise<Boolean> {
        if (user.password !== undefined)
            user.password = await bcrypt.hash(user.password, config.rounds);

        const result = await this.repository.update(filter, user);

        return result;
    }

    public async delete(id: number) : Promise<Boolean> {
        const result = await this.repository.delete(id);

        return result;
    }
}

export default UserService;