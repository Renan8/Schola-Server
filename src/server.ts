import App from './app';
import UserController from './modules/user/user.controller';
import StudentController from './modules/student/student.controller';

const app = new App([
    new UserController(),
    new StudentController()
], 5000);

app.listen();