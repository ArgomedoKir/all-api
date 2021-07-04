const mysql = require('mysql');
const config = require('./config/configuracion');


//Configuración
const dbconfig = {
    host:  config.configDataBase.hostLocal  ,
    user: config.configDataBase.userLocal ,
    password: config.configDataBase.passwordLocal  ,
    database: config.configDataBase.databaseLocal
};


//Creación de la conexión
var connection = mysql.createConnection(dbconfig);

//Establecer una nueva conexión
connection.connect( error => {
    if(error){
        console.log('Ocurrió un error en la conexión con la BD');
    } else{ 
        console.log('Conexión exitosa con la BD');
    }
    
});

module.exports = connection;