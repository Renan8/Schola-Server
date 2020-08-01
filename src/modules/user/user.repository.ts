import conn from '../../infra/db/connection';
import IUserRepository from '../../core/interfaces/repositories/iuser.repository';

class UserRepository implements IUserRepository {

    public async findOneBy(filter: {}) : Promise<User | undefined> {
        const user = await conn.select('id',
                                           'name',
                                           'email', 
                                           'password', 
                                           'created_at', 
                                           'updated_at')
                                    .from<User>('user')
                                    .where(filter)
                                    .first()
                                    .catch(function(error: Error) {
                                        return undefined;
                                    });
                                    
        return user;
    }

    public async findAll() : Promise<User[] | undefined> {
        const users = await conn.select('id',
                                           'name',
                                           'email', 
                                           'password', 
                                           'created_at', 
                                           'updated_at')
                                    .from<User>('user')
                                    .catch(function(error: Error) {
                                        return undefined;
                                    });

        return users;
    }

    public async create(user: User) : Promise<number> {
        const userId = await conn.insert<number>(user)
                                   .into('user')
                                   .catch(function(error: Error) {
                                        return 0;
                                   });

        return userId;
    }

    public async update(filter: {}, user: User) : Promise<Boolean> {
        const zeroOrOne = await conn("user").update(user)
                                           .where(filter)
                                           .catch(function(error: Error) {
                                                return false;
                                           });
                                   
        return zeroOrOne === 1;
    }

    public async delete(id: number) : Promise<Boolean> {
        const zeroOrOne = await conn("user").where({ id })
                                           .del()
                                           .catch(function(error: Error){
                                                return false;
                                           });

        return zeroOrOne === 1;
    }

}

export default UserRepository;