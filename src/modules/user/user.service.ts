import { UserRepository } from "./user.repository";
import UserMap from "./mapper/user.map";
import "./domain/user";

export class UserService {

    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository;
    }

    public async create(user: User) {
        const result = await this.repository.create(user);

        return result;
    }

    public async authenticate(email: string, password: string) {

    }

}