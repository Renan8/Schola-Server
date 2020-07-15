import { UserRepository } from "./user.repository";
import UserMap from "./mapper/user.map";
import bcrypt from 'bcrypt';
import "./domain/user";

export class UserService {

    private repository: UserRepository;
    private readonly SALT_ROUNDS = 10

    constructor() {
        this.repository = new UserRepository;
    }

    public async authenticate(email: string, password: string) : Promise<UserDTO> {
        const result = await this.repository.findOneBy(email);

        if (result == undefined) {
            return { } as UserDTO
        }

        const match = await bcrypt.compare(password, result.password);

        if (!match) {
            return { } as UserDTO
        }
        
        const userDTO = UserMap.toDTO(result);

        return userDTO;
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