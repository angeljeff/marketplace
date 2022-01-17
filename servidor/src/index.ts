import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usuario from './routes/userRoutes';
import producto from './routes/productoRoutes';

class Server {
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes():void{
        this.app.use('/usuario',usuario);
        this.app.use('/producto',producto);

    }
    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('el servico es ', this.app.get('port'));

        });
    }
}


const server = new Server();
server.start();

new Server();