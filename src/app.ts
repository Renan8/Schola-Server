import express, { Application } from 'express';

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
            console.log(`Server started on port ${this.port}`);
        });
    }
}

export default App;