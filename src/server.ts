import App from './app';

// Authenticate
import AuthenticateController from './modules/authenticate/authenticate.controller';
import AuthenticateService from './modules/authenticate/authenticate.service';

// User
import UserController from './modules/user/user.controller';
import UserService from './modules/user/user.service';
import UserRepository from './modules/user/user.repository';
import UserSchema from './modules/user/user.schema';

// Student
import StudentController from './modules/student/student.controller';
import StudentService from './modules/student/student.service';
import StudentRepository from './modules/student/student.repository';

const app = new App([

    new AuthenticateController(new AuthenticateService(
        new UserRepository
    )),

    new UserController(new UserSchema, new UserService(
        new UserRepository
    )),

    new StudentController(new StudentService(
        new StudentRepository
    ))

], 5000);

app.listen();