import conn from '../../infra/db/connection';
import './domain/user';

export class UserRepository {

    public async findOneBy(email: string) : Promise<User | undefined> {
        const response = await conn.select('id',
                                           'name',
                                           'email', 
                                           'password', 
                                           'created_at', 
                                           'updated_at')
                                    .from<User>('user')
                                    .where({ email })
                                    .first()
                                    .catch(function(error: Error) {
                                        console.log(error);
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
                                        console.log(error);
                                        return undefined;
                                    });

        return response;
    }

    public async create(user: User) : Promise<number> {
        const response = await conn.insert<number>(user)
                                   .into('user')
                                   .catch(function(error: Error) {
                                        console.log(error);
                                        return 0;
                                   });

        return Number(response);
    }

}