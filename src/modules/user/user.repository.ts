import conn from '../../infra/db/connection';

class UserRepository {

    public async findOneBy(filter: {}) : Promise<User | undefined> {
        const response = await conn.select('id',
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

        return response;
    }

    public async findAll() : Promise<User[] | undefined>{
        const response = await conn.select('id',
                                           'name',
                                           'email', 
                                           'password', 
                                           'created_at', 
                                           'updated_at')
                                    .from<User>('user')
                                    .catch(function(error: Error) {
                                        return undefined;
                                    });

        return response;
    }

    public async create(user: User) : Promise<Boolean> {
        const response = await conn.insert<number>(user)
                                   .into('user')
                                   .catch(function(error: Error) {
                                        return 0;
                                   });

        return response === 1;
    }

    public async update(filter: {}, user: User) : Promise<Boolean> {
        const response = await conn("user").update(user)
                                           .where(filter)
                                           .catch(function(e) {
                                                console.log(e);
                                                return false;
                                           });
                                   
        return response === 1;
    }

    public async delete(id: number) : Promise<Boolean> {
        const response = await conn("user").where({ id })
                                           .del()
                                           .catch(function(e){
                                                return false;
                                           });
                                          
        return response === 1;
    }

}

export default UserRepository;