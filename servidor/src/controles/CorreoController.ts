import { Request, Response } from 'express';
import pool from '../base_datos';
import  nodemailer  from 'nodemailer';
import { config } from 'process';
import { removeData } from 'jquery';



class CorreoController {
  

    public async enviarcorreocontrasenia(req: Request, res: Response): Promise<void> {
        let body= req.body;
        let config= nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            ignoreTLS: false,
           // true for 465, false for other ports
            auth: {
              user: "agromarketplace00@gmail.com", // generated ethereal user
              pass: "qgogyfgvzysnobig", // generated ethereal password
            },
          });
          const opciones = {
            from: 'agromarketplace00@gmail.com', // sender address
            to: body.email, // list of receivers
            subject: body.asunto, // Subject line
            text: body.mensaje, // plain text body
            //html: "<b>Hello world?</b>", // html body
            html:"<header style='background:#7DF2C0; padding:auto; text-align:center; font-size:20px; font-family:fantasy'><h2>Agromarketplace</h2></header><br><strong><label style='font-size: 22px;font-family:serif; margin-top:3px;'>Recuperación de contraseña:</label></strong><p font-size:20px; >Esta es su nueva contraseña: "+body.mensaje+"</p>"
          };
          config.sendMail(opciones, function(error,result){
            res.json({ message: 'Producto actualizado ' });

          })
       
    }

    public async enviarcorreoaprobaproducto(req: Request, res: Response): Promise<void> {
      console.log("si llegue aqui para enviar el correo")
      let body= req.body;
      let config= nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          ignoreTLS: false, // true for 465, false for other ports
          auth: {
            user: "agromarketplace00@gmail.com", // generated ethereal user
            pass: "qgogyfgvzysnobig", // generated ethereal password
          },
        });
        const opciones = {
          from: 'agromarketplace00@gmail.com', // sender address
          to: body.email, // list of receivers
          subject: body.asunto, // Subject line
          text: body.mensaje, // plain text body
          //html: "<b>Hello world?</b>", // html body
          html:"<header style='background:#7DF2C0; padding:auto; text-align:center; font-size:20px; font-family:fantasy'><h2>Agromarketplace</h2></header><br><strong><label style='font-size: 22px;font-family:serif; margin-top:3px;'>Respuesta:</label></strong><p font-size:25px; > Tu producto <strong>"+body.mensaje+"</strong> ha recibido una respuesta para su publicación</p>"
        };
        config.sendMail(opciones, function(error,result){
          res.json({ message: 'Producto actualizado ' });
          console.log(error);
          console.log(result);

        })
     
  }


  public async enviarcorreoaprobapedido(req: Request, res: Response): Promise<void> {
    console.log("si llegue aqui para enviar el correo siiiii")
    let body= req.body;
    let config= nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        ignoreTLS: false, // true for 465, false for other ports
        auth: {
          user: "agromarketplace00@gmail.com", // generated ethereal user
          pass: "qgogyfgvzysnobig", // generated ethereal password
        },
      });
      const opciones = {
        from: 'agromarketplace00@gmail.com', // sender address
        to: body.email, // list of receivers
        subject: body.asunto, // Subject line
        text: body.mensaje + body.fecha, // plain text body
        //html: "<b>Hello world?</b>", // html body
        html:"<header style='background:#7DF2C0; padding:auto; text-align:center; font-size:20px; font-family:fantasy'><h2>Agromarketplace</h2></header><br><strong><label style='font-size: 22px;font-family:serif; margin-top:3px;'>Respuesta:</label></strong><p font-size:25px; > Tu pedido realizado el <strong>"+body.fecha+"</strong> a la tienda <strong>"+body.mensaje+"</strong> ha recibido una respuesta.</p>"
      };
      config.sendMail(opciones, function(error,result){
        res.json({ message: 'Producto actualizado ' });
        console.log(error);
        console.log(result);

      })
   
}

/* envia un correo a la tienda con la información del cliente que intentó comprar más del stock disponible de un producto*/
public async enviarcorreotienda(req: Request, res: Response): Promise<void> {
  let body= req.body;
  let config= nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      ignoreTLS: false, // true for 465, false for other ports
      auth: {
        user: "agromarketplace00@gmail.com", // generated ethereal user
        pass: "qgogyfgvzysnobig", // generated ethereal password
      },
    });
    const opciones = {
      from: 'agromarketplace00@gmail.com', // sender address
      to: body.email, // list of receivers
      subject: body.asunto, // Subject line
      text: body.nombre_producto + body.fecha + body.apellidos + body.nombre + body.cantidad + body.email_cliente + body.celular_cliente, // plain text body
      //html: "<b>Hello world?</b>", // html body
      html:"<header style='background:#7DF2C0; padding:auto; text-align:center; font-size:20px; font-family:fantasy'><h2>Agromarketplace</h2></header><br><strong><label style='font-size: 22px;font-family:serif; margin-top:3px;'>Observación:</label></strong><p font-size:25px; > El <strong>"+body.fecha+
      "</strong> una persona intentó comprar <strong>"+body.cantidad+"</strong> unidades del producto <strong>"+body.nombre_producto+"</strong>, actualiza tu stock o comunícate directo con el cliente.</p>"+
      "<br><p font-size:25px; >Nombre Cliente: <strong>"+body.nombre+" "+body.apellidos+"</strong></p>"+
      "<br><p font-size:25px; >Correo electrónico: <strong>"+body.email_cliente+"</strong></p>"+
      "<br><p font-size:25px; >Celular Contacto: <strong>"+body.celular_cliente+"</strong></p>"
    };
    config.sendMail(opciones, function(error,result){
      res.json({ message: 'Producto actualizado ' });
      console.log(error);
      console.log(result);

    })
 
}




   
}

const CorreoenviarController = new CorreoController;
export default CorreoenviarController;