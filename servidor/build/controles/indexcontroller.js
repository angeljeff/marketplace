"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_datos_1 = __importDefault(require("../base_datos"));
class GamesController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('dddddddd qqqq eee ', req.body);
            const result = yield base_datos_1.default.query('INSERT INTO tipo_usuario set  ?', [req.body]);
            /*const result = (await pool).query('INSERT INTO tipo_usuario set (id, descripcion) VALUES ('+
            'req.body.id, req.body.descripcion));*/
            /* const result = (await pool).query("INSERT INTO tipo_usuario set (id, descripcion) VALUES ('2','22222')");*/
            res.json({ message: 'Game Sabbbbbb' });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* pool.query('DESCRIBE tipo_usuarios')**/
            const games = yield base_datos_1.default.query('SELECT * FROM tipo_usuario');
            res.json({ games, message: 'games esta conectado aaa' });
        });
    }
}
const gamesController = new GamesController;
exports.default = gamesController;
