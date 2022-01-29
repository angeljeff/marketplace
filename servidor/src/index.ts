import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usuario from './routes/userRoutes';
import tienda from './routes/tiendaRouter';
import producto from './routes/productoRoutes';
import categoria from './routes/categoriaRouter';
import subcategoria from './routes/subcategoriaRouter';
import banco from './routes/bancoRouter';
import canton from './routes/cantonesRouter';
import cuenta_banco from './routes/cuenta_BancariaRouter';
import estado_pro from './routes/estado_productoRouter';
import estado_ped from './routes/estado_pedidoRouter';
import estado_ti from './routes/estado_tiendaRouter';
import metodopago from './routes/metodo_pagoRouter';
import metodo_pag_tienda from './routes/metodopagotiendaRouter';
import orden_compra from './routes/orden_compraRouter';
import pago_orden from './routes/pagoporordenRouter';
import productosxorden from './routes/productosxordenRouter';
import tipo_usuario from './routes/tipoUsuarioRouter';
import ventas from './routes/VentasRouter';





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
        this.app.use('/tienda',tienda);
        this.app.use('/Categoria',categoria);
        this.app.use('/SubCategoria',subcategoria);
        this.app.use('/bancos',banco);
        this.app.use('/cantones',canton);
        this.app.use('/Cuentasb',cuenta_banco);
        this.app.use('/estadopro',estado_pro);
        this.app.use('/estadopedi',estado_ped);
        this.app.use('/estado_tienda',estado_ti);
        this.app.use('/metodopago',metodopago);
        this.app.use('/metodopagotienda',metodo_pag_tienda);
        this.app.use('/ordencompra',orden_compra);
        this.app.use('/pagoorden',pago_orden);
        this.app.use('/productosxorden',productosxorden);
        this.app.use('/tipousuario',tipo_usuario);
        this.app.use('/ventas',ventas);
        

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