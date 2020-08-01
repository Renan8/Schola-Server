import IUserRepository from '../../core/interfaces/repositories/iuser.repository';
import IUserService from '../../core/interfaces/services/iuser.service';
import UserMap from './mapper/user.map';
import CryptHelper from '../../helper/crypt.helper';
import '../../helper/crypt.helper';
import '../../extensions/string.extension';
import '../../extensions/array.extension';


class UserService implements IUserService {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async create(user: User) : Promise<UserDTO> {     
        user.password = await CryptHelper.hash(user.password);

        const userId = await this.userRepository.create(user);

        if (!userId)
            return {} as UserDTO;

        const userDTO = UserMap.toDTO({
            id: userId,
            ... user
        } as User);

        return userDTO;
    }

    public async findAll() : Promise<UserDTO[]> {       
        const users = await this.userRepository.findAll();

        if (users === undefined)
            return [] as UserDTO[];

        const usersDTO = users?.map(user => UserMap.toDTO(user));

        return usersDTO;
    }   

    public async findOneBy(params: {}) : Promise<UserDTO> {       
        const result = await this.userRepository.findOneBy(params);

        if (result === undefined)
            return {} as UserDTO;

        const userDTO = UserMap.toDTO(result);

        return userDTO;
    }

    public async update(filter: {}, user: User) : Promise<Boolean> {
        if (user.password !== undefined)
            user.password = await CryptHelper.hash(user.password);

        const isUpdated = await this.userRepository.update(filter, user);

        return isUpdated;
    }

    public async delete(id: number) : Promise<Boolean> {
        const isDeleted = await this.userRepository.delete(id);

        return isDeleted;
    }
}

export default UserService;