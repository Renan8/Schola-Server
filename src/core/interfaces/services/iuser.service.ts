interface IUserService {

    create(user: User) : Promise<UserDTO>

    findAll() : Promise<UserDTO[]>

    findOneBy(params: {}) : Promise<UserDTO>

    update(filter: {}, user: User) : Promise<Boolean>

    delete(id: number) : Promise<Boolean>

}

export default IUserService;