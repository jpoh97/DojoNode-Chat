var aplicacion = require('express')();//Importar express
var http = require('http').Server(aplicacion);//Desde express crear el servidor
var io = require('socket.io')(http);//Importar socket al servidor
var puerto = process.env.PORT || 3000;//Indicar el puerto por el cual es servidor va a escuchar

//Servicio get
aplicacion.get('/', function(request, response){//Funcion request/response
  response.sendFile(__dirname + '/index.html');//__dirname indica el directorio del modulo actual.
});

io.on('connection', function(socket){/*el nombre del evento sera connection, y como segundo parametro
                                      sera la funcion callback, es decir responderá a cada instacia
                                      socket*/
  socket.on('mensaje de chat', function(msg){/*Y para cada instancia socket, el callback será cada mensaje*/
    io.emit('mensaje de chat', msg);/*cada mensaje genera un evento llamado chat message*/
  });
});

http.listen(puerto, function(){//Se activa el servidor, y lo pone en estado de escucha
  console.log('Escuchando en el puerto *:' + puerto);
});
