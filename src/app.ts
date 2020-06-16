import express, { Application } from 'express';
import { BaseController } from './core/base-controller';

class App {

    public app: Application;
    public port: number;

    public constructor(controllers: Array<any>, port: number) {
        this.app = express();
        this.port = port;

        this.middlewares();
        this.initializationControllers(controllers);
    }
    
    private middlewares() {
        this.app.use(express.json());
    }

    private initializationControllers(controllers: Array<any>) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port: ${this.port}`);
        });
    }
}

export default App;