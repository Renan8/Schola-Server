import App from './app';
import StudentController from './modules/student/student.controller';

const app = new App([
    new StudentController()
], 5000);

app.listen();