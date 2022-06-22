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
const nodemailer_1 = __importDefault(require("nodemailer"));
class CorreoController {
    enviarcorreocontrasenia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            let config = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                ignoreTLS: false,
                // true for 465, false for other ports
                auth: {
                    user: "agromarketplace00@gmail.com",
                    pass: "qgogyfgvzysnobig", // generated ethereal password
                },
            });
            const opciones = {
                from: 'agromarketplace00@gmail.com',
                to: body.email,
                subject: body.asunto,
                text: body.mensaje,
                //html: "<b>Hello world?</b>", // html body
                html: "<header style='background:#7DF2C0; padding:auto; text-align:center; font-size:20px; font-family:fantasy'><h2>Agromarketplace</h2></header><br><strong><label style='font-size: 22px;font-family:serif; margin-top:3px;'>Recuperación de contraseña:</label></strong><p font-size:20px; >Esta es su nueva contraseña: " + body.mensaje + "</p>"
            };
            config.sendMail(opciones, function (error, result) {
                res.json({ message: 'Producto actualizado ' });
            });
        });
    }
    enviarcorreoaprobaproducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("si llegue aqui para enviar el correo");
            let body = req.body;
            let config = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                ignoreTLS: false,
                auth: {
                    user: "agromarketplace00@gmail.com",
                    pass: "qgogyfgvzysnobig", // generated ethereal password
                },
            });
            const opciones = {
                from: 'agromarketplace00@gmail.com',
                to: body.email,
                subject: body.asunto,
                text: body.mensaje,
                //html: "<b>Hello world?</b>", // html body
                html: "<header style='background:#7DF2C0; padding:auto; text-align:center; font-size:20px; font-family:fantasy'><h2>Agromarketplace</h2></header><br><strong><label style='font-size: 22px;font-family:serif; margin-top:3px;'>Respuesta:</label></strong><p font-size:25px; > Tu producto <strong>" + body.mensaje + "</strong> ha recibido una respuesta para su publicación</p>"
            };
            config.sendMail(opciones, function (error, result) {
                res.json({ message: 'Producto actualizado ' });
                console.log(error);
                console.log(result);
            });
        });
    }
    enviarcorreoaprobapedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("si llegue aqui para enviar el correo siiiii");
            let body = req.body;
            let config = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                ignoreTLS: false,
                auth: {
                    user: "agromarketplace00@gmail.com",
                    pass: "qgogyfgvzysnobig", // generated ethereal password
                },
            });
            const opciones = {
                from: 'agromarketplace00@gmail.com',
                to: body.email,
                subject: body.asunto,
                text: body.mensaje,
                //html: "<b>Hello world?</b>", // html body
                html: "<header style='background:#7DF2C0; padding:auto; text-align:center; font-size:20px; font-family:fantasy'><h2>Agromarketplace</h2></header><br><strong><label style='font-size: 22px;font-family:serif; margin-top:3px;'>Respuesta:</label></strong><p font-size:25px; > Tu pedido realizado a la tienda <strong>" + body.mensaje + "</strong> ha recibido una respuesta.</p>"
            };
            config.sendMail(opciones, function (error, result) {
                res.json({ message: 'Producto actualizado ' });
                console.log(error);
                console.log(result);
            });
        });
    }
}
const CorreoenviarController = new CorreoController;
exports.default = CorreoenviarController;
