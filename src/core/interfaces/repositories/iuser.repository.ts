interface IUserRepository {
    
    findOneBy(filter: {}) : Promise<User | undefined>

    findAll() : Promise<User[] | undefined>

    create(user: User) : Promise<number>

    update(filter: {}, user: User) : Promise<Boolean>

    delete(id: number) : Promise<Boolean>
    
}

export default IUserRepository;