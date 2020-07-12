import conn from '../../infra/connection';
import './domain/user';

export class UserRepository {

    public async findOneBy(email: string, password: string) : Promise<User | null | Error>{
        const response = await conn.select('id', 
                                           'email', 
                                           'password', 
                                           'created_at', 
                                           'updated_at')
                                    .from<User>('user')
                                    .where({ email, password })
                                    .first()
                                    .catch(function(error: Error) {
                                        console.log(error);
                                        return error;
                                    });
        
        if (response == undefined) {
            return null;
        }

        return response;
    }

    public async create(user: User) : Promise<User | Error>{
        const response =  await conn.insert<User>(user)
                                    .into('user')
                                    .catch(function(error: Error) {
                                        console.log(error);
                                        return error;
                                    });

        return response;
    }

}