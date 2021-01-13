const express  = require("express");
const http     = require("http");
const socketIO = require("socket.io");
const path     = require("path"); 
const Sockets = require("./sockets");

class Server {
   constructor(){
      
      this.app =  express();
      this.port =  process.env.PORT;

      // Http server
      this.server = http.createServer(this.app);
      
      // Configuración de sockets
      this.io = socketIO(this.server, { /* Configuraciones */});
   }

   middlewares() {
      this.app.use(express.static( path.resolve(__dirname, "../public" )))
   }

   configurarSockets(){
      new Sockets(this.io);
   }

   execute() {
      this.middlewares(); 
      this.configurarSockets();
      this.server.listen(this.port, () =>{
         console.log("Server corriendo en el puerto", this.port);
      }) 
   }

}

module.exports = Server