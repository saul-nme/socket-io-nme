class Sockets {
   constructor(io) {
      this.io = io;
      this.socketEvents();
   }

   socketEvents() {
      // On connection
      this.io.on('connection', (socket) => { 
         // Escuchando el evento message-to-server
         socket.on("message-to-server", ({msg}) => {
            console.log(msg);
            this.io.emit("message-from-server", {msg})
         });
      });
   }

}

module.exports = Sockets; 