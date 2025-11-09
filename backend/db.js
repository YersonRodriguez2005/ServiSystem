import mysql from 'mysql2';

//configuracion de la conexion con la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'servisystem_db'
});

//verificar la conexion
connection.connect(err => {
    if (err) {
        console.error('Error al conectar la base de datos', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

export default connection;