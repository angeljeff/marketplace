"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path= __importDefault(require('path'));
const bodyParser = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const tiendaRouter_1 = __importDefault(require("./routes/tiendaRouter"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
const categoriaRouter_1 = __importDefault(require("./routes/categoriaRouter"));
const subcategoriaRouter_1 = __importDefault(require("./routes/subcategoriaRouter"));
const bancoRouter_1 = __importDefault(require("./routes/bancoRouter"));
const cantonesRouter_1 = __importDefault(require("./routes/cantonesRouter"));
const cuenta_BancariaRouter_1 = __importDefault(require("./routes/cuenta_BancariaRouter"));
const estado_productoRouter_1 = __importDefault(require("./routes/estado_productoRouter"));
const estado_pedidoRouter_1 = __importDefault(require("./routes/estado_pedidoRouter"));
const estado_tiendaRouter_1 = __importDefault(require("./routes/estado_tiendaRouter"));
const metodo_pagoRouter_1 = __importDefault(require("./routes/metodo_pagoRouter"));
const metodopagotiendaRouter_1 = __importDefault(require("./routes/metodopagotiendaRouter"));
const orden_compraRouter_1 = __importDefault(require("./routes/orden_compraRouter"));
const pagoporordenRouter_1 = __importDefault(require("./routes/pagoporordenRouter"));
const productosxordenRouter_1 = __importDefault(require("./routes/productosxordenRouter"));
const tipoUsuarioRouter_1 = __importDefault(require("./routes/tipoUsuarioRouter"));
const VentasRouter_1 = __importDefault(require("./routes/VentasRouter"));

class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(bodyParser.default.json({limit: '50mb', extended: true}))
        this.app.use(bodyParser.default.urlencoded({limit: '50mb', extended: true}))
        this.app.use(express_1.default.static(path.default.join(__dirname,'frontend')));
    }
    routes() {
        this.app.use('/usuario', userRoutes_1.default);
        this.app.use('/producto', productoRoutes_1.default);
        this.app.use('/tienda', tiendaRouter_1.default);
        this.app.use('/Categoria', categoriaRouter_1.default);
        this.app.use('/SubCategoria', subcategoriaRouter_1.default);
        this.app.use('/bancos', bancoRouter_1.default);
        this.app.use('/cantones', cantonesRouter_1.default);
        this.app.use('/Cuentasb', cuenta_BancariaRouter_1.default);
        this.app.use('/estadopro', estado_productoRouter_1.default);
        this.app.use('/estadopedi', estado_pedidoRouter_1.default);
        this.app.use('/estado_tienda', estado_tiendaRouter_1.default);
        this.app.use('/metodopago', metodo_pagoRouter_1.default);
        this.app.use('/metodopagotienda', metodopagotiendaRouter_1.default);
        this.app.use('/ordencompra', orden_compraRouter_1.default);
        this.app.use('/pagoorden', pagoporordenRouter_1.default);
        this.app.use('/productosxorden', productosxordenRouter_1.default);
        this.app.use('/tipousuario', tipoUsuarioRouter_1.default);
        this.app.use('/ventas', VentasRouter_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('el servico es ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
new Server();
