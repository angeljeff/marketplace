"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexcontroller_1 = __importDefault(require("../controles/indexcontroller"));
class GameRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
        console.log("fff");
    }
    config() {
        console.log("entre aqui");
        this.router.get('/', indexcontroller_1.default.list);
        this.router.post('/2', indexcontroller_1.default.create);
        /*this.router.post('/', gamesController.create);*/
        /*this.router.get('/', gamesController.list);*/
        /*
        this.router.get('/:id', gamesController.getOne);
        
        this.router.put('/:id', gamesController.update);
        this.router.delete('/:id', gamesController.delete); */
    }
}
const juego = new GameRoutes();
exports.default = juego.router;
