import { UserRepository } from './user.repository';
import UserMap from './mapper/user.map';
import AuthenticateMap from './mapper/authenticate.map';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/auth.json';

export class UserService {

    private repository: UserRepository;
    private readonly SALT_ROUNDS = 10;
    private readonly TOKEN_EXPIRATION = "1 day";

    constructor() {
        this.repository = new UserRepository;
    }

    public async authenticate(email: string, password: string) : Promise<AuthenticateDTO> {
        const result = await this.repository.findOneBy(email);

        if (result == undefined) {
            return { } as AuthenticateDTO
        }

        if (!await bcrypt.compare(password, result.password)) {
            return { } as AuthenticateDTO
        }

        const token = jwt.sign({ id: result.id }, config.secret, {
            expiresIn: this.TOKEN_EXPIRATION
        });
        
        const authenticateDTO = AuthenticateMap.toDTO(result, token);

        return authenticateDTO;
    }

    public async findAll() : Promise<UserDTO[]> {       
        const result = await this.repository.findAll();

        if (result == undefined) {
            return [] as UserDTO[];
        }

        const userDTO = result?.map(user => UserMap.toDTO(user));

        return userDTO;
    }

    public async create(user: User) : Promise<UserDTO> {       
        user.password = await bcrypt.hash(user.password, this.SALT_ROUNDS);

        const result = await this.repository.create(user);
        
        if (result == 0) {
            return {} as UserDTO;
        }

        const userDTO = UserMap.toDTO({
            id: result,
            ... user
        } as User);

        return userDTO;
    }
}