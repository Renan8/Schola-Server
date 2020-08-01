import bcrypt from 'bcrypt';
import crypt from '../config/crypt.json';

class CryptHelper {

    public static async hash(password: string) : Promise<string> {
        return await bcrypt.hash(password, crypt.rounds);
    }

    public static async compare(passwordSent: string, registeredPassword: string) : Promise<Boolean> {
        return await bcrypt.compare(passwordSent, registeredPassword);
    }

}

export default CryptHelper;